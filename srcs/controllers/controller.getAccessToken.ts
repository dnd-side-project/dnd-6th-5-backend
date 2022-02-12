import { RequestHandler } from 'express';
import { findOneToken, updateToken } from '../repository/index';
import { updateAccessToken } from '../lib/index';
import { Token } from '../entity/index';

const getAccessToken: RequestHandler = async (req, res) => {
    try {
        // 만료된 토큰일 경우
        const TokenInfo = (await findOneToken(req.headers.refresh_token as string)) as Token;
        if (typeof TokenInfo === undefined)
            return res.status(401).json({
                success: false,
                error: {
                    code: 'authentication',
                    message: 'Invalid refreshToken.',
                },
            });

        // 리프래쉬 토큰을 사용하여 액세스토큰 재발급
        const updatedToken = await updateAccessToken(TokenInfo.refreshToken);
        if (updatedToken.status !== 200)
            return res.status(401).json({
                success: false,
                error: updatedToken.data,
            });

        const accessToken = updatedToken.data.access_token;
        let refreshToken = updatedToken.data.refresh_token;

        // 리프래쉬 토큰이 재발급 되었다면
        // 재발급된 리프래쉬 토큰을 DB에 저장
        if (typeof refreshToken === 'string')
            await updateToken(TokenInfo.refreshToken, refreshToken);
        else refreshToken = null;

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
