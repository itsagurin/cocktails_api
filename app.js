import path from 'path';
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env'),
});
import pg from 'pg';

const pool = new pool({
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
});