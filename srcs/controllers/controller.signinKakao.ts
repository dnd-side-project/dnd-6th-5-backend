import { RequestHandler } from 'express';
import { getKaKaoAccessTokenInfo, getKaKaoUserInfo, updateAccessToken } from '../lib/index';
import { createUser, createToken, findOneUserByEmail, updateTokenById } from '../repository/index';
import { tUser, tToken } from '../../@types/types.d';
import { User } from '../entity';

const signinKakao: RequestHandler = async (req, res) => {
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

        // user 정보 받아오기 api를 사용하여 kakao플랫폼에 등록된 user의 정보를 받아옵니다.
        const userInfo = await getKaKaoUserInfo(accessToken);
        const userObj: tUser = {
            email: userInfo.data.kakao_account.email,
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
            const updatedToken = await updateAccessToken(refreshToken);
            if (updatedToken.status !== 200)
                return res.status(401).json({
                    success: false,
                    error: updatedToken.data,
                });

            await updateTokenById(dbUser.token.id, refreshToken);
            newUser = dbUser;
        }
        // user 데이터를 반환합니다.
        return res
            .status(200)
            .header({
                access_token: accessToken,
                refreshToken: refreshToken,
                platform: 'kakao',
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

export default signinKakao;
