import app from './app';
import dotenv from 'dotenv';
import db_connect from './config/db_connect';

dotenv.config();

const runServer = async () => {
    await db_connect();
    /* Run server */
    console.log('Set application...');
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
