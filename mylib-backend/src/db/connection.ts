import * as dotenv from 'dotenv'
dotenv.config()

import pg from "pg"
const { Pool } = pg

const connection = new Pool({
    user: process.env.DATABASE_USER,
    database: process.env.APP_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABSE_PORT ? +process.env.DATABSE_PORT: undefined,
    host: process.env.DATABASE_HOST
})

export { connection }