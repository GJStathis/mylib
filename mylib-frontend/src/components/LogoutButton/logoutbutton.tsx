import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { ResponseMessage } from "../../types/interfaces"
import { myContext } from "../../pages/Context/context"
// import styles from "./logoutbutton.module.css"

export default function LogoutButton() {
    const { setUser } = useContext(myContext)

    const [returnToSpalsh, setReturnToSplash] = useState<boolean>(false)

    function logoutUser() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data: ResponseMessage) => {
            console.log(data.message)
            setUser({})
            setReturnToSplash(true)
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
            <button onClick={() => logoutUser()} className="w-[80px] h-[45px] no-underline border border-[#963939] bg-transparent rounded-[10px] text-black font-bold cursor-pointer transition-all duration-100 ease-in-out hover:bg-[#963939] hover:text-white">Logout</button>

            { returnToSpalsh &&
                <Navigate to="/" />
            }

        </>
    )
}