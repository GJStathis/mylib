import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons"
import styles from "./login.module.css"

export default function Login(){

    function signIn(provider: string) {
        //console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/${provider}`)
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/${provider}`, "_self")
    }

    return (
        <div className={styles.centerDiv}>
            <div className={styles.loginDiv}>
                <GoogleLoginButton onClick={() => signIn("google")} />
                <FacebookLoginButton onClick={() => signIn("facebook")} />
            </div>
        </div>
    )
}