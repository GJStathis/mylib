import { isMobile } from "../../utils/utils"

export default function AppButton() {
    const mobile = isMobile()

    return(
        <button type="button">
            {
                mobile ? "+" : "Add a new book"
            }
        </button>
    )
}