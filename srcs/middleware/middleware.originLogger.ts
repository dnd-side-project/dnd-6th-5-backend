import { RequestHandler } from 'express';
import { logger } from '../config/index';

const originLogger: RequestHandler = async (req, res, next) => {
    logger.info(`host: "${req.headers.host}" protocol : "${req.protocol}"`);
    next();
};

export default originLogger;
