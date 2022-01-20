import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const runServer = async () => {
    /* Run server */
    console.log('Set application...');
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
