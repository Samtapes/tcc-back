"use strict";
// Update with your config settings.
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
var configuration = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/db.sqlite'
        },
        migrations: {
            directory: './src/database/migrations',
            extension: 'ts'
        },
        useNullAsDefault: true,
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
exports.configuration = configuration;
// module.exports = configuration;
