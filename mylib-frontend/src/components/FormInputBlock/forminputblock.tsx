import { PropsWithChildren } from "react";
import styles from "./forminputblock.module.css"

export default function FormInputBlock({ children }: PropsWithChildren) {
    return (
        <div className={styles.formContainer}>
            {children}
        </div>
    )
}