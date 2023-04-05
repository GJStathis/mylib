import { useContext, useEffect, useState, useCallback } from "react"
import { myContext } from "../../pages/Context/context"
import { FaTimes } from "react-icons/fa"
import styles from "./notification.module.css"

export default function Notification() {
    const { alertMessage, setAlertMessage } = useContext(myContext)
    const [renderComp, setRenderComp] = useState<boolean>(false)
    const [currentTimeoutId, setCurrentTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const removeNotification = useCallback(function removeNotification() {
        if(currentTimeoutId) {
            clearTimeout(currentTimeoutId)
            setCurrentTimeoutId(null)
        }
        setRenderComp(false)
        setAlertMessage("")
    }, [currentTimeoutId, setCurrentTimeoutId, setRenderComp, setAlertMessage])

    useEffect(() => {
        if(alertMessage !== "") {
            setRenderComp(true)

            const timeoutId = setTimeout(() => {
                setCurrentTimeoutId(null)
                removeNotification()
            },5000)

            setCurrentTimeoutId(timeoutId)
        }
     }, [alertMessage, setRenderComp, setCurrentTimeoutId, removeNotification])

    return (
        <>
            { renderComp &&
                <div className={styles.notificationContainer}>
                    <div className={styles.notificationMesasge}>
                        { alertMessage }
                    </div>
                    <div className={styles.notificationOption}>
                        <div className={styles.notificationOptionClose} onClick={() => removeNotification()}>
                            <FaTimes />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}