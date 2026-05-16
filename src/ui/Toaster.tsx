import { useUI, type Toast } from "../lib/ui"

function toastColors(type: Toast["type"]) {
    if (type === "success") return "bg-brand text-white"
    if (type === "error") return "bg-red-600 text-white"
    return "bg-[#212529] text-white"
}

function toastIcon(type: Toast["type"]) {
    if (type === "success") return "✓"
    if (type === "error") return "✕"
    return "i"
}

export default function Toaster() {
    const { toasts, dismissToast } = useUI()

    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
            {toasts.map((toast) => (
                <button
                    key={toast.id}
                    onClick={() => dismissToast(toast.id)}
                    style={{ animation: "toast-in 0.2s ease forwards", borderRadius: "var(--radius-md)" }}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium shadow-lg cursor-pointer ${toastColors(toast.type)}`}
                >
                    <span className="text-xs font-bold">{toastIcon(toast.type)}</span>
                    <span>{toast.message}</span>
                </button>
            ))}
        </div>
    )
}