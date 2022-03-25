/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-var-requires */
const convert = require('xml-js');
const axios = require('axios');
const mysql = require('mysql2/promise');
const puppeteer = require('puppeteer');

require('dotenv').config();

const mainUrl = `https://www.youthcenter.go.kr/youngPlcyUnif/youngPlcyUnifList.do`;

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.TEST_DB_HOST,
        user: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
    });
    const dbPolicy = await connection.query(`SELECT name, activated FROM policy`).catch((e) => {
        console.log(e);
        return false;
    });
    const policyList = dbPolicy[0];
    const activatedPolicy = [];
    for (const policy of policyList) {
        console.log(policy.name);
        const checkActivated = await collectData(policy.name);
        activatedPolicy.push({ name: policy.name, activated: checkActivated });
        console.log(`name: ${policy.name}\nresult ${checkActivated}`);
        console.log();
    }

    for (const policyData of activatedPolicy) await updateActivatedPolicy(connection, policyData);
    process.exit(1);
}

main();

async function collectData(name) {
    const browser = await puppeteer.launch({
        headless: true,
    });
    try {
        const page = await browser.newPage();
        const result = await searchPolicy(page, name);
        return result;
    } finally {
        await browser.close();
    }
}

async function searchPolicy(page, name) {
    try {
        await page.goto(mainUrl);

        await page.waitForSelector('#srchWord');
        await page.$eval('input[name=srchWord]', (el, name) => (el.value = name), name);
        await page.waitForSelector('#srchSortOrder');
        await page.$eval('select[name=srchSortOrder]', (el) => (el.value = '4'));
        await page.waitForSelector('#pageUnit');
        await page.$eval('select[name=pageUnit]', (el) => (el.value = '60'));

        // 주거 . 금융 click
        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(2) > div.r.ply-op > ul > li:nth-child(3) > span > button'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(2) > div.r.ply-op > ul > li:nth-child(3) > span > button'
        );

        // '생활비지원 및 금융 혜택', '주거지원' click
        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(5) > div.ply-op > ul > li:nth-child(1) > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(5) > div.ply-op > ul > li:nth-child(1) > span > label'
        );
        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(5) > div.ply-op > ul > li:nth-child(2) > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(5) > div.ply-op > ul > li:nth-child(2) > span > label'
        );

        // 중앙부처 click
        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(9) > div.r.lct-op > ul > li:nth-child(1) > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(9) > div.r.lct-op > ul > li:nth-child(1) > span > label'
        );

        // 상세 검색 탭 click
        await page.waitForSelector('#srchFrm > div.btn_wrap.support_view_btn > div > a');
        await page.click('#srchFrm > div.btn_wrap.support_view_btn > div > a');

        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div.detail_search > div.col-wrap > div:nth-child(4) > div.view_cont > ul > li:nth-child(1) > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div.detail_search > div.col-wrap > div:nth-child(4) > div.view_cont > ul > li:nth-child(1) > span > label'
        );
        // 검색 click
        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.btn_wrap > a.btn_normal.green'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.btn_wrap > a.btn_normal.green'
        );

        await page.waitForSelector(
            '#srchFrm > div.sch-result-wrap.compare-result-list > div.result-list-box > ul > li > a',
            { timeout: 1000 }
        );

        const searchResult = await page.$$(
            '#srchFrm > div.sch-result-wrap.compare-result-list > div.result-list-box > ul > li'
        );

        const result = await checkPolicyName(searchResult, name);

        return result;
    } catch (e) {
        return false;
    }
}

async function checkPolicyName(searchResult, name) {
    let flag = false;
    for (const pName of searchResult) {
        const articelName = await pName.$eval('a', (e) => e.innerText);
        if (name === articelName) {
            flag = true;
            break;
        }
    }
    return flag;
}

async function updateActivatedPolicy(connection, policy) {
    const sql = `UPDATE policy SET activated=? WHERE name=? `;
    const arg = [policy.activated, policy.name];
    const res = await connection.query(sql, arg).catch((e) => {
        console.log(e);
        return false;
    });
    if (res === false) {
        console.log(policy);
        console.log(`update fail : ${policy.name}`);
    } else console.log(`update success: ${policy.name}`);
}
