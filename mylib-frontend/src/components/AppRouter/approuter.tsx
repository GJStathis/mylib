import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Splash from "../../pages/Splash/splash"
import Login from "../../pages/Login/login"
import Library from "../../pages/Library/library"
import FriendList from "../../pages/FriendList/friendlist"
import ProtectedComponent from "../ProtectedComponent/protectedcomponent"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Splash/>}/>
                
                <Route path="/library" element={<ProtectedComponent><Library/></ProtectedComponent>} />

                <Route path="/friends" element={<ProtectedComponent><FriendList/></ProtectedComponent>} />

                <Route path="/login" element={<Login/>} />

                <Route path="*" element={<Navigate to="/" />}/>

            </Routes>
        </BrowserRouter>
    )
}