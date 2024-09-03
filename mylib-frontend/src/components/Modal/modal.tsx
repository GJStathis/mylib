import React, { PropsWithChildren, useRef, useEffect } from "react";

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
        <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 right-0 bottom-0 z-[2]">
            <div ref={modalRef} className="min-w-[700px] max-w-[1000px] max-h-[500px] bg-white border-2 border-black shadow-[calc(-2rem_2rem_2rem_rgba(0,0,0,0.2))] visible rounded-[20px] p-[10px] overflow-auto mobile-sm:min-w-[320px] mobile-sm:max-w-[450px] mobile-sm:max-h-[800px]">
                <h2 className="m-0">{title}</h2>
                <div>
                    {children}
                </div>
                <button type="button" onClick={() => setShow(false)} className="h-[35px] w-[50px] bg-transparent border border-black rounded-[10px] transition-all duration-100 ease-in-out font-bold float-right hover:bg-black hover:text-white">close</button>
            </div>
        </div>
    )
}