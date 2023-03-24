import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { BookModel } from "../typings/db/dbtypes.js"

function getAllUserBooks(user_id: number): Promise<BookModel[] | void> {
    return connection.query("SELECT * FROM library WHERE user_id=$1", [user_id])
    .then((res: QueryResult<BookModel>) => {
        return res.rows
    })
    .catch((err) => console.error(err))
}

function deleteUsersBook(user_id: number, book_id: string): Promise<boolean> {
    return connection.query("DELETE FROM library WHERE user_id=$1 and book_id=$2", [user_id, book_id])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.error(err)
        return false
    })
}

function saveBook(user_id: number, book: BookModel): Promise<boolean> {
    return connection.query("INSERT INTO library (user_id, book_title, status, added_date, completed_date, notes)"
    + " VALUES ($1, $2, $3, $4, $5, $6)", 
    [user_id, book.book_title, book.reading_status, book.added_date, book.completed_date, convertStringArrayIntoPGArray(book.notes)])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.error(err)
        return false
    })
}

function updateUserBook(user_id: number, book_id: string, book: BookModel): Promise<BookModel | void> {
    return connection.query("UPDATE library SET book_title=$1, status=$2, completed_date=$3 notes=$4"
    + " WHERE user_id=$5 AND book_id=$6"
    + " RETURNING book_id, user_id, book_title, status, added_date, completed_date, notes", 
    [book.book_title, book.reading_status, book.completed_date, convertStringArrayIntoPGArray(book.notes), user_id, book_id])
    .then((res: QueryResult<BookModel>) => {
        if(res.rows) {
            return res.rows[0]
        }
    })
    .catch((err) => console.error(err))
} 

function convertStringArrayIntoPGArray(array: string[]): string {
    let pgArr = "'{"
    array.forEach((str: string, idx: number) => {
        if(idx < array.length - 1) {
            pgArr += `"${str},"`
        }
        pgArr += `"${str}"}'`
    })

    return pgArr
}

export {
    getAllUserBooks,
    deleteUsersBook,
    saveBook,
    updateUserBook
}