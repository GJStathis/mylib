import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { myContext } from "../Context/context"

export default function Logout() {
    const { setUser } = useContext(myContext)

    const [returnToSpalsh, setReturnToSplash] = useState<boolean>(false)

    function logoutUser() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            setUser(null)
            setReturnToSplash(true)
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
            <button onClick={() => logoutUser()}>Logout</button>

            { returnToSpalsh &&
                <Navigate to="/" />
            }

        </>
    )
}