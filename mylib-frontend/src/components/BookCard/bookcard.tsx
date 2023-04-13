import { useContext, useState } from "react"
import { BookModel, ResponseMessage } from "../../types/interfaces"
import { FaEdit, FaTimes } from "react-icons/fa"
import { BooksDispatchContext } from "../../pages/Library/context"
import { isMobile } from "../../utils/utils"
import Modal from "../Modal/modal"
import DeleteConfirmation from "../DeleteConformation/deleteconformation"
import BookForm from "../BookForm/bookform"
import BookInfo from "../BookInfo/bookinfo"
import styles from "./bookcard.module.css"
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
    const [showDelete, setShowDelete] = useState<string>(styles.hideBookDelete)

    function onCardMouseEnter() {
        setShowDelete(styles.showBookDelete)
    }

    function onCardMouseLeave() {
        setShowDelete(styles.hideBookDelete)
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
            <div className={styles.bookCard} onMouseEnter={e => onCardMouseEnter()} onMouseLeave={e => onCardMouseLeave()}>
                <div onClick={() => setInfoModal(true)} className={styles.bookCover}>
                    { book.cover_image_path 
                        ? 
                        <img src={book.cover_image_path} className={styles.bookCoverImage} alt={book.book_title}/>
                        :
                        <h3>{book.book_title}</h3>
                    } 
                </div>
                <div className={styles.bookReadingStatus}>
                    <div className={styles.statusText}>Status: {book.reading_status}</div>
                    <div className={styles.bookReadingStatusEditIcon} onClick={() => setUpdateModal(true)}>
                        <FaEdit size={18} />
                    </div>
                </div>
                <div className={ mobile ? styles.showBookDelete : showDelete} onClick={() => setDeleteModal(true)}>
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