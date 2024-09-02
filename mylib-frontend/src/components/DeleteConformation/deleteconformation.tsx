// import styles from "./deleteconformation.module.css"

type DeleteConfirmationProps = {
    closeFn: any,
    deleteFn: any
}

export default function DeleteConfirmation({ closeFn, deleteFn }: DeleteConfirmationProps) {
    
    return (
        <div className="pt-[20px] pb-[20px]">
            <button onClick={() => deleteFn()} className="h-[35px] w-[60px] bg-transparent border border-black rounded-[10px] transition-all duration-100 ease-in-out font-bold ml-[10px] hover:bg-black hover:text-white">Yes</button>
            <button onClick={() => closeFn()} className="h-[35px] w-[60px] bg-transparent border border-black rounded-[10px] transition-all duration-100 ease-in-out font-bold ml-[10px] hover:bg-black hover:text-white">Cancel</button>
        </div>
    )
}