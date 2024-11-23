import { useState } from 'react'
import { GoogleLoginButton, FacebookLoginButton, AppleLoginButton } from "react-social-login-buttons"
import { useNavigate } from "react-router-dom"
import FormInputBlock from "../../../components/FormInputBlock/forminputblock"
import { AuthOrigins } from '../../../types/enums'
import { UserModel } from '../../../types/interfaces'

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function signIn(provider: AuthOrigins) {
        if(provider !== AuthOrigins.Local) {
            window.open(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/${provider}`, "_self")
        }

        if(email.length === 0 || password.length === 0) {
            alert("Please enter an email and password")
            return
        }

        const body: UserModel = {
            auth_origin: AuthOrigins.Local,
            email: email,
            password: password
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/${provider}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error()
            }

            navigate("/library")
        })
        .catch((err) => {
            alert("Login failed")
        })
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-[400px] p-[10px] border-2 border-black rounded-[10px] drop-shadow-[5px_5px_5px_black] bg-[#FAF9F6] flex items-center justify-center flex-col">
                <h3 className="m-0 text-2xl font-typeMachine">Login</h3>
                <div onClick={() => navigate("/create_account")} className="font-typeMachine curosr-pointer transition-all duration-100 ease-in-out hover:text-[#00008B]">create an account here</div>
                <hr className="m-0 w-1/2 mb-2" />
                <form className="mb-3" onSubmit={() => signIn(AuthOrigins.Local)}>
                    <FormInputBlock>
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={email} onChange={e => setEmail(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={password} onChange={e => setPassword(e.target.value)}/>
                    </FormInputBlock>

                    <input type="submit" 
                           value="Login"
                           className="h-[30px] mt-2 bg-transparent border border-black rounded-[5px] transition-all duration-100 ease-in-out hover:bg-black hover:text-white font-bold p-2 leading-none disabled:cursort-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:text-gray-500"/>
                </form>
                <GoogleLoginButton className="!w-full" onClick={() => signIn(AuthOrigins.Google)} />
                <AppleLoginButton className="!w-full" />
                <FacebookLoginButton className="!w-full" onClick={() => signIn(AuthOrigins.Facebook)} />
            </div>
        </div>
    )
}