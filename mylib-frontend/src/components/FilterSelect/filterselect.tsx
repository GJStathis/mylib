type FilterSelectProps = {
    listOfSelectValues: string[]
    selectedVal: string
    setSelectValue: React.Dispatch<string>
}

export default function FilterSelect({listOfSelectValues, selectedVal, setSelectValue}: FilterSelectProps) {

    const isSelectedStyle = "w-[100px] h-[25px] bg-gray-500 text-white border border-black cursor-pointer font-typeMachine"
    const filterButtonStyle = "w-[100px] h-[25px] bg-white border border-black cursor-pointer font-typeMachine hover:bg-gray-500 hover:text-white"

    function selectValue(val: string) {
        if(selectedVal === val) {
            setSelectValue("")
        } else {
            setSelectValue(val)
        }    
    }

    
    return (
        <div className="flex flex-col">
            {
                listOfSelectValues.map((val, idx) => {
                    const selectedValStyles = selectedVal === val ? isSelectedStyle : filterButtonStyle
                    return <button key={idx} type="button" onClick={() => selectValue(val)} className={selectedValStyles}>{val}</button>
                })
            }
        </div>
    )
}