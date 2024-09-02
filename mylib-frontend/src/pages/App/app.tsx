import { useContext } from 'react';
import AppRouter from '../../components/AppRouter/approuter';
import { myContext } from '../Context/context';
import Notification from '../../components/Notification/notification';

export default function App() {
    const { notifications } = useContext(myContext)

    return (
        <>
            <div className="fixed left-1/2 transform -translate-x-1/2 top-[3%] max-h-[100px] min-w-[150px] overflow-hidden flex flex-col z-50">
                {
                notifications.map((notification, idx) => {
                    return (<Notification key={idx} notification={notification}/>)
                })
                }
            </div>
            <AppRouter/>
        </>
    )
}