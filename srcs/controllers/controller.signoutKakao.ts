import { RequestHandler } from 'express';
import { findOneUserByEmail, updateToken } from '../repository/index';
import { getKaKaoAccessTokenInfo, getKaKaoUserInfo, logoutKakao } from '../lib/index';
import { tUser } from '../../@types/types';

const signoutKakao: RequestHandler = async (req, res) => {
    try {
        const accessToken = req.headers.access_token;
        // getTokenInfo - 토큰 검증 api를 호출하는 함수
        const tokenInfo = await getKaKaoAccessTokenInfo(accessToken);

        // 유효한 액세스 토큰이 아닌 모든 경우
        if (tokenInfo.code !== 200)
            return res.status(401).json({
                success: false,
                error: {
                    code: tokenInfo.code,
                    message: tokenInfo.msg,
                },
            });

        const userInfo = await getKaKaoUserInfo(accessToken);
        const logoutResponse = await logoutKakao(accessToken);
        if (logoutResponse.status !== 200)
            return res.status(401).json({
                success: false,
                error: logoutResponse.data,
            });

        const userObj: tUser = {
            email: userInfo.data.kakao_account.email,
        };
        const dbUser = await findOneUserByEmail(userObj);

        await updateToken(dbUser?.token.refreshToken as string, null);
        return res.status(200).json({
            success: true,
            data: dbUser?.id,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export default signoutKakao;
