import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { myContext } from "../../app/pages/Context/context";
import Loading from "../Loading/loading";

export default function ProtectedComponent({children}: PropsWithChildren) {
    const ctx = useContext(myContext)

    if(ctx.user !== undefined && Object.keys(ctx.user).length === 0) {
        console.log("user does not have access. cannot access")
        return <Navigate to="/"/>
    }

    if(ctx) {
        return (
            <>
                { children }
            </>
        )
    }

    console.log("loading")
    return <Loading/>
}