import DropdownContainer from "../DropdownContainer/dropdowncontainer"
import { FaGear } from "react-icons/fa6"
import { UserModel } from "../../types/interfaces"
import LogoutButton from "../LogoutButton/logoutbutton"
import { useNavigate } from "react-router-dom"
import { convertToTitleCase } from "../../utils/utils"

type SlideOutMenuProps = {
    user: UserModel 
}

export default function SlideoutMenu({ user }: SlideOutMenuProps) {
    const navigate = useNavigate()

    return(
        <>
            <DropdownContainer 
                dropdownStyle="inline-block fixed top-16 bottom-0 right-0 transform translate-x-0 opacity-100"
                hideDropdownStyle="inline-block fixed top-16 bottom-0 right-0 transform translate-x-full opacity-0"
                extraStyles="transition duration-500 ease-in-out"
                buttonIcon={<FaGear size={20}/>}
            >
                <div className="w-[15vw] h-full border border-black font-typeMachine p-2 flex flex-col">
                    <h2 className="text-2xl">{user !== undefined ? `Hello ${convertToTitleCase(user.display_name)}...` : ""}</h2>

                    <div className="pt-2">
                        <h3 className="text-m">Navigate to your...</h3>
                        <ul className="list-disc list-inside text-gray-800">
                            <li className="slideout-item" onClick={() => navigate("/library")} >Library</li>
                            <li className="slideout-item">Discover</li>
                            <li className="slideout-item">Dashboard</li>
                            <li className="slideout-item" onClick={() => navigate("/friends")}>Friends list</li>
                        </ul>
                    </div>

                    <div className="w-full mt-auto">
                        <LogoutButton />
                    </div>
                </div>
            </DropdownContainer>
        </>
    )
}