import express, { Request } from "express"
import { getAllAlerts, sendFriendRequest, removeAlert, markAlertAsRead } from "../db/alert_queries.js"
import { Alert } from "../typings/db/dbtypes.js"
import { generateSuccessResponse, generateErrorResponse, ERROR_CODES, ALERT_TABLES } from "../utils/utils.js";

const router = express.Router()

router.get("/all", (req: Request, res) => {
    getAllAlerts(req.user!.user_id!)
    .then((rows: Alert[] | void) => {
        const resPayload = generateSuccessResponse(undefined, {"rows": rows})
        res.json(resPayload)
    })
    .catch((err) => console.error(err))
})

router.post("/sendFriendRequest", (req, res) => {
    const user_id: number = req.body.user_id
    const message_payload: string = req.body.message
    const sending_user_id = req.user!.user_id!

    sendFriendRequest(user_id, sending_user_id, message_payload)
    .then(() => {
        res.json(generateSuccessResponse("friend request sent"))
    })
    .catch((err) => {
        if(err.code === ERROR_CODES.DB_UNIQUE_CONSTRAINT_VIOLATION)
        {
            console.error(`user ${sending_user_id} has already sent a friend request to user ${user_id}`)
            res.json(generateErrorResponse("Friend request already sent to user"))
        }
        else
        {
            console.error(err)
        }
    })
})

router.delete("/removeAlert", (req, res) => {
    const alert_table = ALERT_TABLES[req.body.data.alert_type]
    const alert_id = req.body.data.alert_id

    removeAlert(alert_id, alert_table)
    .then(() => {
        res.json(generateSuccessResponse("Message removed"))
    })
})


router.post("/markAlertAsRead", (req, res) => {
    const alert_table = ALERT_TABLES[req.body.data.alert_type]
    const alert_id = req.body.data.alert_id

    markAlertAsRead(alert_id, alert_table)
})

export default router