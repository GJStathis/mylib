import styles from "./appbutton.module.css" 

export default function AppButton() {
    const buttonTypes: Record<string, Record<string, string>> = {
        "approve": styles.test
    }

    return(
        <button type="button" className={styles}>
            {
                mobile ? "+" : "Add a new book"
            }
        </button>
    )
}