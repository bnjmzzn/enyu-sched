import { useValidation } from "../../lib/hooks/useValidation"

export default function ErrorList() {
    const { issues } = useValidation()

    if (issues.length === 0) return null

    const sorted = [...issues].sort((a, b) => a.message.localeCompare(b.message))

    return (
        <div className="border border-red-200 bg-red-50 rounded-lg px-3 py-2 flex flex-col gap-1">
            {sorted.map((issue) => (
                <span key={issue.id}>{issue.message}</span>
            ))}
        </div>
    )
}