import { useStore } from "./store"

export function useStatsBar() {
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

    return { maxUnits, setMaxUnits, totalUnits, isOverLimit, f2fDays, onlineDays }
}