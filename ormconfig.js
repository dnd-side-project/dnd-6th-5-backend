[
    {
        name: 'test',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'typeorm-test',
        synchronize: true,
        logging: false,
        dropSchema: true,
        entities: ['src/entity/*.ts'],
        subscribers: ['src/migration/*.ts'],
        migrations: ['src/migration/*.ts'],
    },
];
