import passport from "passport";
import express, { Router } from "express";
import { checkIfAuthenticated, generateSuccessResponse } from "../../utils/utils.js";
import { UserModel, UserModelSchema } from "../../models/db.js";
import { saveUser } from "../../controllers/db/user_queries.js";
import { isValidJson } from "../../utils/utils.js"
import { PGUnqiueConstraintError } from "../../models/db.js";
const router = express.Router()

function setAuthRoutes(passport: passport.PassportStatic): Router {
    
    router.get("/google",
        passport.authenticate("google", {scope: ["profile", "email"]})
    );

    router.get("/google/redirect", passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/library`,
        failureRedirect: `${process.env.CLIENT_URL}/failure`
    }));

    router.get("/facebook", 
        passport.authenticate("facebook", {scope: ["email"]})
    );

    router.get("/facebook/redirect", passport.authenticate("facebook", {
        successRedirect: `${process.env.CLIENT_URL}/library`,
        failureRedirect: `${process.env.CLIENT_URL}/failure`
    }));

    router.get("/local", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if(err) {
                return next(err)
            }

            if(!user) {
                return res.status(401).json({message: info.message})
            }

            req.login(user, (err) => {
                if(err) {
                    return next(err)
                }

                return res.json({message: "Login successful"})
            })
        })(req, res, next)
        }
    );

    router.get("/user", checkIfAuthenticated, (req, res) => {
        res.send(req.user)
    })

    router.post("/user", (req, res) => {

        if(!isValidJson(req.body.data)) {
            res.status(400).json({message: "Body is malformed"})
            return
        }

        const parsedBody = JSON.parse(req.body.data)
        const canParse = UserModelSchema.safeParse(parsedBody)

        if(!canParse.success) {
            res.status(400).json({message: "Bad user request"})
            return
        }

        const user = canParse.data

        saveUser(user)
        .then(() => {
            res.status(200).json({message: "User created succesfully"})
        })
        .catch((err) => {
            
            if(err.code === PGUnqiueConstraintError) {
                res.status(409).json({message: "User with email already exists"})
                return
            }

            res.status(500).json({message: "Failed to create user"})
        })
    })

    router.post("/logout", (req, res, next) => {
        req.logout((err) => {
            if(err) {
                return next(err)
            }

            const resPayload = generateSuccessResponse("You have been logged out")
            res.status(200).json(resPayload)
        })
    })

    return router;
}

export {
    setAuthRoutes
}