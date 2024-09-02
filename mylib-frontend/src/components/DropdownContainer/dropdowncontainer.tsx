import { PropsWithChildren, useRef, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa"

type DropdownContainerProps = PropsWithChildren & {
    dropdownStyle: string,
    dropdownContainerStyle?: string
    buttonIcon?: React.ReactNode
}

export default function DropdownContainer({children, dropdownStyle, buttonIcon = <FaFilter/>, dropdownContainerStyle = "flex flex-col justify-center items-center"}: DropdownContainerProps) {

    const dropDownRef = useRef<any>(null)

    const [showFilterDropdown, setShowFilterDropdown] = useState("hidden !important")

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) && showFilterDropdown === dropdownStyle) {
                setShowFilterDropdown("hidden !important")
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
        if(showFilterDropdown === "hidden !important") {
            setShowFilterDropdown(dropdownStyle)
        } else {
            setShowFilterDropdown("hidden !important")
        }
    }

    return (
        <div ref={dropDownRef} className={dropdownContainerStyle}>
            <button onClick={() => openCloseFilterDropdown()} className="h-[45px] w-[45px] bg-transparent border border-black rounded-[10px] mx-[10px] cursor-pointer transition-all duration-100 ease-in-out hover:bg-black hover:text-white flex justify-center items-center">{buttonIcon}</button>
            <div className={showFilterDropdown}>
                {children}
            </div>
        </div>
    )
}