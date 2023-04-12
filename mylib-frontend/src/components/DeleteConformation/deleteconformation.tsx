import styles from "./deleteconformation.module.css"

type DeleteConfirmationProps = {
    closeFn: any,
    deleteFn: any
}

export default function DeleteConfirmation({ closeFn, deleteFn }: DeleteConfirmationProps) {
    
    return (
        <div className={styles.deleteConfirmContainer}>
            <button onClick={() => deleteFn()} className={styles.modalButton}>Yes</button>
            <button onClick={() => closeFn()} className={styles.modalButton}>Cancel</button>
        </div>
    )
}