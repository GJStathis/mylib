import styles from "./splash.module.css"

export default function Splash() {
    return (
        <div className={styles.webContainer}>
            <div className={styles.centerContent}>
                <h1>Manage your library and keep notes on your favorite books</h1>
                <a href="http://localhost:3000/login">sign in</a>
            </div>
        </div>
    )
}