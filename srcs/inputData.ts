/* eslint-disable @typescript-eslint/no-var-requires */
const convert = require('xml-js');
const axios = require('axios');
const mysql = require('mysql2/promise');
const puppeteer = require('puppeteer');

require('dotenv').config();

const OPEN_API_KEY = process.env.OPEN_API_KEY;

const requestUrl = `https://www.youthcenter.go.kr/opi/empList.do?display=100&pageIndex=1&bizTycdSel=004003&openApiVlak=${OPEN_API_KEY}`;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function gotoPage(url) {
    if (url.includes(`https://www.kosaf.go.kr/ko/login_sc.do?rtn=/ssoext/sso_gateway.jsp?ref`))
        return '한국장학재단';
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    const result = await getTitle(page, url);
    await browser.close();
    return result;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function insertPolicy(connection, results, data) {
    const title = await getPureTitle(data);
    console.log(title);
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
                    title,
                ]
            )
            .catch((e) => {
                return false;
            });
        if (result === false) console.log('results: ', results);
    } else {
        // 정책 이름이 같은 데이터가 존재한다면 넘어감
        console.log('same policy already in db');
    }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function getPureTitle(data) {
    const uri = data.rqutUrla._cdata.replace(/[^0-9a-zA-Z&.,/:_?=-]/g, '');
    const pureUrl = replaceToUrl(uri);
    let title = await gotoPage(pureUrl);
    if (title === false) title = data.rqutUrla._cdata;
    if (title.includes('본인인증')) return '-';
    return title;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function tourData(connection, data) {
    // 중앙부처 정책만
    if (data.polyBizTy._cdata !== '중앙부처') return;
    const results = await connection
        .query(`SELECT count(*) FROM policy where name = "${data.polyBizSjnm._cdata}"`)
        .catch((e) => {
            return false;
        });
    if (results === false) return;
    await insertPolicy(connection, results, data);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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
    const xmlToJson = await convert.xml2json(body, { compact: true, spaces: 4 });
    const json = await JSON.parse(xmlToJson); // json 객체로 파싱
    const emp = await json.empsInfo?.emp;
    for (const data of emp) {
        await tourData(connection, data);
    }
    console.log('finish');
}

main();
