import FilterSelect from "../FilterSelect/filterselect"
import FilterDate from "../FilterDate/filterdate"
import FilterDropdownItem from "../FilterDropdownItem/filterdropdownitem"
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
            <input type="search" className="h-[45px] w-[400px] border border-black rounded-[20px] bg-transparent text-[#344d56] text-[1.2em] font-typeMachine p-2.5" placeholder="Look up a title or author" size={30} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <DropdownContainer dropdownStyle="inline-block absolute mt-[140px]">
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
            <button onClick={() => clearFilters()} className="h-[45px] w-[100px] bg-transparent border border-black rounded-[10px] cursor-pointer font-typeMachine text-[1em] transition-all duration-100 ease-in-out hover:bg-black hover:text-white">clear filter</button>
        </>
    )
}