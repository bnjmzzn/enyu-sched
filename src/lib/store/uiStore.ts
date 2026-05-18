import { create } from "zustand"

export type Toast = {
    id: string
    message: string
    type: "success" | "error" | "info"
}

export type ConfirmOptions = {
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel?: () => void
}

type UIStore = {
    toasts: Toast[]
    confirm: ConfirmOptions | null
    showToast: (message: string, type?: Toast["type"]) => void
    dismissToast: (id: string) => void
    showConfirm: (options: ConfirmOptions) => void
    dismissConfirm: () => void
}

export const useUI = create<UIStore>((set) => ({
    toasts: [],
    confirm: null,

    showToast: (message, type = "info") => {
        const id = crypto.randomUUID()
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
        setTimeout(() => {
            set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
        }, 3000)
    },

    dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

    showConfirm: (options) => set({ confirm: options }),

    dismissConfirm: () => set({ confirm: null }),
}))