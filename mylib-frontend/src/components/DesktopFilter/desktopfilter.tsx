import { useState, useRef, useEffect } from "react"
import { FaFilter } from "react-icons/fa"
import FilterSelect from "../FilterSelect/filterselect"
import FilterDate from "../FilterDate/filterdate"
import FilterDropdownItem from "../FilterDropdownItem/filterdropdownitem"
import styles from "./desktopfilter.module.css"

type DesktopFilterProps = {
    readStatusFilter: string,
    searchQuery: string,
    dateCompletedFilter: Date | null,
    setSearchQuery: any,
    setReadStatusFilter: any,
    setDateCompletedFilter: any,
    clearFilters: any
}

export default function DesktopFilter({readStatusFilter, searchQuery, dateCompletedFilter, setSearchQuery, setReadStatusFilter, setDateCompletedFilter, clearFilters}: DesktopFilterProps) {
    const dropDownRef = useRef<any>(null)

    const [showFilterDropdown, setShowFilterDropdown] = useState(styles.hideFilterDropdown)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) && showFilterDropdown === styles.filterDropdown) {
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
            setShowFilterDropdown(styles.filterDropdown)
        } else {
            setShowFilterDropdown(styles.hideFilterDropdown)
        }
    }

    return (
        <>
            <input type="search" className={styles.searchBar} placeholder="Look up a title or author" size={30} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <div ref={dropDownRef} className={styles.filterDropdownContainer}>
                <button onClick={() => openCloseFilterDropdown()} className={styles.filterButton}><FaFilter/></button>
                <div className={showFilterDropdown}>
                    <FilterDropdownItem filterName="Status">
                        <FilterSelect 
                            listOfSelectValues={["Not Read", "Reading", "Completed"]}
                            selectedVal={readStatusFilter}
                            setSelectValue={setReadStatusFilter}
                        />
                    </FilterDropdownItem>

                    <FilterDropdownItem filterName="Month completed">
                        <FilterDate
                            selectedVal={dateCompletedFilter}
                            setSelectValue={setDateCompletedFilter}
                        />
                    </FilterDropdownItem>

                </div>
            </div>
            <button onClick={() => clearFilters()} className={styles.clearFilterButton}>clear filter</button>
        </>
    )
}