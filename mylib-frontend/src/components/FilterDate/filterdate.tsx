import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";


type FilterDateProps = {
    selectedVal: Date | null
    setSelectValue: React.Dispatch<Date>
}

export default function FilterDate({selectedVal, setSelectValue}: FilterDateProps) {

    return (
        <div>
            <DatePicker 
                selected={selectedVal}
                onChange={(date: Date) => setSelectValue(date)}
                className='border border-black rounded'
                dateFormat="MM/yyyy"
                placeholderText="Select a date" 
                showMonthYearPicker
                showFullMonthYearPicker
                showFourColumnMonthYearPicker
            />
        </div>
    )
}