import { useContext, useState } from "react"
import { BookModel, ResponseMessage } from "../../types/interfaces"
import { FaEdit, FaTimes } from "react-icons/fa"
import { BooksDispatchContext } from "../../pages/Library/context"
import { isMobile } from "../../utils/utils"
import Modal from "../Modal/modal"
import DeleteConfirmation from "../DeleteConformation/deleteconformation"
import BookForm from "../BookForm/bookform"
import BookInfo from "../BookInfo/bookinfo"
import { myContext } from "../../pages/Context/context"


type BookCardProps = {
    book: BookModel
}

export default function BookCard({ book }: BookCardProps) {
    const mobile = isMobile()

    const { createNotification } = useContext(myContext)
    const { libraryDispatch } = useContext(BooksDispatchContext)

    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [infoModal, setInfoModal] = useState<boolean>(false)
    const [showDelete, setShowDelete] = useState<string>("hidden")

    const showBookDelete = "absolute -left-[0.6rem] -top-[0.6rem] inline hover:cursor-pointer"

    function onCardMouseEnter() {
        setShowDelete("absolute -left-[0.6rem] -top-[0.6rem] inline hover:cursor-pointer")
    }

    function onCardMouseLeave() {
        setShowDelete("hidden")
    }

    function deleteBook() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/library/delete/${book.book_title}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data: ResponseMessage) => {
            if(data.status === "success") {
                createNotification("Book deleted", "success")
                libraryDispatch({
                    type: "delete",
                    data: book
                })
                setDeleteModal(false)
            }
        })
        .catch((err) => {
            createNotification("Failed to delete book", "failure")
            console.error(err)
        })
    }

    return (
        <>
            <div className="m-[19px] p-[5px] border-2 border-black bg-[#FAF9F6] h-[300px] w-[200px] relative transition-[filter] duration-200 ease-in-out will-change-[filter] hover:drop-shadow-[5px_5px_5px_black] sm:m-[28px]" onMouseEnter={e => onCardMouseEnter()} onMouseLeave={e => onCardMouseLeave()}>
                <div onClick={() => setInfoModal(true)} className="h-[270px] flex items-center justify-center bg-center hover:cursor-pointer">
                    { book.cover_image_path 
                        ? 
                        <img src={book.cover_image_path} className="h-[270px] w-[200px] border border-black" alt={book.book_title}/>
                        :
                        <h3>{book.book_title}</h3>
                    } 
                </div>
                <div className="flex flex-row">
                    <div className="font-typeMachine">Status: {book.reading_status}</div>
                    <div className="ml-auto hover:cursor-pointer" onClick={() => setUpdateModal(true)}>
                        <FaEdit size={18} />
                    </div>
                </div>
                <div className={ mobile ? showBookDelete : showDelete} onClick={() => setDeleteModal(true)}>
                    <FaTimes size={24} />
                </div>
            </div>


            <Modal title={"Delete this book?"} show={deleteModal} setShow={setDeleteModal}>
                <DeleteConfirmation closeFn={() => setDeleteModal(false)} deleteFn={() => deleteBook()} />
            </Modal>

            <Modal title={book.book_title} show={infoModal} setShow={setInfoModal}>
                <BookInfo book={book}/>
            </Modal>

            <Modal title={"Update this book"} show={updateModal} setShow={setUpdateModal}>
                <BookForm 
                    initBook={book}
                    is_update={true}
                />
            </Modal>
        </>
    )
}