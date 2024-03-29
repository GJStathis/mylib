import DropdownContainer from "../DropdownContainer/dropdowncontainer"
import { FaGear } from "react-icons/fa6"
import styles from "./slideoutmenu.module.css"

export default function SlideoutMenu() {

    return(
        <>
            <DropdownContainer 
                dropdownStyle={styles.filterDropdown}
                buttonIcon={<FaGear size={20}/>}
            >
                <div className={styles.menu}>
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