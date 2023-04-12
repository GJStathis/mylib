import { useContext } from 'react';
import AppRouter from '../../components/AppRouter/approuter';
import { myContext } from '../Context/context';
import Notification from '../../components/Notification/notification';
import styles from './app.module.css'

export default function App() {
    const { notifications } = useContext(myContext)

    return (
        <>
            <div className={styles.notificationContainer}>
                {
                notifications.map((notification, idx) => {
                    return (<Notification key={idx} notifyObject={notification}/>)
                })
                }
            </div>
            <AppRouter/>
        </>
    )
}