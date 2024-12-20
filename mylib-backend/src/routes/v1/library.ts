import express from "express";
import { checkIfAuthenticated, deleteImageInS3, generateSuccessResponse, generateErrorResponse } from "../../utils/utils.js";
import { getAllUserBooks, deleteUsersBook, saveBook, updateUserBook } from "../../controllers/db/library_queries.js"
import { BookModel } from "../../typings/db/index.js";
import { s3_upload } from "../../libs/file_uploads.js"
import { PGUnqiueConstraintError } from "../../models/db.js";

const router = express.Router()

router.get("/", checkIfAuthenticated, (req, res) => {
    getAllUserBooks(req.user!.user_id!)
    .then((rows: BookModel[] | void) => {
        const resPayload = generateSuccessResponse(undefined, {"rows": rows})
        res.json(resPayload)
    })
    .catch((err) => console.error(err))
})

router.delete("/:bookTitle", checkIfAuthenticated, (req, res) => {
    deleteImageInS3(req.params.bookTitle, req.user!.user_id!)

    deleteUsersBook(req.user!.user_id!, req.params.bookTitle)
    .then((success: boolean) => {
        const resPayload = generateSuccessResponse()
        res.json(resPayload)
    })
    .catch((err) => console.error(err))
})

router.put("/:bookTitle", checkIfAuthenticated, s3_upload, (req, res) => {
    const book: BookModel = JSON.parse(req.body.data)
    
    if(req.file) {
        deleteImageInS3(req.params.bookTitle, req.user!.user_id!)
        const s3_file = req.file as any
        book.cover_image_path = `${process.env.CLOUD_FRONT_URL}/${process.env.NODE_ENV}/${s3_file.key}`
    }

    console.log("Updating book...")
    updateUserBook(req.user!.user_id!, req.params.bookTitle, book)
    .then(() => {
        const resPayload = generateSuccessResponse("Book updated", {"imageURL": book.cover_image_path})
        res.json(resPayload)
    })
    .catch((err) => {
        console.error(err)
        const resPayload = generateErrorResponse("Server error")
        res.json(resPayload)
    })
})

router.post("/", checkIfAuthenticated, s3_upload, (req, res) => {
    
    const book: BookModel = JSON.parse(req.body.data)
    const s3_file = req.file as any
    book.cover_image_path = s3_file ? `${process.env.CLOUD_FRONT_URL}/${process.env.NODE_ENV}/${s3_file.key}` : undefined

    saveBook(req.user!.user_id!, book)
    .then((rows: any) => {
        const book_id = rows.rows[0].book_id
        const resPayload = generateSuccessResponse("Book saved", {"imageURL": book.cover_image_path, "book_id": book_id})
        res.json(resPayload)
    })
    .catch((err) => {
        console.error(err)

        const resPayload = generateErrorResponse("Server error")

        if(err.code === PGUnqiueConstraintError) {
            resPayload.message = "Cannot insert same book twice"
        }

        res.json(resPayload)
    })   
})

export default router