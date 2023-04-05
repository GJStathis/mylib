import React, { PropsWithChildren, useRef, useEffect } from "react";
import styles from "./modal.module.css"

type ModalProps = PropsWithChildren & {
    title: string,
    show: boolean,
    setShow: React.Dispatch<boolean>
}

export default function Modal({children, title, show, setShow}: ModalProps) {
    const modalRef = useRef<any>(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShow(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [modalRef, setShow])

    if(!show) {
        return null
    }

    return (
        <div className={styles.modalContainer}>
            <div ref={modalRef} className={styles.modal}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <div>
                    {children}
                </div>
                <button type="button" onClick={() => setShow(false)} className={styles.closeButton}>close</button>
            </div>
        </div>
    )
}