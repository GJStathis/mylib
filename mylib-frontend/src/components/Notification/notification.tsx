import { useContext, useEffect } from "react"
import { myContext } from "../../pages/Context/context"
import { FaTimes } from "react-icons/fa"
import { NotificationObject } from "../../types/interfaces"
//import styles from "./notification.module.css"

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
            <div className="max-w-[500px] min-w-[150px] h-[50px] border border-black flex flex-row" style={notificationColors[notification.type]}>
                <div className="flex items-center justify-center h-full w-[90%] text-white">
                    { notification.message }
                </div>
                <div className="flex justify-end w-[10%] h-full">
                    <div className="hover:cursor-pointer" onClick={() => deleteNotification(notification.id)}>
                        <FaTimes color="white" />
                    </div>
                </div>
            </div>
        </>
    )
}