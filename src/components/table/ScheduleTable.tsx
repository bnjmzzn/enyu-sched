// src/components/table/ScheduleTable.tsx

import { useRef } from "react"
import domtoimage from "dom-to-image"
import { useStore } from "../../lib/store"
import { useConflicts } from "../../lib/useConflicts"
import { DAYS } from "../../lib/config"

const START_HOUR = 7
const END_HOUR = 21
const CELL_HEIGHT = 40

function timeToMinutes(time: string): number {
    const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/)
    if (!match) return 0

    let hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    const period = match[3]

    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    return hours * 60 + minutes
}

function formatHour(hour: number): string {
    if (hour === 12) return "12pm"
    if (hour > 12) return `${hour - 12}pm`
    return `${hour}am`
}

export default function ScheduleTable() {
    const sections = useStore((s) => s.sections)
    const { conflictKeys } = useConflicts()
    const tableRef = useRef<HTMLDivElement>(null)

    const enabledSubjects = sections
        .flatMap((s) => s.subjects)
        .filter((s) => s.enabled)

    const allSchedules = enabledSubjects.flatMap((s) => s.schedules)

    const startHour = allSchedules.length > 0
        ? Math.max(0, Math.floor(Math.min(...allSchedules.map((s) => timeToMinutes(s.start))) / 60) - 1)
        : START_HOUR

    const endHour = allSchedules.length > 0
        ? Math.min(24, Math.ceil(Math.max(...allSchedules.map((s) => timeToMinutes(s.end))) / 60) + 1)
        : END_HOUR

    const totalMinutes = (endHour - startHour) * 60
    const totalHeight = CELL_HEIGHT * (endHour - startHour)
    const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i)

    function getBlocksForDay(day: string) {
        return enabledSubjects.flatMap((subject) =>
            subject.schedules
                .filter((s) => s.day === day)
                .map((schedule) => {
                    const startMin = timeToMinutes(schedule.start) - startHour * 60
                    const endMin = timeToMinutes(schedule.end) - startHour * 60
                    const top = (startMin / totalMinutes) * totalHeight
                    const height = ((endMin - startMin) / totalMinutes) * totalHeight
                    const isConflict = conflictKeys.has(`${subject.id}:${day}`)

                    return { subject, schedule, top, height, isConflict }
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

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end">
                <button
                    onClick={handleExport}
                    className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                >
                    export png
                </button>
            </div>

            <div ref={tableRef} className="overflow-auto bg-white p-2">
                <div className="flex text-xs text-gray-400 mb-1 ml-10">
                    {DAYS.map((day) => (
                        <div key={day} className="flex-1 text-center">{day}</div>
                    ))}
                </div>

                <div className="flex">
                    <div className="w-10 shrink-0 relative" style={{ height: totalHeight }}>
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                className="absolute w-full text-right pr-1 text-xs text-gray-300"
                                style={{ top: (hour - startHour) * CELL_HEIGHT - 6 }}
                            >
                                {formatHour(hour)}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-1 border-l border-t border-gray-100">
                        {DAYS.map((day) => {
                            const blocks = getBlocksForDay(day)

                            return (
                                <div
                                    key={day}
                                    className="flex-1 relative border-r border-gray-100"
                                    style={{ height: totalHeight }}
                                >
                                    {hours.map((hour) => (
                                        <div
                                            key={hour}
                                            className="absolute w-full border-b border-gray-100"
                                            style={{ top: (hour - startHour) * CELL_HEIGHT, height: CELL_HEIGHT }}
                                        />
                                    ))}

                                    {blocks.map((block, i) => (
                                        <div
                                            key={`${block.subject.id}-${i}`}
                                            className={`absolute inset-x-0.5 rounded text-xs p-1 overflow-hidden ${
                                                block.isConflict
                                                    ? "bg-red-100 border border-red-300 text-red-700 opacity-50"
                                                    : "bg-blue-100 border border-blue-200 text-blue-800"
                                            }`}
                                            style={{ top: block.top, height: block.height }}
                                        >
                                            <span className="font-semibold leading-tight block">{block.subject.code}</span>
                                            <span className="opacity-70 leading-tight block">{block.schedule.room}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}