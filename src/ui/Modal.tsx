import { createPortal } from "react-dom"

type Props = {
    onClose: () => void
    title?: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export default function Modal({ onClose, title, children, footer }: Props) {
    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose()
    }

    return createPortal(
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white border-border border-3 rounded-lg w-[520px] max-h-[80vh] flex flex-col">
                {title && (
                    <div className="px-6 pt-6 pb-2 shrink-0">
                        <h2 className="text-xl font-bold">{title}</h2>
                    </div>
                )}
                <div className="px-6 py-4 overflow-y-auto flex-1">
                    {children}
                </div>
                {footer && (
                    <div className="px-6 pt-2 pb-6 shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}