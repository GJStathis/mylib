import passport from "passport";
import express, { Router } from "express";
import { checkIfAuthenticated, generateSuccessResponse } from "../utils/utils.js";
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

    router.get("/user", checkIfAuthenticated, (req, res) => {
        res.send(req.user)
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