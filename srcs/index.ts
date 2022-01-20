import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/index';

dotenv.config();

const runServer = async () => {
    await connectDB();
    /* Run server */
    console.log('Set application...');
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
