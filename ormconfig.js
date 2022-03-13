const dotenv = require('dotenv');

dotenv.config();

module.exports = [
    {
        name: 'default',
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        dropSchema: false,
        entities: ['./srcs/entity/*.ts'],
        subscribers: ['srcs/migration/*.ts'],
        migrations: ['srcs/migration/*.ts'],
    },
    {
        name: 'test',
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        dropSchema: false,
        entities: ['./srcs/entity/*.ts'],
        subscribers: ['srcs/migration/*.ts'],
        migrations: ['srcs/migration/*.ts'],
    },
];
