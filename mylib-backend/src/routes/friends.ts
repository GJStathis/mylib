import express, { Request } from "express";
import { checkIfAuthenticated, generateSuccessResponse } from "../utils/utils.js";
import { getFriendSearch, getFriends, addFriend, removeFriend } from "../db/friend_queries.js"
import { FriendSearch } from "../typings/db/dbtypes.js";
const router = express.Router()

interface FriendRecord {
    friend_id: string
}

router.get("/search", checkIfAuthenticated, (req: Request, res) => {
    getFriendSearch(req.user!.user_id!)
    .then((rows: FriendSearch[] | void) => {
        const resPayload = generateSuccessResponse(undefined, {"rows": rows})
        res.json(resPayload)
    })
    .catch((err) => console.error(err))
})

router.get("/all", checkIfAuthenticated, (req: Request, res) => {
    getFriends(req.user!.user_id!)
    .then((rows: FriendSearch[] | void) => {
        res.json(generateSuccessResponse(undefined, {"rows": rows}))
    })
    .catch((err) => console.error(err))
})

router.post("/add", checkIfAuthenticated, (req: Request, res) => {
    const body: FriendRecord = req.body.data

    addFriend(req.user!.user_id!, body.friend_id)
    .then(() => {
        res.json(generateSuccessResponse("successfully added friend"))
    })
    .catch((err) => console.error(err))
})

router.delete("/remove", checkIfAuthenticated, (req, res) => {
    const body: FriendRecord = req.body.data

    removeFriend(req.user!.user_id!, body.friend_id)
    .then(() => {
        res.json(generateSuccessResponse("successfully removed friend"))
    })
    .catch((err) => console.error(err))
})

export default router