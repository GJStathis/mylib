import { PropsWithChildren } from "react"
import styles from "./filterdropdownitem.module.css"

type FilterDropdownItemProps = PropsWithChildren & {
    filterName: string
}

export default function FilterDropdownItem({children, filterName}: FilterDropdownItemProps) {

    return (
        <div className={styles.dropdownItem}>
            <button className={styles.dropdownButton}>{filterName}</button>
            <div className={styles.subFilter}>
                {children}
            </div>
        </div>
    )
}