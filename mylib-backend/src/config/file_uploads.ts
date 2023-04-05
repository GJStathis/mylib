import multer from "multer"

const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({storage: image_storage}).single("file")

export {
    upload
}