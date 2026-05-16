import { useScheduleTable } from "./useScheduleTable"
import Button from "../../ui/Button"
import { DAYS, CELL_HEIGHT } from "../../lib/config"

export default function ScheduleTable() {
    const { tableRef, hours, startHour, totalHeight, getBlocksForDay, handleExport, formatHour } = useScheduleTable()

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end">
                <Button onClick={handleExport}>export png</Button>
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