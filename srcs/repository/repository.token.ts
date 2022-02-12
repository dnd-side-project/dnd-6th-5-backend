import { Token } from '../entity/index';
import { tToken } from '../../@types/types.d';
import { UpdateResult } from 'typeorm';

const createToken: (token: tToken) => Promise<Token> = async (token) => {
    const newToken = new Token();
    newToken.refreshToken = token.refreshToken as string;
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
    newRefreshToken: string
) => Promise<UpdateResult> = async (ogRefresh_token, newRefreshToken) => {
    const updatedToken = Token.createQueryBuilder()
        .update()
        .set({
            refreshToken: newRefreshToken,
        })
        .where('refreshToken = :refreshToken', { refreshToken: ogRefresh_token })
        .execute();
    return updatedToken;
};

const updateTokenById: (id: number, newRefreshToken: string) => Promise<UpdateResult> = async (
    id,
    newRefreshToken
) => {
    const updatedToken = Token.createQueryBuilder()
        .update()
        .set({
            refreshToken: newRefreshToken,
        })
        .where('id = :id', { id: id })
        .execute();
    return updatedToken;
};
export { createToken, findOneToken, updateToken, updateTokenById };
