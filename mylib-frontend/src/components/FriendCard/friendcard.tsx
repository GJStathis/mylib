import styles from "./friendcard.module.css"
import { Friend } from "../../types/interfaces"

type FriendCardProps = {
    friend: Friend
}

export default function FriendCard({ friend }: FriendCardProps) {
    return (
        <div className={styles.friendCardContainer}>
            <h2 className={styles.friendSection}>
                {friend.friendName}
            </h2>

            <div className={styles.buttonSection}>
                <button className={styles.button}>Vist library</button>
                <button className={styles.removeFriend}>Remove friend</button>
            </div>
        </div>
    )
}