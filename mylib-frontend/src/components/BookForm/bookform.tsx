import { useContext, useState } from "react"
import { BookModel, ResponseMessage } from "../../types/interfaces"
import FormInputBlock from "../FormInputBlock/forminputblock"
import BookNotesList from "../BookNotesList/booknoteslist"
import { BooksDispatchContext } from "../../pages/Library/context"
import { getDateString } from "../../utils/utils"
import styles from "./bookform.module.css"
import { myContext } from "../../pages/Context/context"

type BookFormProps = {
    initBook: BookModel
    is_update: boolean
}

export default function BookForm({initBook, is_update}: BookFormProps) {
    const { setAlertMessage } = useContext(myContext)
    const { libraryDispatch } = useContext(BooksDispatchContext)
    const {book_id, book_title, reading_status, added_date, completed_date, notes, cover_image_path, author} = initBook

    const [bookTitle, setBookTitle] = useState<string>(book_title)
    const [readingStatus, setReadingStatus] = useState<string | undefined>(reading_status)
    const [completedDate, setCompletedDate] = useState<string>(getDateString(completed_date))
    const [coverFile, setCoverFile] = useState<File | undefined>(undefined)
    const [notes_array, setNotes] = useState<string[]>(notes)
    const [bookAuthor, setBookAuthor] = useState<string>(author)

    function validateInput() {
        if(bookTitle === "" || !readingStatus || bookAuthor === "") {
            throw Error("Book title or status cannot be empty")
        }

        const allowed_files = ["image/jpeg", "image/png"]

        if(coverFile && !allowed_files.includes(coverFile.type)) {
            throw Error(`Only images can be uploaded for book covers not ${coverFile.type}`)
        }
    }

    function clearState() {
        setBookTitle("")
        setReadingStatus(undefined)
        setCoverFile(undefined)
        setCompletedDate("")
        setNotes([])
        setBookAuthor("")
    }

    function submitNewBook(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            validateInput()
            const newBook: BookModel = {
                book_id: book_id,
                book_title: bookTitle,
                reading_status: readingStatus!,
                added_date: added_date,
                completed_date: completedDate ? new Date(completedDate) : undefined,
                notes: notes_array,
                cover_image_path: cover_image_path,
                author: bookAuthor
            }

            const formData = new FormData()
            formData.append("data", JSON.stringify(newBook))
            if(coverFile) {
                formData.append("file", coverFile)
            }

            const endpoint = is_update ? `update/${initBook.book_title}` : "save"
            fetch(`${process.env.REACT_APP_BACKEND_URL}/library/${endpoint}`, {
                method: "POST",
                credentials: "include",
                body: formData
            })
            .then((res) => res.json())
            .then((data: ResponseMessage) => {
                if(data.status === "success") {

                    setAlertMessage(data.message!)
                    
                    if(data.data!.imageURL) {
                        newBook.cover_image_path = data.data!.imageURL
                    }
                    if(!is_update) {
                        newBook.book_id = data.data!.book_id
                        clearState()
                    }
                    libraryDispatch({
                        type: is_update ? "update" : "add",
                        data: newBook
                    })
                } else {
                    setAlertMessage(`Processes Failed ${data.message}`)
                }
            })
            .catch((err) => console.error(err))
        } catch(err) {
            alert(err)
        }
    }

    return (
    <div className={styles.bookForm}>
        <form onSubmit={(e) => submitNewBook(e)}>
            <div className={styles.formContainer}>
                <div>
                    <FormInputBlock>
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" id="bookTitle" className={styles.formInput} value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="bookAuthor">Book author</label>
                        <input type="text" id="bookAuthor" className={styles.formInput} value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}/>
                    </FormInputBlock>

                    <div className={styles.completeDateInput}>
                        <FormInputBlock>
                            <label htmlFor="competedDate">Completed Date</label>
                            <input className={styles.dateInput} type="date" id="competedDate" value={completedDate} defaultValue={completedDate} onChange={(e) => setCompletedDate(e.target.value)}/>
                        </FormInputBlock>
                            <button  type="button" className={styles.clearButton} onClick={() => setCompletedDate("")}>clear</button>
                    </div>

                    <div className={styles.radioContainer}>
                        Reading status
                        <div>
                            <label>
                                <input className={styles.radioButton} type="radio" name="read_status" checked={readingStatus === "Not Read"} onChange={() => setReadingStatus("Not Read")}/> Not Read
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" name="read_status" checked={readingStatus === "Reading"} onChange={() => setReadingStatus("Reading")}/> Reading
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" name="read_status" checked={readingStatus === "Completed"} onChange={() => setReadingStatus("Completed")}/> Completed
                            </label>
                        </div>
                    </div>

                </div>
                <div className={styles.imageContainer}>
                    <FormInputBlock>
                        <label htmlFor="bookCover">Upload {is_update ? "a new" : "a" } cover image</label>
                        <input type="file" id="bookCover" onChange={(e) => setCoverFile(e.target!.files![0])}/>
                    </FormInputBlock>
                    { coverFile &&
                        <img className={styles.imagePreview} src={URL.createObjectURL(coverFile as Blob)} alt="Could not find file"/>
                    }
                </div>
            </div>
            
            <div className={styles.bookNotesList}>
                Book Notes
                <BookNotesList notes={notes_array} setNotes={setNotes}  />
            </div>

            <input type="submit" value={`${is_update ? "Update" : "Add"} book`} className={styles.bookFormSubmit}/>
        </form>
    </div>
    )
}