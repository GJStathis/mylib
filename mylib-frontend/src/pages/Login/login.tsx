import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons"
import styles from "./login.module.css"

export default function Login(){

    function signIn(provider: string) {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/${provider}`, "_self")
    }

    return (
        <div className={styles.centerDiv}>
            <div className={styles.loginDiv}>
                <h3 className={styles.loginText}>Login</h3>
                <hr className={styles.loginDivider} />
                <GoogleLoginButton onClick={() => signIn("google")} />
                <FacebookLoginButton onClick={() => signIn("facebook")} />
            </div>
        </div>
    )
}