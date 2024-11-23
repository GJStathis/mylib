import { QueryResult } from "pg"
import { connection } from "./connection.js"
import { BookModel } from "../../typings/db/index.js"

function getUserBookImageURL(book_title: string, user_id: number): Promise<BookModel | void> {
    return connection.query("SELECT cover_image_path FROM library WHERE user_id=$1 AND book_title=$2", [user_id, book_title])
    .then((res: QueryResult<BookModel>) => {
        return res.rows[0]
    })
}

function getAllUserBooks(user_id: number): Promise<BookModel[] | void> {
    return connection.query("SELECT * FROM library WHERE user_id=$1", [user_id])
    .then((res: QueryResult<BookModel>) => {
        return res.rows
    })
}

function deleteUsersBook(user_id: number, book_title: string): Promise<any> {
    return connection.query("DELETE FROM library WHERE user_id=$1 and book_title=$2", [user_id, book_title])
}

function saveBook(user_id: number, book: BookModel): Promise<any> {
    return connection.query("INSERT INTO library (user_id, book_title, reading_status, added_date, completed_date, notes, cover_image_path, author)"
    + " VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    + " RETURNING book_id", 
    [user_id, book.book_title, book.reading_status, book.added_date, book.completed_date, book.notes, book.cover_image_path, book.author])
}

function updateUserBook(user_id: number, book_title: string, book: BookModel): Promise<any> {
    return connection.query("UPDATE library SET book_title=$1, reading_status=$2, completed_date=$3, notes=$4, cover_image_path=$5, author=$6"
    + " WHERE user_id=$7 AND book_title=$8", 
    [book.book_title, book.reading_status, book.completed_date, book.notes, book.cover_image_path, book.author, user_id, book_title])
} 

export {
    getAllUserBooks,
    deleteUsersBook,
    saveBook,
    updateUserBook,
    getUserBookImageURL
}