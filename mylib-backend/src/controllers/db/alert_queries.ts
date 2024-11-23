import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { Alert } from "../../typings/db/index.js"

function getAllAlerts(user_id: number): Promise<Alert[] | void> {
    return connection.query("SELECT * FROM friend_alerts WHERE user_id = $1", [user_id])
    .then((res: QueryResult<Alert>) => {
        if(res.rows) {
            return res.rows
        }
    })       
}

function sendFriendRequest(user_id: number, requesting_user_id: number, message_payload: string): Promise<void> {
    return connection.query(`
        INSERT INTO friend_alerts (user_id, requesting_user_id, message_str)
        VALUES ($1, $2, $3)
    `, [user_id, requesting_user_id, message_payload])
    .then(() => {
        console.log(`Friend request was sent from user id ${requesting_user_id} to user with id ${user_id}`)
    })
    .catch((err) => {
        console.error(`Failed to send alert: ${err}`)
        throw new Error(err);
    })
}

function markAlertAsRead(alert_id: number, alert_target_table: string): void {
    connection.query(`
        UPDATE $1 SET read_alert=TRUE
        WHERE alert_id=$2
    `, [alert_target_table, alert_id])
    .catch((err) => {
        console.error(`Failed to mark alert as read due to ${err}`);
    })
}

function removeAlert(alert_id: number, alert_target_table: string): Promise<void> {
    return connection.query(`
        DELETE FROM $1 where alert_id=$2
    `, [alert_target_table, alert_id])
    .then(() => {
        console.log(`Removed alert with id ${alert_id} from alert_table ${alert_target_table}`)
    })
    .catch((err) => {
        console.error(`Failed to delete alert from ${alert_target_table}`)
        throw new Error(err)
    })
}

export {
    getAllAlerts,
    sendFriendRequest,
    markAlertAsRead,
    removeAlert
}