type UserModel = {
    user_id?: number,
    social_media_site: string,
    social_id: string,
    social_token: string,
    display_name?: string,
    email?: string
}

type BookModel = {
    book_id?: number, 
    user_id?: number,
    book_title: string,
    reading_status: string,
    added_date: Date,
    completed_date?: Date,
    notes: string[],
    cover_image_path?: string
    author: string
}

type FriendSearch = {
    user_id?: number,
    display_name?: string,
    are_friends?: boolean
}

type Alert = {
    alert_id?: number,
    user_id?: number,
    requesting_user_id?: number,
    message_str: string,
    read_alert: boolean
}



export { 
    UserModel, 
    BookModel,
    FriendSearch,
    Alert
}