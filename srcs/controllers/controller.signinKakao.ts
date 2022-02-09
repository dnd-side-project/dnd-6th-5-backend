import { RequestHandler } from 'express';
import { User, Token } from '../entity/index';
import { getTokenInfo, getKaKaoUserInfo } from '../lib/index';

const signinKakao: RequestHandler = async (req, res) => {
    try {
        const accessToken = req.headers.access_token;

        // getTokenInfo - 토큰 검증 api를 호출하는 함수
        const tokenInfo = await getTokenInfo(accessToken);

        // 유효한 액세스 토큰이 아닌 모든 경우
        if (tokenInfo.code !== 200) {
            return res.status(401).json({
                success: false,
                error: {
                    code: tokenInfo.code,
                    message: tokenInfo.msg,
                },
            });
        }

        // user 정보 받아오기 api를 사용하여 email을 받아옵니다.
        const userInfo = await getKaKaoUserInfo(accessToken);

        // User테이블에 user insert
        const user = new User();
        user.email = userInfo.data.kakao_account.email;
        const userData = await user.save();

        // token insert
        const token = new Token();
        const refreshToken: string = req.headers.refresh_token as string;
        const refresh_token_expires_in = req.headers.refresh_token_expires_in as string;
        token.refreshToken = refreshToken;
        token.expiresAt = refresh_token_expires_in;
        token.user = userData;
        const tokenData = await user.save();

        // user 데이터를 반환합니다.
        return res
            .status(200)
            .header({
                access_token: accessToken,
                platform: 'kakao',
            })
            .json({
                success: true,
                data: {
                    user: userData,
                    token: tokenData.id,
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
