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
const OPEN_API_KEY = process.env.OPEN_API_KEY;
const requestUrl = `https://www.youthcenter.go.kr/opi/empList.do?display=100&pageIndex=1&bizTycdSel=004003&openApiVlak=${OPEN_API_KEY}`;

async function getTitle(page, url) {
    try {
        await page.goto(url);
        await page.waitForSelector('head > title');
        const result = await page.$eval('head > title', (e) => e.innerText);
        return result;
    } catch (e) {
        return false;
    }
}

async function goToPage(page, url) {
    const result = await getTitle(page, url).catch(() => {
        return '-';
    });
    return result;
}

function replaceToUrl(str) {
    let result = '';
    let flag = true;
    for (const s of str) {
        if (s === 'h') flag = false;
        if (flag === false) result += s;
        else continue;
    }
    return result;
}

async function getPureTitle(page, site) {
    const uri = site.replace(/[^0-9a-zA-Z&.,/:_?=-]/g, '');
    const pureUrl = replaceToUrl(uri);
    const title = await goToPage(page, pureUrl);
    if (title === false) return site;
    if (!title) return '-';
    if (title.includes('본인인증')) {
        return '-';
    }
    return title;
}

async function insertPolicy(connection, results, data) {
    if (results[0]['count(*)'] == 0) {
        const result = await connection
            .query(
                `INSERT INTO policy(name, number, summary, content, limit_age, work_status, specialization, operating_institute, application_period, application_process, announcement, application_site) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.polyBizSjnm._cdata,
                    data.bizId._text,
                    data.polyItcnCn._cdata,
                    data.sporCn._cdata,
                    data.ageInfo._cdata,
                    data.empmSttsCn._cdata,
                    data.splzRlmRqisCn._cdata,
                    data.cnsgNmor._cdata,
                    data.rqutPrdCn._cdata,
                    data.rqutProcCn._cdata,
                    data.jdgnPresCn._cdata,
                    data.rqutUrla._cdata,
                ]
            )
            .catch(() => {
                return false;
            });
        if (result === false) console.log('results: ', results);
    } else {
        // 정책 이름이 같은 데이터가 존재한다면 넘어감
        console.log('same policy already in db');
    }
    // const title = await getPureTitle(data);
    // await setSiteName(connection, data, title);
}

async function collectData(name) {
    const browser = await puppeteer.launch({
        headless: true,
    });
    try {
        const page = await browser.newPage();
        await page.on('dialog', async (dialog) => {
            await dialog.dismiss();
        });
        const result = await accessDetailPage(page, name);
        return result;
    } finally {
        await browser.close();
    }
}

async function get_json(body) {
    const xmlToJson = await convert.xml2json(body, { compact: true, spaces: 4 });
    const json = await JSON.parse(xmlToJson); // json 객체로 파싱
    const emp = await json.empsInfo?.emp;
    return emp;
}

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const body = await axios
        .get(requestUrl)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });

    const emp = await get_json(body);
    const policySet = new Set();

    let i = 0;
    for (const data of emp) {
        // 중앙부처 정책만
        if (data.polyBizTy._cdata !== '중앙부처') continue;
        // 이미 있는 정책은 pass
        if (policySet.has(data.polyBizSjnm._cdata)) continue;
        policySet.add(data.polyBizSjnm._cdata);
        const policyName = data.polyBizSjnm._cdata;
        const dto = await collectData(policyName);
        if (dto !== false) i += 1;
        console.log(dto);
        console.log();
    }
    process.exit(1);
    // const results = await connection
    //     .query(`SELECT id, application_site FROM policy where application_site_name IS null`)
    //     .catch(() => {
    //         return false;
    //     });
    // await setNullData(connection, results);
    // console.log('finish');
}

main();

async function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function accessDetailPage(page, name) {
    try {
        await page.goto(mainUrl);

        await page.waitForSelector('#srchWord');
        await page.evaluate((name) => {
            document.querySelector('#srchWord').value = name;
        }, name);

        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(2) > div.r.ply-op > ul > li:nth-child(3) > span > button'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(2) > div.r.ply-op > ul > li:nth-child(3) > span > button'
        );

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

        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(9) > div.r.lct-op > ul > li:nth-child(1) > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div:nth-child(9) > div.r.lct-op > ul > li:nth-child(1) > span > label'
        );

        await page.waitForSelector('#srchFrm > div.btn_wrap.support_view_btn > div > a');
        await page.click('#srchFrm > div.btn_wrap.support_view_btn > div > a');

        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div.detail_search > div.col-wrap > div:nth-child(4) > div.view_cont > span > label'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.policy-search.green-type > div.detail_search > div.col-wrap > div:nth-child(4) > div.view_cont > span > label'
        );

        await page.waitForSelector(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.btn_wrap > a.btn_normal.green'
        );
        await page.click(
            '#srchFrm > div.ply-srh-box.explain-srh-box > div.btn_wrap > a.btn_normal.green'
        );

        await page.waitForSelector(
            '#srchFrm > div.sch-result-wrap.compare-result-list > div.result-list-box > ul > li',
            { timeout: 1000 }
        );
        await sleep(300);
        const len = await page.$$eval(
            '#srchFrm > div.sch-result-wrap.compare-result-list > div.result-list-box > ul > li',
            (e) => e.length
        );
        if (len === false) return false;
        await page.evaluate((len) => {
            document
                .querySelectorAll(
                    '#srchFrm > div.sch-result-wrap.compare-result-list > div.result-list-box > ul > li'
                )
                [len - 1].querySelector('a')
                .click();
        }, len);
        const data = await getData(page, name);
        if (data === false) return false;
        return data;
    } catch (e) {
        return false;
    }
}

async function getData(page, name) {
    try {
        await page.waitForSelector('#content > h3.doc_tit02.green.plcy-pc > div.plcy-number');
        const number = await page.$eval(
            '#content > h3.doc_tit02.green.plcy-pc > div.plcy-number',
            (e) => e.innerText.replace(/[^R0-9]/g, '')
        );
        await page.waitForSelector(
            '#content > div.ply-view-section.green > div.view-txt > div > ul > li'
        );
        const lis = await page.$$(
            '#content > div.ply-view-section.green > div.view-txt > div > ul > li',
            (e) => e.innerText
        );
        const check_c = await lis[0].$eval('div.list_cont', (e) => e.innerText);
        console.log(check_c);
        const category = await lis[0].$eval('div.list_cont', (e) => {
            if (e.innerText.includes('주거지원')) return '주거';
            if (e.innerText.includes('생활비지원 및 금융 혜택')) return '금융';
            else {
                console.log(e.innerText);
                return false;
            }
        });
        if (category === false) return false;

        const workStatus = await lis[9].$eval('div.list_cont', (e) => e.innerText);
        const summary = await page.$eval(
            '#content > div.ply-view-section.green > div.tit-box > h4',
            (e) => e.innerText
        );
        const host = await lis[18].$eval('div.list_cont', (e) => e.innerText);
        const applicationPeriod = await lis[3].$eval('div.list_cont', (e) => e.innerText);
        const announcement = await lis[14].$eval('div.list_cont', (e) => e.innerText);
        const policyDuration = await lis[2].$eval('div.list_cont', (e) => e.innerText);
        const limitAge = await lis[5].$eval('div.list_cont', (e) => e.innerText);
        const limitAreaAsset = await lis[6].$eval('div.list_cont', (e) => e.innerText);
        const specialization = await lis[10].$eval('div.list_cont', (e) => e.innerText);
        const content = await lis[1].$eval('div.list_cont', (e) => e.innerText);
        const note = await lis[11].$eval('div.list_cont', (e) => e.innerText);
        const limitedTarget = await lis[12].$eval('div.list_cont', (e) => e.innerText);
        const supportScale = await lis[4].$eval('div.list_cont', (e) => e.innerText);
        const applicationProcess = await lis[13].$eval('div.list_cont', (e) => e.innerText);
        const applicationSite = await lis[15].$eval('div.list_cont', (e) => e.innerText);
        const submission = await lis[16].$eval('div.list_cont', (e) => e.innerText);
        const otherInfo = await lis[17].$eval('div.list_cont', (e) => e.innerText);
        const operatingInstitute = await lis[19].$eval('div.list_cont', (e) => e.innerText);
        const referenceSite1 = await lis[19].$eval('div.list_cont', (e) => e.innerText);
        const referenceSite2 = await lis[21].$eval('div.list_cont', (e) => e.innerText);
        const applicationSiteName = await getPureTitle(page, applicationSite);

        const data = {
            name,
            number,
            category,
            workStatus,
            summary,
            host,
            applicationPeriod,
            announcement,
            policyDuration,
            limitAge,
            limitAreaAsset,
            specialization,
            content,
            note,
            limitedTarget,
            supportScale,
            applicationProcess,
            applicationSite,
            applicationSiteName,
            submission,
            otherInfo,
            operatingInstitute,
            referenceSite1,
            referenceSite2,
        };
        return data;
    } catch (e) {
        return false;
    }
}
