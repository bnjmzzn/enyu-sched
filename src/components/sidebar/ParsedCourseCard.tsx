import type { ParsedCourse } from "../../lib/parser"
import Card from "../../ui/Card"

type Props = {
    course: ParsedCourse
}

export default function ParsedCourseCard({ course }: Props) {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{course.code}</span>
                <span className="text-sm font-semibold">{course.unit.toFixed(1)} units</span>
            </div>
            <div className="flex flex-col gap-0.5">
                {course.schedules.map((s, i) => (
                    <span key={i} className="text-xs text-gray-500">
                        {s.day} {s.start} - {s.end} - {s.room}
                    </span>
                ))}
            </div>
        </Card>
    )
}