import styles from "./splash.module.css"
import { NavLink } from "react-router-dom"

export default function Splash() {
    return (
        <div className={styles.splashContainer}>
            <div className={styles.introBlock}>
                <h2 className={styles.introText}>Mylib.io</h2>
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