import { type Course } from "../../lib/store/appStore"
import Checkbox from "../../ui/Checkbox"
import Button from "../../ui/Button"

type Props = {
    course: Course
    onToggle: () => void
    onRemove: () => void
}

export default function CourseRow({ course, onToggle, onRemove }: Props) {
    return (
        <div className="flex items-center gap-2 py-1">
            <Checkbox checked={course.enabled} onChange={onToggle} />
            <span className="flex-1 text-sm">{course.code}</span>
            <span className="text-xs text-gray-400">{course.unit.toFixed(1)}</span>
            <Button variant="danger" onClick={onRemove}>remove</Button>
        </div>
    )
}