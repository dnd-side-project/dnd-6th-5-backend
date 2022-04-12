import { RequestHandler } from 'express';
import { getNaverAccessTokenInfo, updateNaverAccessToken, toResObj } from '../lib/index';
import { createUser, createToken, findOneUserByEmail, updateTokenById } from '../repository/index';
import { tUser, tToken } from '../../@types/types';
import { User } from '../entity/index';

const signinNaver: RequestHandler = async (req, res) => {
    try {
        let accessToken = req.headers.access_token;
        // getTokenInfo - 토큰 검증 api를 호출하는 함수
        const tokenInfo = await getNaverAccessTokenInfo(accessToken);
        // 유효한 액세스 토큰이 아닌 모든 경우
        if (tokenInfo.status !== 200)
            return res.status(401).json({
                success: false,
                data: {
                    code: tokenInfo.data.resultcode,
                    message: tokenInfo.data.message,
                },
            });

        // User테이블에 user create
        const email = tokenInfo.data.response.email as string;
        const userObj: tUser = {
            email,
        };
        const dbUser = await findOneUserByEmail(userObj);
        const refreshToken: string = req.headers.refresh_token as string;
        let newUser: User;

        // 새로 가입한 user
        if (dbUser === undefined) {
            // User테이블에 user create
            newUser = await createUser(userObj);

            // token create
            const tokenObj: tToken = {
                refreshToken: refreshToken,
                user: newUser,
            };
            const newToken = await createToken(tokenObj);
            newUser.token = newToken;
        } else {
            const updatedToken = await updateNaverAccessToken(refreshToken);
            accessToken = updatedToken.data.access_token;

            if (updatedToken.status !== 200)
                return res.status(401).json({
                    success: false,
                    error: updatedToken.data,
                });
            await updateTokenById(dbUser.token.id, refreshToken);
            newUser = dbUser;
        }
        // user 데이터를 반환합니다.
        newUser = await toResObj(newUser);
        return res
            .status(200)
            .header({
                access_token: accessToken,
                refresh_token: refreshToken,
                platform: 'naver',
            })
            .json({
                success: true,
                data: {
                    user: newUser,
                },
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

export default signinNaver;
