import { PropsWithChildren } from "react"

type FilterDropdownItemProps = PropsWithChildren & {
    filterName: string
}

export default function FilterDropdownItem({children, filterName}: FilterDropdownItemProps) {

    return (
        <div className="dropdownItem group relative">
            <button className="h-[45px] w-[150px] bg-white border border-black font-typeMachine">{filterName}</button>
            <div className="subFilter hidden group-hover:inline-block absolute">
                {children}
            </div>
        </div>
    )
}