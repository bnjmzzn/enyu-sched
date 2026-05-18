import { useStore } from "../../lib/store/appStore"

export default function CourseListPanel() {
    const sections = useStore((s) => s.sections)

    const activeSections = sections
        .map((s) => ({
            ...s,
            courses: s.courses.filter((c) => c.enabled),
        }))
        .filter((s) => s.courses.length > 0)

    if (activeSections.length === 0) return null

    return (
        <div className="flex flex-col">
            {activeSections.flatMap((section) =>
                section.courses.map((course) => (
                    <div key={course.id} className="flex items-center gap-2 py-1">
                        <span>{course.code}</span>
                        <span>{section.name}</span>
                        <span>{course.unit.toFixed(1)}</span>
                    </div>
                ))
            )}
        </div>
    )
}