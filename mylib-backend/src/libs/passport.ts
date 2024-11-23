import passport from "passport";
import * as GoogleStrategy from "passport-google-oauth2"
import * as FacebookStrategy from "passport-facebook"
import * as LocalStrategy from 'passport-local'
import * as crypto from 'crypto'
import { getOrCreateUserModel, findUserByID } from "../controllers/db/user_queries.js"
import { UserModel } from "../models/db.js"
import { Request } from "express";
import { AuthOrigins } from "../models/enums.js";
import { InvalidCredentialsError, UserNotCreatedError } from "../utils/exceptions.js";

function verifyPassword(user: UserModel, password: string): boolean {
    return true
}

function passportStrategies(passport: passport.PassportStatic) {

    passport.serializeUser(function(user: Express.User, done: passport.DoneCallback) {
        const user_id: any = (user.user_id!) as any
        done(null, user_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id: number, done: passport.DoneCallback) {
        findUserByID(id)
        .then((user: UserModel | void) => {
            if(user) {
                return done(null, user)
            }

            throw new Error("User not found in database when deserializing")
        })
        .catch((err) => {
            return done(err, null)
        })
    });

    passport.use(new GoogleStrategy.Strategy({
        clientID:     process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.APP_HOST}/api/v1/auth/google/redirect`,
        passReqToCallback   : true
      },
      function(req: Request, accessToken: string, refreshToken: string, profile: any, done: GoogleStrategy.VerifyCallback) {
        
        // Create logic here to find a user in db and if not there save them
        const user: UserModel = {
            auth_id: profile.id,
            oauth_token: accessToken,
            auth_origin: AuthOrigins.Google,
            display_name: profile.displayName,
            email: (profile.emails[0].value || undefined).toLowerCase()
        }

        getOrCreateUserModel(user, done)
      }
    ));

    passport.use(new FacebookStrategy.Strategy({
        clientID: process.env.FACEBOOK_APP_ID!,
        clientSecret: process.env.FACEBOOK_APP_SECRET!,
        callbackURL: `${process.env.APP_HOST}/api/v1/auth/facebook/redirect`,
        profileFields: ["email", "displayName"]
        }, 
        function(accessToken: string, refreshToken: string, profile: FacebookStrategy.Profile, done: any) {

            const { email, name } = profile._json
            const user: UserModel = {
                auth_id: profile.id,
                oauth_token: accessToken,
                auth_origin: AuthOrigins.Facebook,
                display_name: name,
                email: email
            }

            getOrCreateUserModel(user, done)
        }
    ));

    passport.use(new LocalStrategy.Strategy(
        function(displayName: string, email: string, password: string, done: any) {
            try {
                const user: UserModel = {
                    auth_origin: AuthOrigins.Local,
                    display_name: displayName,
                    email: email,
                    password: password
                }
    
                getOrCreateUserModel(user, done)
            } catch (err) {
                if(err instanceof UserNotCreatedError) {
                    console.warn(`User with email ${email} tried to login before user creation`)
                    done(err, false, {message: "Provided credentials are incorrect"})
                } else if (err instanceof InvalidCredentialsError) {
                    console.warn(`User with email ${email} failed to provide the correct credentials`)
                    done(err, false, {message: "Provided credentials are incorrect"})
                } else {
                    console.error(err)
                    done(err, false)
                }
            }
        }
    ))

}

export {
    passportStrategies
}