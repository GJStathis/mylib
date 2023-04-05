import styles from "./filterselect.module.css"

type FilterSelectProps = {
    listOfSelectValues: string[]
    selectedVal: string
    setSelectValue: React.Dispatch<string>
}

export default function FilterSelect({listOfSelectValues, selectedVal, setSelectValue}: FilterSelectProps) {

    function selectValue(val: string) {
        if(selectedVal === val) {
            setSelectValue("")
        } else {
            setSelectValue(val)
        }    
    }

    return (
        <div className={styles.selectContainer}>
            {
                listOfSelectValues.map((val, idx) => {
                    return <button key={idx} type="button" onClick={() => selectValue(val)} className={`${selectedVal === val ? styles.isSelected : undefined} ${styles.filterButton}`}>{val}</button>
                })
            }
        </div>
    )
}