import { getConnectionOptions, createConnection } from 'typeorm';
import { Comment, Like, Notice, Policy, Post, Question, Token, User } from '../entity/index';
import dbOption from '../../ormconfig';

const connectDb = async (): Promise<void> => {
    let connectionoption;
    if (process.env.NODE_ENV === 'test') connectionoption = dbOption.test;
    else if (process.env.NODE_ENV === 'default') connectionoption = dbOption.default;

    await createConnection(connectionoption)
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
