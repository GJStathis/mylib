import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "../../types/interfaces";

export const myContext = createContext<UserContext>(undefined!)
export default function Context(props: PropsWithChildren<any>) {

    const [user, setUser] = useState<any>()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
            credentials: 'include'
        })
        .then((res) => {
            if(res.status == 401) {
                return {}
            }
            return res.json()
        })
        .then((data) => {
            console.log(`setting data ${JSON.stringify(data)}`)
            setUser(data)
        })
    }, [])

    return (
        <myContext.Provider value={{user: user, setUser: setUser}}>
            {props.children}
        </myContext.Provider>
    )
}

