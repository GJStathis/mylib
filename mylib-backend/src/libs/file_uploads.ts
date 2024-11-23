import multer from "multer"
import multerS3 from "multer-s3"
import crypto from "crypto"
import { s3 } from "./aws.js"

const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/")
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomUUID() + '-' + Date.now() + '-' + file.originalname )
    }
})

const s3_storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME!,
    key: function (req, file, cb) {
        cb(null, crypto.randomUUID() + '-' + Date.now() + '-' + file.originalname)
    }
})

const file_upload = multer({storage: image_storage}).single("file")

const s3_upload = multer({
    storage: s3_storage,
    limits: {
        fileSize: 1024 * 1024 // 1mb file size limit
    }
}).single("file")

export {
    file_upload,
    s3_upload
}