/* eslint-disable @typescript-eslint/no-var-requires */
const convert = require('xml-js');
const request = require('request');
const mysql = require('mysql');
require('dotenv').config();

const OPEN_API_KEY = process.env.OPEN_API_KEY;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const requestUrl = `https://www.youthcenter.go.kr/opi/empList.do?display=100&pageIndex=1&bizTycdSel=004003&openApiVlak=${OPEN_API_KEY}`;

request.get(requestUrl, (err, res, body) => {
    if (err) {
        console.log(`err => ${err}`);
    } else {
        if (res.statusCode == 200) {
            const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 });
            const json = JSON.parse(xmlToJson); // json 객체로 파싱

            const emp = json.empsInfo.emp;

            // 정책번호(추가 필요): polyBizSecd
            // 이름: polyBizSjnm, name / 정책번호: bizId, number / 소개: polyItcnCn, summary / 내용: sporCn, content / 나이: ageInfo, limit_age / 취업상태: empmSttsCn, work_status / 특화분야: splzRlmRqisCn, specialization
            // 신청기관: cnsgNmor, operating_institute / 신청기간: rqutPrdCn, application_period / 신청절차: rqutProcCn, application_process / 심사발표: jdgnPresCn, announcement / 사이트링크: rqutUrla, application_site
            emp.forEach((data) => {
                // 중앙부처 정책만
                if (data.polyBizTy._cdata === '중앙부처') {
                    // console.log(data);

                    connection.query(
                        `SELECT count(*) FROM policy where name = "${data.polyBizSjnm._cdata}"`,
                        (err, results) => {
                            if (err) throw err;

                            // 정책 이름이 같은 데이터가 존재하지 않는다면 데이터 삽입
                            if (results[0]['count(*)'] == 0) {
                                connection.query(
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
                                    ],
                                    (err, results) => {
                                        if (err) throw err;
                                        console.log('results: ', results);
                                    }
                                );
                            } else {
                                // 정책 이름이 같은 데이터가 존재한다면 넘어감
                                console.log('same policy already in db');
                            }
                        }
                    );
                }
            });
        }
    }
});
