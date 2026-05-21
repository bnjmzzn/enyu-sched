import { useStore } from "../store/appStore"
import { ONLINE_ROOM_PREFIX } from "../config"

export function useStatsBar() {
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

    return { maxUnits, setMaxUnits, totalUnits, isOverLimit, f2fDays, onlineDays }
}