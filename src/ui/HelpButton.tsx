import { useState } from "react"
import Modal from "./Modal"

type Props = {
    children: React.ReactNode
    title?: string
}

export default function HelpButton({ children, title = "help" }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs text-gray-400 hover:text-gray-600 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"
            >
                ?
            </button>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)} title={title}>
                    {children}
                </Modal>
            )}
        </>
    )
}