import { create } from "zustand"
import { TOAST_DURATION_MS } from "../config"

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
        set((s) => {
            const alreadyVisible = s.toasts.some((t) => t.message === message)
            if (alreadyVisible) return s
            return { toasts: [...s.toasts, { id, message, type }] }
        })
        setTimeout(() => {
            set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
        }, TOAST_DURATION_MS)
    },

    dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

    showConfirm: (options) => set({ confirm: options }),

    dismissConfirm: () => set({ confirm: null }),
}))