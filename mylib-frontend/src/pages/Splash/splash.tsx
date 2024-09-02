import { Navigate, NavLink } from "react-router-dom"
import { useContext } from "react"
import { myContext } from "../Context/context"

export default function Splash() {
    const ctx = useContext(myContext)

    if(ctx.user && Object.keys(ctx.user).length) {
        return <Navigate to="/library"/>
    }

    return (
        <div className="w-screen h-screen">
            <div className="inline-block p-2.5">
                <h2 className="font-typeMachine text-3xl">Mylib.ink</h2>
                <hr className="w-full justify-self-start m-0 bg-black h-0.5"/>
            </div>
            <div className="h-9/10 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="font-typeMachine text-5xl m-0 font-bold">Manage your library and keep notes on your favorite books</h1>
                    <hr className="w-full h-1 bg-black"/>
                    <NavLink to="/login">
                        <div  className="mt-1 flex justify-center items-center h-[70px] w-[200px] border border-black rounded-[10px] text-black text-[1.3em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">
                            Sign in
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}