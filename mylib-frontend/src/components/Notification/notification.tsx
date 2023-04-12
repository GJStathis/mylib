import { useContext, useEffect, useState, useCallback } from "react"
import { myContext } from "../../pages/Context/context"
import { FaTimes } from "react-icons/fa"
import styles from "./notification.module.css"

type NotificationProps = {
    notifyObject: any
}

export default function Notification({notifyObject}: NotificationProps) {
    const { deleteNotification } = useContext(myContext)

    useEffect(() => {
            const timeoutId = setTimeout(() => {
                deleteNotification(notifyObject.id)
            },5000)

            return () => {
                clearTimeout(timeoutId);
            };
        }, [])

    return (
        <>
            <div className={styles.notificationContainer}>
                <div className={styles.notificationMesasge}>
                    { notifyObject.message }
                </div>
                <div className={styles.notificationOption}>
                    <div className={styles.notificationOptionClose} onClick={() => deleteNotification(notifyObject.id)}>
                        <FaTimes />
                    </div>
                </div>
            </div>
        </>
    )
}