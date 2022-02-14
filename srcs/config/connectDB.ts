import { getConnectionOptions, createConnection } from 'typeorm';
import { Comment, Like, Notice, Policy, Post, Question, Token, User } from '../entity/index';

const connectDb = async (): Promise<void> => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    await createConnection({ ...connectionOptions })
        .then((connection) => {
            connection.getRepository(Comment);
            connection.getRepository(Like);
            connection.getRepository(Notice);
            connection.getRepository(Policy);
            connection.getRepository(Post);
            connection.getRepository(Question);
            connection.getRepository(Token);
            connection.getRepository(User);
            console.log('DB connected');
        })
        .catch((err) => console.log(err));
};

export default connectDb;
