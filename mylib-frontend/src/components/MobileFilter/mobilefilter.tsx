import DropdownContainer from "../DropdownContainer/dropdowncontainer"
import FilterDate from "../FilterDate/filterdate"
import FilterSelect from "../FilterSelect/filterselect"
// import styles from "./mobilefilter.module.css"

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
        <DropdownContainer dropdownStyle="flex border border-black absolute left-0 right-0 mt-[288px] w-full bg-[#FAF9F6] flex-col items-center">
            <div className="mt-[10px] mb-[10px] flex w-full justify-center items-center">
                <input type="search" className="h-[45px] max-w-[400px] border border-black rounded-[20px] bg-transparent text-[#344d56] text-[1.2em] font-typeMachine" placeholder="Look up a title or author" size={30} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>

            <div className="flex flex-row w-full mb-[10px]">
                <div className="flex flex-col mr-[10px] ml-[10px] justify-self-start">
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

            <div className="flex w-full ml-[10px] mb-[10px]">
                <button onClick={() => clearFilters()} className="h-[45px] w-[100px] bg-transparent border border-black rounded-[10px] cursor-pointer font-type-machine text-[1em] transition-all duration-100 ease-in-out">clear filter</button>
            </div>
        </DropdownContainer>
    )
}