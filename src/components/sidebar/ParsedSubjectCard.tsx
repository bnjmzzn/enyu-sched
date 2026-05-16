import type { ParsedSubject } from "../../lib/parser"
import Card from "../../ui/Card"

type Props = {
    subject: ParsedSubject
}

export default function ParsedSubjectCard({ subject }: Props) {
    return (
        <Card>
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
        </Card>
    )
}