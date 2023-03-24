import passport from "passport";
import express, { Router, Request, Response, NextFunction } from "express";
const router = express.Router()

function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        res.status(401).json({message: "Client not authenticated"})
    } else {
        next();
    }
}

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
        console.log("User is logging out")
        req.logout((err) => {
            if(err) {
                return next(err)
            }

            res.status(200).json({message: "User has been logged out"})
        })
    })

    return router;
}

export {
    setAuthRoutes,
    checkIfAuthenticated
}