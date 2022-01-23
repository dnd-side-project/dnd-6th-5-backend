import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

/* Set middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'asfsa' }));
app.use(router);

export default app;
