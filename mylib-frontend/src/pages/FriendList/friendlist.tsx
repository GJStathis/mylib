import { useState } from "react"
import { Friend } from "../../types/interfaces"
import FriendCard from "../../components/FriendCard/friendcard"
import styles from './friendlist.module.css'

export default function FriendList() {
    const [friends, setFriends] = useState([
    ])

    return(
        <div className={styles.container}>
            <h1 className={styles.header}>Friends list</h1>

            <hr className={styles.linebreak}/>

            { friends.length > 0 ?
                friends.map((friend: Friend, idx: number) => {
                    return(
                        <FriendCard friend={friend} key={idx} />
                    )
                })
                : <h2>Go see what other librarians are up to!</h2>
            }
        </div>
    )
}