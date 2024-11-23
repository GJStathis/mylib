import { useState } from "react"
import { Friend } from "../../../types/interfaces"
import FriendCard from "../../../components/FriendCard/friendcard"

export default function FriendList() {
    const [friends, setFriends] = useState([
    ])

    return(
        <div className="flex justify-center items-center flex-col mt-[60px]">
            <h1 className="justify-self-start">Friends list</h1>

            <hr className="relative w-[50%]"/>

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