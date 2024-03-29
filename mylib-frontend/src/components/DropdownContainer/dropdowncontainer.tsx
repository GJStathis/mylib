import { PropsWithChildren, useRef, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa"
import styles from "./dropdowncontainer.module.css"

type DropdownContainerProps = PropsWithChildren & {
    dropdownStyle: string,
    dropdownContainerStyle?: string
    buttonIcon?: React.ReactNode
}

export default function DropdownContainer({children, dropdownStyle, buttonIcon = <FaFilter/>, dropdownContainerStyle = styles.filterDropdownContainer}: DropdownContainerProps) {

    const dropDownRef = useRef<any>(null)

    const [showFilterDropdown, setShowFilterDropdown] = useState(styles.hideFilterDropdown)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) && showFilterDropdown === dropdownStyle) {
                setShowFilterDropdown(styles.hideFilterDropdown)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [dropDownRef, showFilterDropdown])

    function openCloseFilterDropdown() {
        if(showFilterDropdown === styles.hideFilterDropdown) {
            setShowFilterDropdown(dropdownStyle)
        } else {
            setShowFilterDropdown(styles.hideFilterDropdown)
        }
    }

    return (
        <div ref={dropDownRef} className={dropdownContainerStyle}>
            <button onClick={() => openCloseFilterDropdown()} className={styles.filterButton}>{buttonIcon}</button>
            <div className={showFilterDropdown}>
                {children}
            </div>
        </div>
    )
}