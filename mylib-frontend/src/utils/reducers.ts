import { BookModel } from "../types/interfaces";

function bookReducer(books: BookModel[], action: Record<string, any>) {
    switch(action.type) {
        case "initialize": {
            return action.data
        }
        case "add": {
            return [
                ...books,
                action.data
            ]
        }
        case "update": {
            return books.map((b) => {
                if(b.book_id === action.data.book_id) {
                    return action.data
                }
                return b
            })
        }
        case "delete": {
            return books.filter((b) => b.book_id !== action.data.book_id)
        }
        default: {
            throw new Error(`Action ${action.type} is not defined`)
        }
    }
}


export {
    bookReducer
}