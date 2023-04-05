import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "../typings/general/types.js";

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

export {
    getPublicImageUrl,
    checkIfAuthenticated,
    generateSuccessResponse,
    generateErrorResponse
}
