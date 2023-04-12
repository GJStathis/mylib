import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "../typings/general/types.js";
import { getUserBookImageURL } from "../db/library_queries.js"
import { BookModel } from "../typings/db/dbtypes.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws.js"


function getPublicImageUrl(image_file_path: string) {
    return `${process.env.APP_HOST}/${image_file_path.substring(image_file_path.indexOf('/') + 1)}`
} 

function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {
    if(!req.user) {
        res.status(401).json({message: "Client not authenticated"})
    } else {
        next();
    }
}

function generateSuccessResponse(message: string | undefined = undefined, data: any = null): ResponseMessage {
    return {
        status: "success",
        message: message,
        data: data
    }
}

function generateErrorResponse(message: string | undefined): ResponseMessage {
    return {
        status: "error",
        message: message
    }
}

function deleteImageInS3(book_title: string, user_id: number) {
    getUserBookImageURL(book_title, user_id)
    .then((book_cover_key: BookModel | void) => {
        if(book_cover_key && book_cover_key.cover_image_path) { 
            const parsed_url = new URL(book_cover_key.cover_image_path)
            const delete_input = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: parsed_url.pathname.slice(1)
            }

            const command = new DeleteObjectCommand(delete_input)
            s3.send(command)
        }
    })
    .catch((err) => console.error(err))

}

export {
    getPublicImageUrl,
    checkIfAuthenticated,
    generateSuccessResponse,
    generateErrorResponse,
    deleteImageInS3
}
