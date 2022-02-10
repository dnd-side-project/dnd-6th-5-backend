import { Token } from '../entity/index';
import { tToken } from '../../@types/types.d';
import { UpdateResult } from 'typeorm';

const createToken: (token: tToken) => Promise<Token> = async (token) => {
    const newToken = new Token();
    newToken.refreshToken = token.refreshToken as string;
    newToken.expiresAt = token.expiresAt as string;
    newToken.user = token.user;
    await newToken.save();

    return newToken;
};

const findOneToken: (token: string) => Promise<Token | undefined> = async (token) => {
    const targetToken = Token.findOne({ refreshToken: token });
    return targetToken;
};

const updateToken: (
    ogRefresh_token: string,
    newRefreshToken: string,
    expiresAt: string
) => Promise<UpdateResult> = async (ogRefresh_token, newRefreshToken, expiresAt) => {
    const updatedToken = Token.createQueryBuilder()
        .update()
        .set({
            refreshToken: newRefreshToken,
            expiresAt: expiresAt,
        })
        .where('refreshToken = :refreshToken', { refreshToken: ogRefresh_token })
        .execute();
    return updatedToken;
};
export { createToken, findOneToken, updateToken };
