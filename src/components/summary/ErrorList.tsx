import { useValidation } from "../../lib/useValidation"

export default function ErrorList() {
    const { issues } = useValidation()

    if (issues.length === 0) return null

    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 rounded-lg">
            <span className="text-xs font-semibold text-red-500 shrink-0">issues:</span>
            {issues.map((issue) => (
                <span key={issue.id} className="text-xs text-red-400">{issue.message}</span>
            ))}
        </div>
    )
}