import { BookModel } from "../../types/interfaces"
import { getDateString } from "../../utils/utils"
// import styles from "./bookinfo.module.css"

type BookInfoProps = {
    book: BookModel
}

export default function BookInfo({ book }: BookInfoProps) {
    return (
        <div>
            <span>By: {book.author}</span>
            <hr />
            <div>
            <span>Status: {book.reading_status}</span>
            { book.completed_date &&
                <div className="pt-[10px]">
                    Completed on: {getDateString(book.completed_date)}
                </div>
            }
            </div>
            <div>
                <h4>Notes on {book.book_title}</h4>
                { book.notes.length > 0 ? 
                    <ul className="list-none">
                        {
                            book.notes.map((note, idx) => {
                                return <li key={idx} className="font-typeMachine before:content-['-'] before:mr-2">{note}</li>
                            })
                        }
                    </ul>
                    : <p>No notes on this title yet</p>
                }
            </div>
        </div>
    )
}