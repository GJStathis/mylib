import { useState, useEffect, useContext } from "react"
import { compareStringsInCharOrder, generateBlankBook, inGivenMonth } from "../../utils/utils"
import { BookModel } from "../../types/interfaces"
import { isMobile } from "../../utils/utils"
import BookForm from "../../components/BookForm/bookform"
import Modal from "../../components/Modal/modal"
import DesktopFilter from "../DesktopFilter/desktopfilter"
import MobileFilter from "../MobileFilter/mobilefilter"
import SlideoutMenu from "../SlideoutMenu/slideoutmenu"
import { myContext } from "../../app/pages/Context/context"

type UIBarProps = {
    defaultBooks: BookModel[],
    setBookState: React.Dispatch<any>
}

export default function UIBar({defaultBooks, setBookState}: UIBarProps) {

    const { user } = useContext(myContext)
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
            <div className="w-full fixed flex h-16 items-center justify-between top-0 z-20 bg-[#FAF9F6] border-b-2 border-black">
                <div className="flex w-1/10 p-2.5">
                    <button type="button" onClick={() => setAddNewBook(true)} className="w-36 h-11 rounded-3xl bg-transparent border border-[#3f5a36] text-black font-bold cursor-pointer transition-all duration-100 ease-in-out hover:bg-[#3f5a36] hover:text-white">
                        {
                            mobile ? "+" : "Add a new book"
                        }
                    </button>
                </div>

                <div className="flex w-9/10 justify-center items-center">
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

                <div className="flex w-1/10 p-2.5 justify-end">
                    <SlideoutMenu user={user} />
                </div>
            </div>


            <Modal title={"Add a new book"} show={addNewBook} setShow={setAddNewBook}>
                <BookForm 
                    initBook={generateBlankBook()}
                    is_update={false}
                    closeModal={() => setAddNewBook(false)}
                />
            </Modal>
        </>
    )
} 