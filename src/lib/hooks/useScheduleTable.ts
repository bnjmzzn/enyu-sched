import { useStore } from "../../lib/store/appStore"
import { useValidation } from "../../lib/hooks/useValidation"
import { timeToMinutes, formatHour } from "../../lib/time"
import { CELL_HEIGHT, DEFAULT_START_HOUR, DEFAULT_END_HOUR } from "../../lib/config"

export type Block = {
    course: {
        id: string
        code: string
        sectionName: string
    }
    schedule: {
        day: string
        start: string
        end: string
        room: string
    }
    top: number
    height: number
    isConflict: boolean
}

export function useScheduleTable() {
    const tableTitle = useStore((s) => s.tableTitle)
    const setTableTitle = useStore((s) => s.setTableTitle)
    const sections = useStore((s) => s.sections)
    const { conflictKeys } = useValidation()

    const enabledCourses = sections.flatMap((section) => {
        const active = section.courses.filter((c) => c.enabled)
        return active.map((c) => ({ ...c, sectionName: section.name }))
    })

    const allSchedules = enabledCourses.flatMap((s) => s.schedules)

    const startHour = allSchedules.length > 0
        ? Math.max(0, Math.floor(Math.min(...allSchedules.map((s) => timeToMinutes(s.start))) / 60) - 1)
        : DEFAULT_START_HOUR

    const endHour = allSchedules.length > 0
        ? Math.min(24, Math.ceil(Math.max(...allSchedules.map((s) => timeToMinutes(s.end))) / 60) + 1)
        : DEFAULT_END_HOUR

    const totalHeight = CELL_HEIGHT * (endHour - startHour)
    const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i)

    function getBlocksForDay(day: string) {
        const totalMinutes = (endHour - startHour) * 60

        return enabledCourses.flatMap((course) =>
            course.schedules
                .filter((s) => s.day === day)
                .map((schedule) => {
                    const startMin = timeToMinutes(schedule.start) - startHour * 60
                    const endMin = timeToMinutes(schedule.end) - startHour * 60
                    const top = (startMin / totalMinutes) * totalHeight
                    const height = ((endMin - startMin) / totalMinutes) * totalHeight
                    const isConflict = conflictKeys.has(`${course.id}:${day}`)

                    return { course, schedule, top, height, isConflict }
                })
        )
    }

    return {
        hours,
        startHour,
        totalHeight,
        getBlocksForDay,
        formatHour,
        tableTitle,
        setTableTitle,
    }
}