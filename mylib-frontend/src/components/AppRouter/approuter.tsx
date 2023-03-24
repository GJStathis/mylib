import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Splash from "../../pages/Splash/splash"
import Login from "../../pages/Login/login"
import Library from "../../pages/Library/library"
import Logout from "../../pages/Logout/logout"
import ProtectedComponent from "../ProtectedComponent/protectedcomponent"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Splash/>}/>
                
                <Route path="/library" element={<ProtectedComponent><Library/></ProtectedComponent>} />

                <Route path="/login" element={<Login/>} />

                <Route path="/logout" element={<Logout/>} />

                <Route path="*" element={<Navigate to="/" />}/>

            </Routes>
        </BrowserRouter>
    )
}