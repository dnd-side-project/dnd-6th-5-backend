import createServer from './app';
import dotenv from 'dotenv';
import { logger } from './config/index';

dotenv.config();

const runServer = async () => {
    const app = await createServer();
    /* Run server */
    logger.info('Set application...');
    app.listen(3000, '0.0.0.0', () => logger.info(`server Run with port: ${process.env.PORT}`));
};

runServer();
