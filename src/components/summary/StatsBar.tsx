import { useStore } from "../../lib/store"

export default function StatsBar() {
    const { maxUnits, setMaxUnits, sections } = useStore()

    const enabledSubjects = sections
        .flatMap((s) => s.subjects)
        .filter((s) => s.enabled)

    const totalUnits = enabledSubjects.reduce((sum, s) => sum + s.unit, 0)
    const isOverLimit = totalUnits > maxUnits

    const f2fDays = [...new Set(
        enabledSubjects
            .flatMap((s) => s.schedules)
            .filter((s) => !s.room.toUpperCase().startsWith("VR"))
            .map((s) => s.day)
    )]

    const onlineDays = [...new Set(
        enabledSubjects
            .flatMap((s) => s.schedules)
            .filter((s) => s.room.toUpperCase().startsWith("VR"))
            .map((s) => s.day)
    )]

    return (
        <div className="flex flex-wrap items-center gap-6 px-4 py-2 border border-gray-200 rounded-lg text-sm">
            <div className="flex items-center gap-1">
                <span className="text-gray-400">units:</span>
                <span className={isOverLimit ? "text-red-500 font-semibold" : ""}>{totalUnits.toFixed(1)}</span>
                <span className="text-gray-300">/</span>
                <input
                    type="number"
                    value={maxUnits}
                    onChange={(e) => setMaxUnits(Number(e.target.value))}
                    className="w-10 text-center border-b border-gray-300 focus:outline-none text-gray-600"
                />
                {isOverLimit && <span className="text-red-400 text-xs ml-1">over limit</span>}
            </div>

            <div className="flex items-center gap-1">
                <span className="text-gray-400">f2f:</span>
                <span>{f2fDays.length > 0 ? f2fDays.join(", ") : "none"}</span>
            </div>

            <div className="flex items-center gap-1">
                <span className="text-gray-400">online:</span>
                <span>{onlineDays.length > 0 ? onlineDays.join(", ") : "none"}</span>
            </div>
        </div>
    )
}