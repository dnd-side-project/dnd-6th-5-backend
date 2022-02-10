import { Token } from '../entity/index';
import { tToken } from '../../@types/types.d';

const createToken: (token: tToken) => Promise<Token> = async (token) => {
    const newToken = new Token();
    newToken.refreshToken = token.refreshToken;
    newToken.expiresAt = token.refreshToken;
    newToken.user = token.user;
    await newToken.save();

    return newToken;
};

export { createToken };
