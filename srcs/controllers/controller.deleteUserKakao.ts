import { RequestHandler } from 'express';
import { findOneUserByEmail, deleteUserById } from '../repository/index';
import { getKaKaoAccessTokenInfo, getKaKaoUserInfo, unlinkKakao } from '../lib/index';
import { tUser } from '../../@types/types';

const deleteUserKakao: RequestHandler = async (req, res, next) => {
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
        const unlinkResponse = await unlinkKakao(userInfo.data.id, accessToken);
        if (unlinkResponse.status !== 200)
            return res.status(401).json({
                success: false,
                error: unlinkResponse.data,
            });

        const userObj: tUser = {
            email: userInfo.data.kakao_account.email,
        };
        const dbUser = await findOneUserByEmail(userObj);
        await deleteUserById(dbUser?.id as number);

        return res.status(200).json({
            success: true,
            data: { id: dbUser?.id },
        });
    } catch (error: any) {
        next(error);
    }
};

export default deleteUserKakao;
