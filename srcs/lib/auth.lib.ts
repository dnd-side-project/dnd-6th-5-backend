import axios from 'axios';
import { tTokenInfo, tTokenResponse } from '../../@types/types.d';

const getAccessTokenInfo: (accessToken?: string | string[]) => Promise<tTokenInfo> = async (
    accessToken
) => {
    const res = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v1/user/access_token_info',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            return {
                code: response.status,
            };
        })
        .catch((err) => {
            return err.response.data;
        });
    return res;
};

const updateAccessToken: (refreshToken?: string | string[]) => Promise<tTokenResponse> = async (
    refreshToken
) => {
    const res = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
            grant_type: 'refresh_token',
            client_id: process.env.CLIENT_ID,
            refresh_token: `${refreshToken}`,
        },
    })
        .then((res) => ({
            status: res.status,
            data: res.data,
        }))
        .catch((err) => ({
            status: err.response.status,
            data: err.response.data,
        }));
    return res;
};

const getKaKaoUserInfo: (accessToken: any) => Promise<any> = async (accessToken) => {
    const res = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            property_keys: ['kakao_account.email'],
        },
    })
        .then((res) => ({
            status: res.status,
            data: res.data,
        }))
        .catch((err) => ({
            status: err.response.status,
            data: err.response.data,
        }));
    return res;
};

const logoutKakao: (accessToken?: string | string[]) => Promise<tTokenResponse> = async (
    accessToken
) => {
    const res = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v1/user/logout',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((res) => ({
            status: res.status,
            data: res.data,
        }))
        .catch((err) => ({
            status: err.response.status,
            data: err.response.data,
        }));
    return res;
};

export { getAccessTokenInfo, updateAccessToken, logoutKakao, getKaKaoUserInfo };
