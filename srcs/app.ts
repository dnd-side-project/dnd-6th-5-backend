import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/index';
import { stream } from './config/index';

dotenv.config();

const createServer: any = async () => {
    const app = express();
    await connectDB();
    const morganFormat = process.env.NODE_ENV !== 'default' ? 'dev' : 'combined';
    /* Set middleware */
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({ resave: false, saveUninitialized: false, secret: 'asfsa' }));
    // app.use(cors({ origin: 'https://www.spoonfeed.kr' }));
    app.use(morgan(morganFormat, { stream }));
    app.use(router);

    return app;
};

export default createServer;
