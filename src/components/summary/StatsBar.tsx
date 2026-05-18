import { useStore } from "../../lib/store/appStore"
import { ONLINE_ROOM_PREFIX } from "../../lib/config"

export default function StatsBar() {
    const { maxUnits, setMaxUnits, sections } = useStore()

    const enabledCourses = sections
        .flatMap((s) => s.courses)
        .filter((c) => c.enabled)

    const totalUnits = enabledCourses.reduce((sum, c) => sum + c.unit, 0)
    const isOverLimit = totalUnits > maxUnits

    const f2fDays = [...new Set(
        enabledCourses
            .flatMap((c) => c.schedules)
            .filter((s) => !s.room.toUpperCase().startsWith(ONLINE_ROOM_PREFIX))
            .map((s) => s.day)
    )]

    const onlineDays = [...new Set(
        enabledCourses
            .flatMap((c) => c.schedules)
            .filter((s) => s.room.toUpperCase().startsWith(ONLINE_ROOM_PREFIX))
            .map((s) => s.day)
    )]

    return (
        <div className="flex flex-wrap items-center gap-6 px-4 py-2 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-1">
                <span>Units:</span>
                <span>{totalUnits.toFixed(1)}</span>
                <span>/</span>
                <input
                    type="number"
                    value={maxUnits}
                    onChange={(e) => setMaxUnits(Number(e.target.value))}
                    className="w-10 text-center border-b border-gray-300 focus:outline-none"
                />
                {isOverLimit && <span>Over limit</span>}
            </div>

            <div className="flex items-center gap-1">
                <span>F2F:</span>
                <span>{f2fDays.length > 0 ? f2fDays.join(", ") : "none"}</span>
            </div>

            <div className="flex items-center gap-1">
                <span>Online:</span>
                <span>{onlineDays.length > 0 ? onlineDays.join(", ") : "none"}</span>
            </div>
        </div>
    )
}