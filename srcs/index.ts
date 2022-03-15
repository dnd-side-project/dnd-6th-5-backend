import createServer from './app';
import dotenv from 'dotenv';

dotenv.config();

const runServer = async () => {
    const app = await createServer();
    /* Run server */
    console.log('Set application...');
    app.listen(3000, '0.0.0.0', () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
