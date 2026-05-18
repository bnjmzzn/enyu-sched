import { useScheduleTable } from "../../lib/hooks/useScheduleTable"
import Button from "../../ui/Button"
import { DAYS, CELL_HEIGHT } from "../../lib/config"
import type { Block } from "../../lib/hooks/useScheduleTable"
import { useValidation } from "../../lib/hooks/useValidation"

type BlockProps = {
    block: Block
}

type DayColumnProps = {
    day: string
    hours: number[]
    startHour: number
    totalHeight: number
    blocks: Block[]
}

function CourseBlock({ block }: BlockProps) {
    const blockClass = block.isConflict
        ? "bg-red-100 border border-red-300 text-red-700 opacity-50"
        : "bg-blue-100 border border-blue-200 text-blue-800"

    return (
        <div
            className={`absolute inset-x-0.5 rounded text-xs p-1 overflow-hidden ${blockClass}`}
            style={{ top: block.top, height: block.height }}
        >
            <span className="font-semibold leading-tight block">{block.course.code}</span>
            <span className="opacity-70 leading-tight block">{block.schedule.room}</span>
            <span className="opacity-70 leading-tight block">{block.course.sectionName}</span>
            <span className="opacity-70 leading-tight block">{block.schedule.start} - {block.schedule.end}</span>
        </div>
    )
}

function DayColumn({ day, hours, startHour, totalHeight, blocks }: DayColumnProps) {
    return (
        <div
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
                <CourseBlock key={`${block.course.id}-${i}`} block={block} />
            ))}
        </div>
    )
}

export default function ScheduleTable() {
    const { hasIssues } = useValidation()
    const {
        tableRef,
        hours,
        startHour,
        totalHeight,
        getBlocksForDay,
        handleExportPNG,
        handleExportText,
        formatHour,
        tableTitle,
        setTableTitle,
    } = useScheduleTable()

    const tableBorder = hasIssues ? "border border-red-300" : "border border-border"

    return (
        <div className="flex flex-col gap-2">
            <div ref={tableRef} className={`bg-white p-4 rounded-lg border-3 ${tableBorder}`}>
                <input
                    type="text"
                    value={tableTitle}
                    onChange={(e) => setTableTitle(e.target.value)}
                    placeholder="Schedule title..."
                    className="border-b border-border focus:outline-none mb-2"
                />

                <div className="flex mb-1 ml-10">
                    {DAYS.map((day) => (
                        <div key={day} className="flex-1 text-center">{day}</div>
                    ))}
                </div>

                <div className="flex">
                    <div className="w-10 shrink-0 relative" style={{ height: totalHeight }}>
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                className="absolute w-full text-right pr-1"
                                style={{ top: (hour - startHour) * CELL_HEIGHT - 6 }}
                            >
                                {formatHour(hour)}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-1 border-l border-t border-border rounded-md">
                        {DAYS.map((day) => (
                            <DayColumn
                                key={day}
                                day={day}
                                hours={hours}
                                startHour={startHour}
                                totalHeight={totalHeight}
                                blocks={getBlocksForDay(day)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={handleExportText}>Export TXT</Button>
                <Button variant="primary" onClick={handleExportPNG}>Export PNG</Button>
            </div>
        </div>
    )
}