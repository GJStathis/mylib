import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "../../../types/interfaces";

export const myContext = createContext<UserContext>(undefined!)
export default function Context(props: PropsWithChildren<any>) {

    const [user, setUser] = useState<any>()
    const [notifications, setNotifications] = useState<any>([])

    function createNotification(message: string, type: string) {
        setNotifications([...notifications, { message: message, type: type, id: notifications.length }])
    }

    function deleteNotification(id: number) {
        setNotifications(
            notifications.filter((notification: any) => notification.id !== id)
        )
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/user`, {
            credentials: 'include'
        })
        .then((res) => {
            if(res.status === 401) {
                return {}
            }
            return res.json()
        })
        .then((data) => {
            setUser(data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        <myContext.Provider value={
            {user: user, 
            setUser: setUser, 
            notifications: notifications, 
            createNotification: createNotification,
            deleteNotification: deleteNotification
            }}>
            {props.children}
        </myContext.Provider>
    )
}

