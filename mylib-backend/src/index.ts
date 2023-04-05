import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import path from 'path';
import cors from "cors"
import passport from "passport"
import session from "express-session"
import { passportStrategies } from "./config/passport.js"
import pgSessionConnect from "connect-pg-simple"
import { connection } from "./db/connection.js"
import { setAuthRoutes } from "./routes/auth.js"
import libraryRoutes from "./routes/library.js"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const pgSession = pgSessionConnect(session)
const app = express()
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
}))

passportStrategies(passport)

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: new pgSession ({
        pool: connection,
        tableName: "user_sessions"
    }),
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname,'../public')));

app.use("/auth", setAuthRoutes(passport))
app.use("/library", libraryRoutes)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`)
    connection.query("select 1")
    .catch((err) => {
        if(err.code == "ECONNREFUSED") {
            console.error(`PG failed to connect to database ${err}`)
        } else {
            console.error(err)
        }
        process.exit(0)
    })
})