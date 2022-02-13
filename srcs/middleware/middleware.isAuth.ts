import { RequestHandler } from 'express';
import { getKaKaoAccessTokenInfo, getNaverAccessTokenInfo } from '../lib/index';

const isAuth: RequestHandler = async (req, res, next) => {
    const accessToken = req.headers.access_token;
    // 액세스 토큰 검증
    if (req.headers.platform === 'kakao') {
        const tokenInfo = await getKaKaoAccessTokenInfo(accessToken);

        // 액세스 토큰을 제대로 받았거나 유효하지 않은 토큰일 경우를 제외한 모든 경우
        if (tokenInfo.code !== 200)
            return res.status(401).json({
                success: false,
                error: {
                    code: tokenInfo.code,
                    message: tokenInfo.msg,
                },
            });
        res.header({
            access_token: accessToken,
            platform: 'kakao',
        });
    } else if (req.headers.platform === 'naver') {
        const tokenInfo = await getNaverAccessTokenInfo(accessToken);

        if (tokenInfo.status !== 200)
            return res.status(401).json({
                success: false,
                error: {
                    code: tokenInfo.data.resultcode,
                    message: tokenInfo.data.message,
                },
            });
        res.header({
            access_token: accessToken,
            platform: 'naver',
        });
    } else {
        return res.status(401).json({
            success: false,
            error: {
                code: 'authentication',
                message: 'The value of headers.platform is not valid.',
            },
        });
    }
    next();
};

export default isAuth;
