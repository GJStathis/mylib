import { useContext, useState, useEffect } from "react"
import FormInputBlock from "../../components/FormInputBlock/forminputblock"
import { BookModel } from "../../types/interfaces"
import { myContext } from "../Context/context"
import styles from "./library.module.css"

export default function Library() {
    const [books, setBooks] = useState<BookModel[]>([])

    const [bookTitle, setBookTitle] = useState<string>("")
    const [readingStatus, setReadingStatus] = useState<string>("Not Read")
    const [completedDate, setCompletedDate] = useState<string | undefined>(undefined)
    const [notes, setNotes] = useState<string[] | null>(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/library/all`)
        .then((res) => res.json())
        .then((data: BookModel[]) => {
            setBooks(data)
        })
        .catch((err) => console.error(err))
    },[])

    return (
        <div className={styles.libraryContainer}>
            <div>
                {
                    books.map((val) => {
                        return <div>val</div>
                    })
                }
            </div>
            
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormInputBlock>
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" id="bookTitle" value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="readingStatus">Reading Status</label>
                        <input type="text" id="bookTitle" value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" id="bookTitle" value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    </FormInputBlock>

                    <div>
                        <label>
                            <input type="radio" name="read_status" value="Not Read" onChange={() => setReadingStatus("Not Read")}/> Not Read
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="read_status" value="Reading" onChange={() => setReadingStatus("Reading")}/> Reading
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="read_status" value="Completed" onChange={() => setReadingStatus("Completed")}/> Completed
                        </label>
                    </div>

                    <FormInputBlock>
                        <label htmlFor="competedDate">Completed Date</label>
                        <input type="date" id="competedDate" value={completedDate} onChange={e => setCompletedDate(e.target.value)}/>
                    </FormInputBlock>

                </form>
            </div>
        </div>
    )
}