import { useState, useRef, useEffect } from "react"
import { FaFilter } from "react-icons/fa"
import FilterDate from "../FilterDate/filterdate"
import FilterSelect from "../FilterSelect/filterselect"
import styles from "./mobilefilter.module.css"

type MobileFilterProps = {
    readStatusFilter: string,
    searchQuery: string,
    dateCompletedFilter: Date | null,
    setSearchQuery: any,
    setReadStatusFilter: any,
    setDateCompletedFilter: any,
    clearFilters: any
}

export default function MobileFilter({readStatusFilter, searchQuery, dateCompletedFilter, setSearchQuery, setReadStatusFilter, setDateCompletedFilter, clearFilters}: MobileFilterProps) {

    const dropDownRef = useRef<any>(null)

    const [showFilterDropdown, setShowFilterDropdown] = useState(styles.hideFilter)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target) && showFilterDropdown === styles.showFilter) {
                setShowFilterDropdown(styles.hideFilter)
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
        if(showFilterDropdown === styles.hideFilter) {
            setShowFilterDropdown(styles.showFilter)
        } else {
            setShowFilterDropdown(styles.hideFilter)
        }
    }

    return (
        <div ref={dropDownRef}>
            <button onClick={() => openCloseFilterDropdown()} className={styles.filterButton}><FaFilter/></button>
            <div className={`${showFilterDropdown} ${styles.filterDropdownContainer}`}>
                <div className={styles.searchFilter}>
                    <input type="search" className={styles.searchBar} placeholder="Look up a title or author" size={30} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>

                <div className={styles.filterOptions}>
                    <div className={styles.selectFilter}>
                        Filter by status
                        <FilterSelect 
                            listOfSelectValues={["Not Read", "Reading", "Completed"]}
                            selectedVal={readStatusFilter}
                            setSelectValue={setReadStatusFilter}
                        />
                    </div>

                    <div>
                        Filter by month completed
                        <FilterDate
                            selectedVal={dateCompletedFilter}
                            setSelectValue={setDateCompletedFilter}
                        />
                    </div>
                </div>

                <div className={styles.clearButtonContainer}>
                    <button onClick={() => clearFilters()} className={styles.clearFilterButton}>clear filter</button>
                </div>
            </div>
        </div>
    )
}