import styles from "./appbutton.module.css"
import { isMobile } from "../../utils/utils"

export default function AppButton() {
    const buttonTypes: Record<string, string> = {
        "approve": styles.test
    }

    const mobile = isMobile()

    return(
        <button type="button" className={styles.addButton}>
            {
                mobile ? "+" : "Add a new book"
            }
        </button>
    )
}