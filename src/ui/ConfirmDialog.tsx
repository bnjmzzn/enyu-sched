import { createPortal } from "react-dom"
import { useUI } from "../lib/store/uiStore"
import Button from "./Button"

export default function ConfirmDialog() {
    const { confirm, dismissConfirm } = useUI()

    if (!confirm) return null

    function handleConfirm() {
        confirm!.onConfirm()
        dismissConfirm()
    }

    function handleCancel() {
        confirm!.onCancel?.()
        dismissConfirm()
    }

    return createPortal(
        <div
            onClick={handleCancel}
            style={{ animation: "backdrop-in 0.15s ease forwards" }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white border-3 border-border rounded-lg w-[400px] max-w-[calc(100vw-2rem)] p-6 flex flex-col gap-4 hover-lift"
                style={{ animation: "modal-in 0.2s ease forwards" }}
            >
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold">{confirm.title}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{confirm.message}</p>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="primary" onClick={handleCancel}>
                        {confirm.cancelLabel ?? "Cancel"}
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        {confirm.confirmLabel ?? "Confirm"}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}