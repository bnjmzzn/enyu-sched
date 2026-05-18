import { useUI, type Toast } from "../lib/store/uiStore"
import { Icon } from "@iconify/react"

function toastIcon(type: Toast["type"]) {
    if (type === "success") return "lucide:check"
    if (type === "error") return "lucide:x"
    return "lucide:info"
}

function toastColors(type: Toast["type"]) {
    if (type === "success") return "bg-[var(--color-brand)] text-white"
    if (type === "error") return "bg-red-600 text-white"
    return "bg-[#212529] text-white"
}

export default function Toaster() {
    const { toasts, dismissToast } = useUI()

    if (toasts.length === 0) return null

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center">
            {toasts.map((toast) => (
                <button
                    key={toast.id}
                    onClick={() => dismissToast(toast.id)}
                    style={{ animation: "toast-in 0.2s ease forwards", borderRadius: "var(--radius-md)" }}
                    className={`flex items-center gap-3 px-5 py-3 text-base font-medium shadow-lg cursor-pointer whitespace-nowrap border-3 border-border ${toastColors(toast.type)}`}
                >
                    <Icon icon={toastIcon(toast.type)} width={20} height={20} />
                    <span>{toast.message}</span>
                </button>
            ))}
        </div>
    )
}