import { RequestHandler } from 'express';
import { getAccessTokenInfo } from '../lib/index';

const isAuth: RequestHandler = async (req, res, next) => {
    const accessToken = req.headers.access_token;
    // 액세스 토큰 검증
    const tokenInfo = await getAccessTokenInfo(accessToken);

    // 액세스 토큰을 제대로 받았거나 유효하지 않은 토큰일 경우를 제외한 모든 경우
    if (tokenInfo.code !== 200) {
        return res.status(401).json({
            success: false,
            error: {
                code: tokenInfo.code,
                message: tokenInfo.msg,
            },
        });
    }
    next();
};

export default isAuth;
