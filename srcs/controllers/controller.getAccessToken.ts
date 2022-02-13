import { RequestHandler } from 'express';
import { findOneToken, updateToken } from '../repository/index';
import { updateKaKaoAccessToken, updateNaverAccessToken } from '../lib/index';
import { Token } from '../entity/index';

const getAccessToken: RequestHandler = async (req, res) => {
    try {
        // DB의 리프래쉬 토큰과 일치하는지 확인
        const TokenInfo = (await findOneToken(req.headers.refresh_token as string)) as Token;
        if (TokenInfo === undefined)
            return res.status(401).json({
                success: false,
                error: {
                    code: 'authentication',
                    message: 'Invalid refreshToken.',
                },
            });

        let accessToken: string;
        let refreshToken: string | null;

        if (req.headers.platform === 'kakao') {
            // 리프래쉬 토큰을 사용하여 액세스토큰 재발급
            const updatedToken = await updateKaKaoAccessToken(TokenInfo.refreshToken);
            if (updatedToken.status !== 200)
                return res.status(401).json({
                    success: false,
                    error: updatedToken.data,
                });

            accessToken = updatedToken.data.access_token as string;
            refreshToken = updatedToken.data.refresh_token;

            if (typeof refreshToken === 'string')
                await updateToken(TokenInfo.refreshToken, refreshToken);
            else refreshToken = null;
        } else {
            // 리프래쉬 토큰을 사용하여 액세스토큰 재발급
            const updatedToken = await updateNaverAccessToken(TokenInfo.refreshToken);
            if (updatedToken.status !== 200)
                return res.status(401).json({
                    success: false,
                    error: updatedToken.data,
                });

            accessToken = updatedToken.data.access_token as string;
            refreshToken = updatedToken.data.refresh_token;
            await updateToken(TokenInfo.refreshToken, refreshToken);
        }

        // 재발급된 토큰과 플랫폼을 헤더에 넣고 반환한다.
        return res
            .status(200)
            .header({ access_token: accessToken, refresh_token: refreshToken, platform: 'kakao' })
            .json({
                success: true,
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

export default getAccessToken;
