const dotenv = require('dotenv');

dotenv.config();

module.exports.default = {
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
};

module.exports.test = {
    name: 'default',
    type: 'mysql',
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: ['./srcs/entity/*.ts'],
    subscribers: ['srcs/migration/*.ts'],
    migrations: ['srcs/migration/*.ts'],
};
