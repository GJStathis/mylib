import React from "react"

type UserModel = {
    user_id?: number
    social_media_site: string,
    social_id: string
    social_token: string
    display_name?: string
    email?: string
}

export interface BookModel {
    book_id?: number, 
    user_id?: number,
    book_title: string,
    reading_status: string,
    added_date: Date,
    completed_date?: Date,
    notes: string[],
    cover_image_path?: string,
    author: string
}

export interface UserContext {
    user: UserModel,
    setUser: React.Dispatch<any>,
    notifications: any[],
    createNotification: any,
    deleteNotification: any
}

export interface LibraryDispatchContext {
    libraryDispatch: React.Dispatch<any>
}

export interface ResponseMessage {
    status: string,
    data?: Record<string, any>
    message?: string
}

export interface NotificationObject {
    message: string,
    type: string,
    id: number,
}