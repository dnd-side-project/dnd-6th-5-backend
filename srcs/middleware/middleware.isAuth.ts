import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import axios from 'axios';

dotenv.config();
const REST_API_KEY = process.env.REST_API_KEY;

const getTokenInfo = async (accessToekn: string | undefined) => {
    await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v1/user/access_token_info',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToekn}`,
        },
    });
};

const refreshToken = async (refreshToken: string | undefined) => {
    await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            grant_type: 'REST_API_KEY',
            client_id: `${REST_API_KEY}`,
            refresh_token: `${refreshToken}`,
        },
    });
};

const isAuth: RequestHandler = async (req, res, next) => {
    console.log(req.header('platform'));
    const accessToekn: string | undefined = req.header('access_token');
    const statusCode: string = await getTokenInfo(accessToekn).catch((e) => {
        return e.response.status;
    });
    console.log(statusCode);
    next();
};

export default isAuth;
