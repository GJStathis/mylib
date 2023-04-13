import styles from "./splash.module.css"
import { Navigate, NavLink } from "react-router-dom"
import { useContext } from "react"
import { myContext } from "../Context/context"

export default function Splash() {
    const ctx = useContext(myContext)

    if(ctx.user && Object.keys(ctx.user).length) {
        return <Navigate to="/library"/>
    }

    return (
        <div className={styles.splashContainer}>
            <div className={styles.introBlock}>
                <h2 className={styles.introText}>Mylib.ink</h2>
                <hr className={styles.introDivider}/>
            </div>
            <div className={styles.webContainer}>
                <div className={styles.centerContent}>
                    <h1 className={styles.splashText}>Manage your library and keep notes on your favorite books</h1>
                    <hr className={styles.splashDivider}/>
                    <NavLink to="/login">
                        <div  className={styles.loginButton}>
                            Sign in
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}