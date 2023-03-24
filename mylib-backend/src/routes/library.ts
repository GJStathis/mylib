import express, { Router } from "express";
import { checkIfAuthenticated } from "./auth.js";
import { getAllUserBooks, deleteUsersBook, saveBook, updateUserBook } from "../db/library_queries.js"
import { BookModel } from "../typings/db/dbtypes.js";
const router = express.Router()

router.get("/all", checkIfAuthenticated, (req, res) => {
    getAllUserBooks(req.user!.user_id!)
    .then((rows: BookModel[] | void) => {
        res.send(rows)
    })
    .catch((err) => console.error(err))
})

router.delete("/delete/:bookID", checkIfAuthenticated, (req, res) => {
    deleteUsersBook(req.user!.user_id!, req.params.bookID)
    .then((success: boolean) => {
        res.json({operationStatus: success})
    })
    .catch((err) => console.error(err))
})

router.post("/update/:bookID", checkIfAuthenticated, (req, res) => {
    const book: BookModel = req.body
    updateUserBook(req.user!.user_id!, req.params.bookID, book)
    .then((updatedBook: BookModel | void) => {
        if(updatedBook) {
            res.json(updatedBook)
        }
        res.status(500).json({message: "Failed to update book"})
    })
    .catch((err) => console.error(err))
})

router.post("/save", checkIfAuthenticated, (req, res) => {
    const book: BookModel = req.body
    saveBook(req.user!.user_id!, book)
    .then((success: boolean) => {
        res.json({operationStatus: success})
    })
    .catch((err) => console.error(err))
})

export default router