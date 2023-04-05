import { BookModel } from "../types/interfaces";

function generateBlankBook() : BookModel {
    return {
        book_title: "",
        reading_status: "Not Read",
        added_date: new Date(),
        completed_date: undefined, 
        notes: [],
        cover_image_path: "",
        author: ""
    }
}

function getDateString(date: Date | undefined): string {
    if(date) {
        const bookCompletedDate = new Date(date)
        return bookCompletedDate.toISOString().split('T')[0]
    }
    return ""
}

function inGivenMonth(selectedMonth: Date, date: Date | undefined) {
    if(!date) {
        return true
    }
    const parsedDate: Date = new Date(date)

    if(selectedMonth.getMonth() === parsedDate.getMonth() && selectedMonth.getFullYear() === parsedDate.getFullYear()) {
        return false
    }

    return true
}

function compareStringsInCharOrder(str: string, compareStr: string): boolean {
    const subStr = compareStr.substring(0, str.length)

    return str === subStr
}

function isMobile(): boolean {
    try {
        document.createEvent("TouchEvent");
        return true
     }
     catch (e) {
        return false
     }
}

export {
    generateBlankBook,
    getDateString,
    inGivenMonth,
    compareStringsInCharOrder,
    isMobile
}