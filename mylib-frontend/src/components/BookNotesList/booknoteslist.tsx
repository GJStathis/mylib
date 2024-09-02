// import styles from "./booknoteslist.module.css"

type BookNotesListProps = {
    notes: string[],
    setNotes: React.Dispatch<any>
}

export default function BookNotesList({notes, setNotes}: BookNotesListProps) {

    function addNote() {
        setNotes([...notes, ""])
    }

    function updateNote(e: React.ChangeEvent<HTMLTextAreaElement>, id: number) {
        const nextNotes = notes.map((val, idx) => {
            if(id === idx) {
                return e.target.value
            }
            return val
        })

        setNotes(nextNotes)
    }

    function deleteNote(id: number) {
        const nextNotes = notes.filter((val, idx) => {
            return idx !== id
        })

        setNotes(nextNotes)
    }

    return (
        <div className="flex flex-col p-[10px]">
        
            {
                notes.map((val, idx) => {
                    return (
                        <div className="flex pb-[10px]" key={`div-${idx}`}>
                            <textarea rows={4} cols={40} key={idx} value={val} className="border-2 border-black rounded-[10px] font-typeMachine resize" onChange={(e) => updateNote(e, idx)}/>
                            <button type="button"className="h-[20px] w-[20px] rounded-full border border-[#cb4848] bg-[#cb4848] text-white self-center ml-[10px] hover:bg-[#a73b3b] leading-none" key={`remove-${idx}`} onClick={() => deleteNote(idx)}>X</button>
                        </div>
                    )
                })
            }

            <button type="button" className="w-[30px] h-[30px] rounded-full border border-[#5b824e] bg-[#5b824e] hover:bg-[#4e7043]" onClick={() => addNote()}>+</button>
        </div>
    )
}