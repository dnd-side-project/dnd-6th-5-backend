import { RequestHandler } from 'express';
import { findOneUserByEmail, updateToken } from '../repository/index';
import { getNaverAccessTokenInfo } from '../lib/index';
import { tUser } from '../../@types/types';

const signoutNaver: RequestHandler = async (req, res, next) => {
    try {
        const accessToken = req.headers.access_token;
        // getTokenInfo - 토큰 검증 api를 호출하는 함수

        const tokenInfo = await getNaverAccessTokenInfo(accessToken);

        // 유효한 액세스 토큰이 아닌 모든 경우
        if (tokenInfo.status !== 200) {
            return res.status(401).json({
                success: false,
                data: {
                    code: tokenInfo.data.resultcode,
                    message: tokenInfo.data.message,
                },
            });
        }

        const email = tokenInfo.data.response.email as string;
        // const logoutResponse = await logoutNaver(accessToken);
        // if (logoutResponse.status !== 200) {
        //     return res.status(401).json({
        //         success: false,
        //         error: logoutResponse.data,
        //     });
        // }
        const userObj: tUser = {
            email,
        };
        const dbUser = await findOneUserByEmail(userObj);
        await updateToken(dbUser?.token.refreshToken as string, null);

        return res.status(200).json({
            success: true,
            data: { id: dbUser?.id },
        });
    } catch (error: any) {
        next(error);
    }
};

export default signoutNaver;
