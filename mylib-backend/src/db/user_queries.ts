import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { UserModel } from "../typings/db/dbtypes.js"

function findUserByID(id: number): Promise<UserModel | void> {
    return connection.query("SELECT * FROM users where user_id=$1",[id])
    .then((res: QueryResult<UserModel>) => {
        if(res.rows) {
            return res.rows[0]
        }
    })
    .catch((err: any) => console.error(err))
}

function findUserBySocialmediaID(id: string, site: string): Promise<UserModel | void > {
    return connection.query("SELECT * FROM users where social_id=$1 and social_media_site=$2",[id, site])
    .then((res: QueryResult<UserModel>) => {
        if(res.rows) {
            return res.rows[0]
        }
    })
    .catch((err: any) => console.error(err))
}

function saveUser(user: UserModel): Promise<UserModel | void> {
    return connection.query("INSERT INTO users (social_media_site, social_id, social_token, display_name, email)"
    + " VALUES ($1, $2, $3, $4, $5)"
    + " RETURNING user_id, social_media_site, social_id, social_token, display_name, email",
    [user.social_media_site, user.social_id, user.social_token, user.display_name, user.email])
    .then((res: QueryResult<UserModel>) => {
        if(res.rows) {
            return res.rows[0]
        }
    })
    .catch((err: any) => console.error(err))
}

// This method is wrong you need to include a where clause
function updateUser(user: UserModel): Promise<UserModel | void> {
    return connection.query("UPDATE users SET social_media_site=$1, social_id=$2, social_token=$3, username=$4, email=$5",
    [user.social_media_site, user.social_id, user.social_token, user.display_name, user.email])
    .then((res: QueryResult<UserModel>) => {
        if(res.rows) {
            return res.rows[0]
        }
    })
    .catch((err: any) => console.error(err))
}

function getOrCreateUserModel({social_id, social_token, social_media_site, display_name, email}: UserModel, done: any): void {
    const user: UserModel = {
        social_id: social_id,
        social_token: social_token,
        social_media_site: social_media_site,
        display_name: display_name,
        email: email
    }

    findUserBySocialmediaID(social_id, social_media_site)
    .then((userRecord: void | UserModel) => {
        if(userRecord) {
            return done(null, userRecord);
        } else {
            return saveUser(user)
                .then((user: void | UserModel) => {
                    return done(null, user)
                })
                .catch((err: any) => done(err))
        }
    })
    .catch((err: any) => console.error(err))  
}

export {
    findUserBySocialmediaID,
    saveUser,
    updateUser,
    findUserByID,
    getOrCreateUserModel
}