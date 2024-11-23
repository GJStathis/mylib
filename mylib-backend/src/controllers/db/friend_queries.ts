import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { FriendSearch } from "../../typings/db/index.js"

function getFriendSearch(id: number): Promise<Array<FriendSearch> | void> {
    return connection.query(`select
                            u.user_id,
                            u.display_name,
                            case
                                when f.friend_id = $1 then true
                                else false
                            end as are_friends
                            from users u
                            left join friends f
                            on u.user_id = f.user_id
                            where u.user_id <> $1
    `, [id])
    .then((res: QueryResult<FriendSearch>) => {
        if(res.rows) {
            return res.rows
        }
    })
    .catch((err: any) => console.error(err))
}

function getFriends(user_id: number): Promise<Array<FriendSearch> | void> {
    return connection.query(`select
                            u.user_id,
                            u.display_name,
                            case
                                when f.friend_id = $1 then true
                                else false
                            end as are_friends
                            from users u
                            join friends f
                            on u.user_id = f.user_id
                            where u.user_id <> $1`
    ,[user_id])
    .then((res: QueryResult<FriendSearch>) => {
        if(res.rows) {
            return res.rows
        }
    })
    .catch((err: any) => console.error(err))
}

function addFriend(user_id: number, friend_id: string): Promise<void> {
    return connection.query("CALL create_friend_connection($1, $2);", [user_id, friend_id])
    .then(() => {
        console.log(`users with the ids ${user_id} and ${friend_id} are now friends`)
    })
    .catch((err: any) => {
        console.error(`Failed to make users with ids ${user_id} and ${friend_id} friends`)
        console.error(err)
        throw new Error('Failed to add friend');
    })
}

function removeFriend(user_id: number, friend_id: string): Promise<void> {
    return connection.query("CALL remove_friend($1, $2)", [user_id, friend_id])
    .then(() => {
        console.log(`users with the ids ${user_id} and ${friend_id} are no longer friends`)
    })
    .catch((err: any) => {
        console.error(`Failed to remove users with ids ${user_id} and ${friend_id} from friends`)
        console.error(err)
        throw new Error('Failed to remove friend');
    })
}

export {
    getFriendSearch,
    addFriend,
    getFriends,
    removeFriend
}