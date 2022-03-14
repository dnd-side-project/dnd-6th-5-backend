import createServer from './app';
import dotenv from 'dotenv';

dotenv.config();

const runServer = async () => {
    const app = await createServer();
    /* Run server */
    console.log('Set application...');
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
