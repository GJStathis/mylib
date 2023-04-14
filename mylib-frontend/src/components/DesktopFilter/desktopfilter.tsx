import FilterSelect from "../FilterSelect/filterselect"
import FilterDate from "../FilterDate/filterdate"
import FilterDropdownItem from "../FilterDropdownItem/filterdropdownitem"
import styles from "./desktopfilter.module.css"
import DropdownContainer from "../DropdownContainer/dropdowncontainer"

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

    return (
        <>
            <input type="search" className={styles.searchBar} placeholder="Look up a title or author" size={30} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <DropdownContainer dropdownStyle={styles.filterDropdown}>
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
                </DropdownContainer>
            <button onClick={() => clearFilters()} className={styles.clearFilterButton}>clear filter</button>
        </>
    )
}