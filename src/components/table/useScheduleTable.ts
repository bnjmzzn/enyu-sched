import { useRef } from "react"
import domtoimage from "dom-to-image"
import { useStore } from "../../lib/store"
import { useConflicts } from "../../lib/useConflicts"
import { timeToMinutes, formatHour } from "../../lib/time"
import { CELL_HEIGHT, DEFAULT_START_HOUR, DEFAULT_END_HOUR } from "../../lib/config"

export function useScheduleTable() {
    const sections = useStore((s) => s.sections)
    const { conflictKeys } = useConflicts()
    const tableRef = useRef<HTMLDivElement>(null)

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

    const totalMinutes = (endHour - startHour) * 60
    const totalHeight = CELL_HEIGHT * (endHour - startHour)
    const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i)

    function getBlocksForDay(day: string) {
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

    function handleExport() {
        if (!tableRef.current) return
        domtoimage.toPng(tableRef.current).then((dataUrl) => {
            const link = document.createElement("a")
            link.download = "schedule.png"
            link.href = dataUrl
            link.click()
        })
    }

    return { tableRef, hours, startHour, totalHeight, getBlocksForDay, handleExport, formatHour }
}