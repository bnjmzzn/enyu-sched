import { useConflicts } from "../../lib/useConflicts"

export default function ConflictList() {
    const { conflicts } = useConflicts()

    if (conflicts.length === 0) return null

    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 rounded-lg">
            <span className="text-xs font-semibold text-red-500 shrink-0">conflicts:</span>
            {conflicts.map((c, i) => (
                <span key={i} className="text-xs text-red-400">{c.reason}</span>
            ))}
        </div>
    )
}