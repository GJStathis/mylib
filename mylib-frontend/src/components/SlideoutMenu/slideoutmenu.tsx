import DropdownContainer from "../DropdownContainer/dropdowncontainer"
import { FaGear } from "react-icons/fa6"

export default function SlideoutMenu() {

    return(
        <>
            <DropdownContainer 
                dropdownStyle="inline-block fixed top-16 bottom-0"
                buttonIcon={<FaGear size={20}/>}
            >
                <div className="w-[30vw] h-full border border-black">
                    <h2>User name</h2>
                    <ul>
                        <li>Your library</li>
                        <li>Friends list</li>
                        <li>Find a friend</li>
                    </ul>
                    <button>Logout</button>
                </div>
            </DropdownContainer>
        </>
    )
}