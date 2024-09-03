import { Friend } from "../../types/interfaces"

type FriendCardProps = {
    friend: Friend
}

export default function FriendCard({ friend }: FriendCardProps) {
    return (
        <div className="w-1/2 h-[75px] border border-black rounded-[10px] mb-[10px] flex flex-row">
            <h2 className="w-3/4 flex self-center pl-[20px]">
                {friend.friendName}
            </h2>

            <div className="w-1/4 flex justify-around pr-[20px] self-center">
                <button className="w-[80px] h-[45px] no-underline border border-black bg-transparent rounded-[10px] text-black font-bold cursor-pointer transition-all duration-100 ease-in-out hover:bg-black hover:text-white">Vist library</button>
                <button className="w-[80px] h-[45px] no-underline border border-[#963939] bg-transparent rounded-[10px] text-black font-bold cursor-pointer transition-all duration-100 ease-in-out hover:bg-[#963939] hover:text-white">Remove friend</button>
            </div>
        </div>
    )
}