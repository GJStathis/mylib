import { useContext, useState, useEffect } from "react"
import { BookModel, ResponseMessage } from "../../types/interfaces"
import FormInputBlock from "../FormInputBlock/forminputblock"
import BookNotesList from "../BookNotesList/booknoteslist"
import { BooksDispatchContext } from "../../app/pages/Library/context"
import { getDateString, hashStringArray } from "../../utils/utils"
import { myContext } from "../../app/pages/Context/context"
import { Callback } from "../../types/type"

type BookFormProps = {
    initBook: BookModel
    is_update: boolean
    closeModal?: Callback
}

export default function BookForm({initBook, is_update, closeModal}: BookFormProps) {
    const MAX_FILE_SIZE = 1024

    const { createNotification } = useContext(myContext)
    const { libraryDispatch } = useContext(BooksDispatchContext)
    const {book_id, book_title, reading_status, added_date, completed_date, notes, cover_image_path, author} = initBook

    const [bookTitle, setBookTitle] = useState<string>(book_title)
    const [readingStatus, setReadingStatus] = useState<string | undefined>(reading_status)
    const [completedDate, setCompletedDate] = useState<string>(getDateString(completed_date))
    const [coverFile, setCoverFile] = useState<File | undefined>(undefined)
    const [notesArray, setNotes] = useState<string[]>(notes)
    const [bookAuthor, setBookAuthor] = useState<string>(author)
    const [canUpdate, setCanUpdate] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const initialNotesArrayHash = await hashStringArray(notes)
            const newNotesArrayHash = await hashStringArray(notesArray)

            //console.log(`state: ${bookTitle} old: ${book_title}`)

            if(
                bookTitle !== book_title ||
                readingStatus !== reading_status ||
                completedDate !== getDateString(completed_date) ||
                coverFile !== undefined ||
                initialNotesArrayHash !== newNotesArrayHash ||
                bookAuthor !== author
            ) {
                setCanUpdate(true)
            } else {
                setCanUpdate(false)
            }

    })()

    }, [bookTitle, readingStatus, completedDate, coverFile, notesArray, bookAuthor])

    function validateInput() {
        if(bookTitle === "" || !readingStatus || bookAuthor === "") {
            throw Error("Book title, status or author cannot be empty")
        }

        const allowed_files = ["image/jpeg", "image/png"]

        if(coverFile) {
            if(!allowed_files.includes(coverFile.type)) {
                throw Error(`Only images can be uploaded for book covers not ${coverFile.type}`)
            }

            if( (coverFile.size/1024) > MAX_FILE_SIZE ) {
                throw Error(`File size too large. Please keep files below 1MB`)
            }
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
                notes: notesArray,
                cover_image_path: cover_image_path,
                author: bookAuthor
            }

            const formData = new FormData()
            formData.append("data", JSON.stringify(newBook))
            if(coverFile) {
                formData.append("file", coverFile)
            }

            const endpoint = is_update ? `/${initBook.book_title}` : ""
            const httpMethod = is_update ? 'PUT' : 'POST'

            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/library/${endpoint}`, {
                method: httpMethod,
                credentials: "include",
                body: formData
            })
            .then((res) => {
                return res.json()
            })
            .then((data: ResponseMessage) => {
                if(data.status === "success") {

                    createNotification(data.message!, "success")
                    
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

                    if(closeModal) {
                        closeModal()
                    }
                } else {
                    createNotification(`Processes Failed ${data.message}`, "failure")
                }
            })
            .catch((err) => console.error(err))
        } catch(err) {
            alert(err)
        }
    }

    return (
    <div className="border-t-2 border-black p-[10px]">
        <form onSubmit={(e) => submitNewBook(e)}>
            <div className="flex flex-row">
                <div>
                    <FormInputBlock>
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" id="bookTitle" className="border-2 border-black rounded-[10px] h-[20px] p-2" value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="bookAuthor">Book author</label>
                        <input type="text" id="bookAuthor" className="border-2 border-black rounded-[10px] h-[20px] p-2" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}/>
                    </FormInputBlock>

                    { readingStatus === "Completed" &&
                        <div className="mt-[10px] flex">
                            <FormInputBlock>
                                <label htmlFor="competedDate">Completed Date</label>
                                <input className="border border-black rounded-[10px] h-[20px]" type="date" id="competedDate" value={completedDate} defaultValue={completedDate} onChange={(e) => setCompletedDate(e.target.value)}/>
                            </FormInputBlock>
                                <button  type="button" className="h-[25px] ml-[10px] self-end bg-transparent border border-black rounded-[5px] transition-all duration-100 ease-in-out hover:bg-black hover:text-white" onClick={() => setCompletedDate("")}>clear</button>
                        </div>
                    }

                    <div className="mt-[10px]">
                        Reading status
                        <div>
                            <label>
                                <input className="text-red-500 border border-white" type="radio" name="read_status" checked={readingStatus === "Not Read"} onChange={() => setReadingStatus("Not Read")}/> Not Read
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
                <div className="flex flex-row ml-[10px]">
                    <FormInputBlock>
                        <label htmlFor="bookCover">Upload {is_update ? "a new" : "a" } cover image</label>
                        <input type="file" id="bookCover" onChange={(e) => setCoverFile(e.target!.files![0])}/>
                    </FormInputBlock>
                    { coverFile &&
                        <img className="w-[200px] h-[275px] border border-black" src={URL.createObjectURL(coverFile as Blob)} alt="Could not find file"/>
                    }
                </div>
            </div>
            
            <div className="pt-[20px]">
                <BookNotesList notes={notesArray} setNotes={setNotes}  />
            </div>

            <input 
                type="submit" 
                disabled={is_update && !canUpdate} 
                value={`${is_update ? "Update" : "Add"} book`} 
                className="h-[30px] bg-transparent border border-black rounded-[5px] transition-all duration-100 ease-in-out hover:bg-black hover:text-white font-bold p-2 leading-none -my-2.5 disabled:cursort-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:text-gray-500"/>
        </form> 
    </div>
    )
}