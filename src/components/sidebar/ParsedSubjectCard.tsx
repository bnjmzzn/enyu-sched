import type { ParsedSubject } from "../../lib/parser"

type Props = {
    subject: ParsedSubject
}

export default function ParsedSubjectCard({ subject }: Props) {
    return (
        <div className="border border-gray-200 rounded p-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{subject.code}</span>
                <span className="text-xs text-gray-400">{subject.unit.toFixed(1)} units</span>
            </div>
            <div className="flex flex-col gap-0.5">
                {subject.schedules.map((s, i) => (
                    <span key={i} className="text-xs text-gray-500">
                        {s.day} {s.start} - {s.end} — {s.room}
                    </span>
                ))}
            </div>
        </div>
    )
}