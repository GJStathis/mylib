import { useEffect, useReducer, useState } from "react"
import { BookModel, ResponseMessage } from "../../types/interfaces"
import { bookReducer } from "../../utils/reducers"
import { BooksDispatchContext } from "./context"
import BookCard from "../../components/BookCard/bookcard"
import UIBar from "../../components/UIBar/uibar"
import styles from "./library.module.css"

export default function Library() {

    const [books, dispatch] = useReducer(bookReducer, [])
    const [displayBooks, setDisplayBooks] = useState(books)

    useEffect(() => {
        setDisplayBooks(books)
    }, [books])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/library/all`, {
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data: ResponseMessage) => {
            dispatch({
                type: "initialize",
                data: data.data!["rows"]
            })
        })
        .catch((err) => console.error(err))
    },[])

    return (
        <BooksDispatchContext.Provider value={{libraryDispatch: dispatch}} >
            <UIBar defaultBooks={books} setBookState={setDisplayBooks} />
            <div className={styles.libraryContainer}>
                <div className={styles.booksContainer}>
                    {
                        displayBooks.map((val: BookModel, idx: number) => {
                            return <BookCard key={idx} book={val}/>
                        })
                    }
                </div>
            </div>
        </BooksDispatchContext.Provider>
    )
}