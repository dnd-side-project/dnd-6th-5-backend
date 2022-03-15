import axios from 'axios';
import { tTokenInfo, tTokenResponse } from '../../@types/types.d';

const getKaKaoAccessTokenInfo: (accessToken?: string | string[]) => Promise<tTokenInfo> = async (
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

const updateKaKaoAccessToken: (
    refreshToken?: string | string[]
) => Promise<tTokenResponse> = async (refreshToken) => {
    const res = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_CLIENT_ID,
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

const unlinkKakao: (
    user_id: string,
    accessToken?: string | string[]
) => Promise<tTokenResponse> = async (user_id, accessToken) => {
    const res = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v1/user/unlink',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            target_id_type: 'user_id',
            target_id: user_id,
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

const getNaverAccessTokenInfo: (accessToken?: string | string[]) => Promise<any> = async (
    accessToken
) => {
    const res = await axios({
        method: 'get',
        url: 'https://openapi.naver.com/v1/nid/me',
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

const updateNaverAccessToken: (
    refreshToken?: string | string[]
) => Promise<tTokenResponse> = async (refreshToken) => {
    const res = await axios({
        method: 'post',
        url: 'https://nid.naver.com/oauth2.0/token?grant_type=refresh_token',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
            grant_type: 'refresh_token',
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
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

const logoutNaver: (accessToken?: string | string[]) => Promise<tTokenResponse> = async (
    accessToken
) => {
    const res = await axios({
        method: 'get',
        url: 'https://nid.naver.com/oauth2.0/token',
        params: {
            grant_type: 'delete',
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            access_token: accessToken,
            service_provider: 'NAVER',
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

export {
    getKaKaoAccessTokenInfo,
    updateKaKaoAccessToken,
    logoutKakao,
    getKaKaoUserInfo,
    unlinkKakao,
    getNaverAccessTokenInfo,
    updateNaverAccessToken,
    logoutNaver,
};
