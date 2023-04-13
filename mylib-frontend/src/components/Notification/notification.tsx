import { useContext, useEffect } from "react"
import { myContext } from "../../pages/Context/context"
import { FaTimes } from "react-icons/fa"
import { NotificationObject } from "../../types/interfaces"
import styles from "./notification.module.css"

type NotificationProps = {
    notification: NotificationObject
}

const notificationColors: Record<string, Record<string, string>> = {
    "success": { "background-color": "#3f5a36" },
    "failure": { "background-color": "#963939" },
    "info": { "background-color": "black" }
}

export default function Notification({notification}: NotificationProps) {
    const { deleteNotification } = useContext(myContext)

    useEffect(() => {
            const timeoutId = setTimeout(() => {
                deleteNotification(notification.id)
            },5000)

            return () => {
                clearTimeout(timeoutId);
            };
        }, [deleteNotification, notification.id])

    return (
        <>
            <div className={styles.notificationContainer} style={notificationColors[notification.type]}>
                <div className={styles.notificationMesasge}>
                    { notification.message }
                </div>
                <div className={styles.notificationOption}>
                    <div className={styles.notificationOptionClose} onClick={() => deleteNotification(notification.id)}>
                        <FaTimes color="white" />
                    </div>
                </div>
            </div>
        </>
    )
}