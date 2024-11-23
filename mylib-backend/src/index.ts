import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import path from 'path';
import cors from "cors"
import fs from 'fs'
import passport from "passport"
import session from "express-session"
import { passportStrategies } from "./libs/passport.js"
import pgSessionConnect from "connect-pg-simple"
import { connection } from "./controllers/db/connection.js"
import { setAuthRoutes } from "./routes/v1/auth.js"
import libraryRoutes from "./routes/v1/library.js"
import friendsRoutes from "./routes/v1/friends.js"
import alertRoutes from "./routes/v1/alerts.js"
import { fileURLToPath } from 'url';
import { generateSuccessResponse } from "./utils/utils.js";


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
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: new pgSession ({
        pool: connection,
        tableName: "user_sessions"
    }),
    saveUninitialized: false,
    cookie: { 
        maxAge: oneDay,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production"
    },
    resave: true
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname,'../public')));

app.use("/api/v1/auth", setAuthRoutes(passport))
app.use("/api/v1/alerts", alertRoutes)
app.use("/api/v1/library", libraryRoutes)
app.use("/api/v1/friends", friendsRoutes)

app.get("/ping", (req, res) => {
    res.json(generateSuccessResponse("pong"))
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`)

    console.log(`Loading initial database scripts from ${path.join(__dirname, "../scripts/init/init.sql")}`)
    const db_init = fs.readFileSync(path.join(__dirname, "../scripts/init/init.sql"), "utf-8")
    connection.query(db_init)
    .then(() => console.log("Database initialized successfully"))
    .catch((err) => {
        if(err.code == "ECONNREFUSED") {
            console.error(`PG failed to connect to database ${err}`)
        } else {
            console.error(err)
        }
        console.log("pg connection failed shutting down...")
        process.exit(0)
    })
})