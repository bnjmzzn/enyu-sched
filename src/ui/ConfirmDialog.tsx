import { createPortal } from "react-dom"
import { useUI } from "../lib/store/uiStore"

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
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    animation: "modal-in 0.2s ease forwards",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-card)",
                }}
                className="bg-white w-[400px] max-w-[calc(100vw-2rem)] p-6 flex flex-col gap-4 hover-lift"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[var(--color-body)]">{confirm.title}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{confirm.message}</p>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                    <button
                        onClick={handleCancel}
                        style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}
                        className="text-xs px-3 py-1.5 text-[var(--color-muted)] hover:bg-[var(--color-page-bg)] transition-colors"
                    >
                        {confirm.cancelLabel ?? "Cancel"}
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{ borderRadius: "var(--radius-md)" }}
                        className="text-xs px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        {confirm.confirmLabel ?? "Confirm"}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}