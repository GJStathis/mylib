import passport from "passport";
import * as GoogleStrategy from "passport-google-oauth2"
import * as FacebookStrategy from "passport-facebook"
import { getOrCreateUserModel, findUserByID } from "../db/user_queries.js"
import { UserModel } from "../typings/db/dbtypes.js"
import { Request } from "express";

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
        callbackURL: `${process.env.APP_HOST}/auth/google/redirect`,
        passReqToCallback   : true
      },
      function(req: Request, accessToken: string, refreshToken: string, profile: any, done: GoogleStrategy.VerifyCallback) {
        
        // Create logic here to find a user in db and if not there save them
        const socialMediaSite = "google"
        const user: UserModel = {
            social_id: profile.id,
            social_token: accessToken,
            social_media_site: socialMediaSite,
            display_name: profile.displayName,
            email: (profile.emails[0].value || undefined).toLowerCase()
        }

        getOrCreateUserModel(user, done)
      }
    ));

    passport.use(new FacebookStrategy.Strategy({
        clientID: process.env.FACEBOOK_APP_ID!,
        clientSecret: process.env.FACEBOOK_APP_SECRET!,
        callbackURL: `${process.env.APP_HOST}/auth/facebook/redirect`,
        profileFields: ["email", "displayName"]
        }, 
        function(accessToken: string, refreshToken: string, profile: FacebookStrategy.Profile, done: any) {

            const { email, name } = profile._json
            const socialMediaSite = "facebook"
            const user: UserModel = {
                social_id: profile.id,
                social_token: accessToken,
                social_media_site: socialMediaSite,
                display_name: name,
                email: email
            }

            getOrCreateUserModel(user, done)
        }
    ));

}

export {
    passportStrategies
}