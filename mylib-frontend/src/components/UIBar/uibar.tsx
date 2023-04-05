import { useState, useEffect } from "react"
import { compareStringsInCharOrder, generateBlankBook, inGivenMonth } from "../../utils/utils"
import { BookModel } from "../../types/interfaces"
import { isMobile } from "../../utils/utils"
import BookForm from "../../components/BookForm/bookform"
import Modal from "../../components/Modal/modal"
import LogoutButton from "../LogoutButton/logoutbutton"
import styles from "./uibar.module.css"
import DesktopFilter from "../DesktopFilter/desktopfilter"
import MobileFilter from "../MobileFilter/mobilefilter"

type UIBarProps = {
    defaultBooks: BookModel[],
    setBookState: React.Dispatch<any>
}

export default function UIBar({defaultBooks, setBookState}: UIBarProps) {

    const [mobile] = useState(isMobile())
    const [addNewBook, setAddNewBook] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [readStatusFilter, setReadStatusFilter] = useState<string>("")
    const [dateCompletedFilter, setDateCompletedFilter] = useState<Date | null>(null)

    useEffect(() => {
        if(!searchQuery && !readStatusFilter && !dateCompletedFilter) {
            setBookState(defaultBooks)
        } else {
            const newBookState = defaultBooks.filter((obj) => {
                if(!compareStringsInCharOrder(searchQuery.toLowerCase(), obj.book_title.toLowerCase()) && !compareStringsInCharOrder(searchQuery.toLowerCase(), obj.author.toLowerCase())) {
                    return false
                }

                if(readStatusFilter && obj.reading_status !== readStatusFilter) {
                    return false
                }

                if(dateCompletedFilter && inGivenMonth(dateCompletedFilter, obj.completed_date)) {
                    return false
                }
                return true
            })
            setBookState(newBookState)
        }

    }, [searchQuery, readStatusFilter, dateCompletedFilter, defaultBooks, setBookState])

    function clearFilters() {
        setReadStatusFilter("")
        setDateCompletedFilter(null)
        setSearchQuery("")
    }

    return (
        <>
            <div className={styles.uibarcontainer}>
                <div className={styles.uibarLeftDiv}>
                    <button type="button" onClick={() => setAddNewBook(true)} className={styles.addButton}>
                        {
                            mobile ? "+" : "Add a new book"
                        }
                    </button>
                </div>

                <div className={styles.uibarCenterDiv}>
                    { mobile
                        ? <MobileFilter
                            readStatusFilter={readStatusFilter}
                            searchQuery={searchQuery}
                            dateCompletedFilter={dateCompletedFilter}
                            setSearchQuery={setSearchQuery}
                            setReadStatusFilter={setReadStatusFilter}
                            setDateCompletedFilter={setDateCompletedFilter}
                            clearFilters={clearFilters}
                          />
                        : <DesktopFilter
                            readStatusFilter={readStatusFilter}
                            searchQuery={searchQuery}
                            dateCompletedFilter={dateCompletedFilter}
                            setSearchQuery={setSearchQuery}
                            setReadStatusFilter={setReadStatusFilter}
                            setDateCompletedFilter={setDateCompletedFilter}
                            clearFilters={clearFilters}
                            />
                    }
                </div>

                <div className={styles.uibarRightDiv}>
                    <LogoutButton />
                </div>
            </div>


            <Modal title={"Add a new book"} show={addNewBook} setShow={setAddNewBook}>
                <BookForm 
                    initBook={generateBlankBook()}
                    is_update={false}
                />
            </Modal>
        </>
    )
} 