import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons"

export default function Login(){

    function signIn(provider: string) {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/${provider}`, "_self")
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-[200px] p-[10px] border-2 border-black rounded-[10px] drop-shadow-[5px_5px_5px_black] bg-[#FAF9F6] flex items-center justify-center flex-col">
                <h3 className="m-0 text-2xl font-typeMachine">Login</h3>
                <hr className="m-0 w-1/2 mb-5" />
                <GoogleLoginButton onClick={() => signIn("google")} />
                <FacebookLoginButton onClick={() => signIn("facebook")} />
            </div>
        </div>
    )
}