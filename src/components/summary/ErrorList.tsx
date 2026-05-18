import { useValidation } from "../../lib/hooks/useValidation"
import { Icon } from "@iconify/react"

export default function ErrorList() {
    const { issues } = useValidation()

    if (issues.length === 0) return null

    const sorted = [...issues].sort((a, b) => a.message.localeCompare(b.message))

    return (
        <div
            className="border-3 border-red-300 bg-red-50 rounded-lg flex flex-col hover-lift shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
            style={{ animation: "panel-in 0.2s ease forwards" }}
        >
            <div className="flex items-center gap-2 px-3 py-2">
                <Icon icon="lucide:triangle-alert" width={16} height={16} className="text-red-500 shrink-0" />
                <span className="font-semibold text-red-700">Conflicts & Warnings</span>
            </div>
            <div className="flex flex-col gap-1 px-3 py-2">
                {sorted.map((issue) => (
                    <span key={issue.id} className="font-mono text-red-600">{issue.message}</span>
                ))}
            </div>
        </div>
    )
}