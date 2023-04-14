import DropdownContainer from "../DropdownContainer/dropdowncontainer"
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

    return (
        <DropdownContainer dropdownStyle={styles.filterDropdown}>
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
        </DropdownContainer>
    )
}