import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { UserModel } from "../../models/db.js"
import { AuthOrigins } from "../../models/enums.js"
import { InvalidCredentialsError, UserNotCreatedError } from "../../utils/exceptions.js"
import * as bcrypt from "bcrypt"

async function findUserByID(id: number): Promise<UserModel | void> {
    try {
        const res: QueryResult<UserModel> = await connection.query("SELECT * FROM users where user_id=$1",[id])
    
        if(res.rows) {
            return res.rows[0]
    
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function findUserByEmail(email: string, site: AuthOrigins): Promise<UserModel | void > {
    try {
        const res: QueryResult<UserModel> = await connection.query("SELECT * FROM users where email=$1 and auth_origin=$2",[email, site])
        
        if(res.rows) {
            return res.rows[0]
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function saveUser(user: UserModel): Promise<UserModel | void> {
    try {
        const query = "INSERT INTO users (auth_origin, auth_id, oauth_token, display_name, email, password)"
            + " VALUES ($1, $2, $3, $4, $5, $6)"
            + " RETURNING user_id, auth_origin, auth_id, oauth_token, display_name, email"
        
        if(user.auth_origin === AuthOrigins.Local) {
            user.password = await bcrypt.hash(user.password, 10)
        }

        const res: QueryResult<UserModel> = await connection.query(
            query, [user.auth_origin, user.auth_id, user.oauth_token, user.display_name, user.email, user.password]
        )

        if(res.rows) {
            return res.rows[0]
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

// This method is wrong you need to include a where clause
// function updateUser(user: UserModel): Promise<UserModel | void> {
//     return connection.query("UPDATE users SET auth_origin=$1, auth_id=$2, oauth_token=$3, username=$4, email=$5, password=$6",
//     [user.auth_origin, user.auth_id, user.oauth_token, user.display_name, user.email, user.password])
//     .then((res: QueryResult<UserModel>) => {
//         if(res.rows) {
//             return res.rows[0]
//         }
//     })
//     .catch((err: any) => console.error(err))
// }

async function getOrCreateUserModel({auth_id, oauth_token, auth_origin, display_name, email, password}: UserModel, done: any): Promise<void> {
    try {
        const user: UserModel = {
            auth_id: auth_id,
            oauth_token: oauth_token,
            auth_origin: auth_origin,
            display_name: display_name,
            email: email,
            password: password
        }

        const userRecord: void | UserModel = await findUserByEmail(email, auth_origin)

        if(!userRecord && user.auth_origin === AuthOrigins.Local) {
            throw new UserNotCreatedError("Local user does not exist")
        }

        if(userRecord) {
            if(user.auth_origin !== AuthOrigins.Local) {
                return done(null, userRecord)
            }

            const isMatch = await bcrypt.compare(user.password, userRecord.password)

            if(isMatch) {
                return done(null, userRecord)
            }

            throw new InvalidCredentialsError("User inputted incorrect password")
        }

        await saveUser(user)

        return done(null, user)
    } catch (err) {
        console.log(err)
        throw err
    }
}

// function getAllUsers(): Promise<Array<UserModel> | void>  {
//     return connection.query("Select user_id, display_name from users")
//     .then((res: QueryResult<UserModel>) => {
//         if(res.rows) {
//             return res.rows
//         }
//     })
//     .catch((err: any) => console.error(err)) 
// }

export {
    findUserByEmail,
    saveUser,
    //updateUser,
    findUserByID,
    getOrCreateUserModel
}