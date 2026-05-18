import { useStore } from "../../lib/store/appStore"
import { ONLINE_ROOM_PREFIX } from "../../lib/config"
import { Icon } from "@iconify/react"

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

    const unitsColor = isOverLimit ? "text-red-500" : ""

    return (
        <div
            className="flex flex-wrap items-center gap-6 px-4 py-3 border-3 border-border rounded-lg bg-white hover-lift shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
            style={{ animation: "panel-in 0.2s ease forwards" }}
        >
            <div className="flex items-center gap-2">
                <Icon icon="lucide:book-open" width={20} height={20} className="text-[var(--color-muted)]" />
                <span className="text-sm text-[var(--color-muted)]">Units</span>
                <span className={`font-semibold ${unitsColor}`}>{totalUnits.toFixed(1)}</span>
                <span className="text-[var(--color-muted)]">/</span>
                <input
                    type="number"
                    value={maxUnits}
                    onChange={(e) => setMaxUnits(Number(e.target.value))}
                    className="w-10 text-center border-b border-border focus:outline-none font-semibold"
                />
                {isOverLimit && (
                    <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                        <Icon icon="lucide:circle-alert" width={20} height={20} />
                        Over limit
                    </span>
                )}
            </div>

            <div className="w-px h-5 bg-border" />

            <div className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" width={20} height={20} className="text-[var(--color-muted)]" />
                <span className="text-sm text-[var(--color-muted)]">F2F</span>
                <span className="font-semibold">{f2fDays.length > 0 ? f2fDays.join(", ") : "-"}</span>
            </div>

            <div className="w-px h-5 bg-border" />

            <div className="flex items-center gap-2">
                <Icon icon="lucide:wifi" width={20} height={20} className="text-[var(--color-muted)]" />
                <span className="text-sm text-[var(--color-muted)]">Online</span>
                <span className="font-semibold">{onlineDays.length > 0 ? onlineDays.join(", ") : "-"}</span>
            </div>
        </div>
    )
}