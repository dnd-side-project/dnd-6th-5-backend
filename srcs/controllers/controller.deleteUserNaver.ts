import { RequestHandler } from 'express';
import { findOneUserByEmail, deleteUserById } from '../repository/index';
import { getNaverAccessTokenInfo, logoutNaver } from '../lib/index';
import { tUser } from '../../@types/types';

const deleteUserNaver: RequestHandler = async (req, res, next) => {
    try {
        const accessToken = req.headers.access_token;

        const tokenInfo = await getNaverAccessTokenInfo(accessToken);

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
        const logoutResponse = await logoutNaver(accessToken);
        if (logoutResponse.status !== 200) {
            return res.status(401).json({
                success: false,
                error: logoutResponse.data,
            });
        }
        const userObj: tUser = {
            email,
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

export default deleteUserNaver;
