import { getConnectionOptions, createConnection } from 'typeorm';
import { User } from '../entity/User';

const connectDb = async (): Promise<void> => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    await createConnection({ ...connectionOptions })
        .then((connection) => {
            connection.getRepository(User);
            console.log('DB connected');
        })
        .catch((err) => console.log(err));
};

export default connectDb;
