import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import cors from "cors"
import passport from "passport"
import session from "express-session"
import { passportStrategies } from "./config/passport.js"
import pgSessionConnect from "connect-pg-simple"
import { connection } from "./db/connection.js"
import { setAuthRoutes } from "./routes/auth.js"
import libraryRoutes from "./routes/library.js"


const pgSession = pgSessionConnect(session)
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
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

app.use("/auth", setAuthRoutes(passport))
app.use("/library", libraryRoutes)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`)
})