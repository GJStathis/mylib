import styles from "./booknoteslist.module.css"

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
        <div className={styles.noteListContainer}>
        
            {
                notes.map((val, idx) => {
                    return (
                        <div className={styles.noteContainer} key={`div-${idx}`}>
                            <textarea rows={4} cols={40} key={idx} value={val} className={styles.bookNote} onChange={(e) => updateNote(e, idx)}/>
                            <button type="button"className={styles.deleteItemButton} key={`remove-${idx}`} onClick={() => deleteNote(idx)}>X</button>
                        </div>
                    )
                })
            }

            <button type="button" className={styles.addButton} onClick={() => addNote()}>+</button>
        </div>
    )
}