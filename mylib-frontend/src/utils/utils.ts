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

function convertToTitleCase(str: string | undefined): string {
    if(!str) {
        return ""
    }

    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function hashStringArray(strings: string[]): Promise<string> {
    const encoder = new TextEncoder();
    const data = strings.join(''); 
    const encodedData = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashValue =  hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashValue
} 

export {
    generateBlankBook,
    getDateString,
    inGivenMonth,
    compareStringsInCharOrder,
    isMobile,
    convertToTitleCase,
    hashStringArray
}