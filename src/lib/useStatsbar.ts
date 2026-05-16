import { useStore } from "./store"

export function useStatsBar() {
    const { maxUnits, setMaxUnits, sections } = useStore()

    const enabledCourses = sections
        .flatMap((s) => s.courses)
        .filter((s) => s.enabled)

    const totalUnits = enabledCourses.reduce((sum, s) => sum + s.unit, 0)
    const isOverLimit = totalUnits > maxUnits

    const f2fDays = [...new Set(
        enabledCourses
            .flatMap((s) => s.schedules)
            .filter((s) => !s.room.toUpperCase().startsWith("VR"))
            .map((s) => s.day)
    )]

    const onlineDays = [...new Set(
        enabledCourses
            .flatMap((s) => s.schedules)
            .filter((s) => s.room.toUpperCase().startsWith("VR"))
            .map((s) => s.day)
    )]

    return { maxUnits, setMaxUnits, totalUnits, isOverLimit, f2fDays, onlineDays }
}