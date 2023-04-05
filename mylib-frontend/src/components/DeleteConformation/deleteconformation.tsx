type DeleteConfirmationProps = {
    closeFn: any,
    deleteFn: any
}

export default function DeleteConfirmation({ closeFn, deleteFn }: DeleteConfirmationProps) {
    
    return (
        <div>
            <button onClick={() => deleteFn()}>Yes</button>
            <button onClick={() => closeFn()}>Cancel</button>
        </div>
    )
}