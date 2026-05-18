import { type Course } from "../../lib/store/appStore"
import Checkbox from "../../ui/Checkbox"
import IconButton from "../../ui/IconButton"

type Props = {
    course: Course
    onToggle: () => void
    onRemove: () => void
}

export default function CourseRow({ course, onToggle, onRemove }: Props) {
    return (
        <div className="flex items-center gap-2 py-1 px-1 rounded-md transition-colors duration-100 hover:bg-gray-50">
            <Checkbox checked={course.enabled} onChange={onToggle} />
            <span className="flex-1 font-mono">{course.code}</span>
            <span className="text-gray-500 font-mono">{course.unit.toFixed(1)}</span>
            <IconButton icon="lucide:x" className="text-red-500 hover:bg-red-50" onClick={onRemove} />
        </div>
    )
}