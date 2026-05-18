import { useStore } from "../../lib/store/appStore"

export default function CoursePanel() {
    const sections = useStore((s) => s.sections)

    const rows = sections.flatMap((section) =>
        section.courses
            .filter((course) => course.enabled)
            .map((course) => ({
                id: course.id,
                code: course.code,
                section: section.name,
                schedules: course.schedules.map((s) => `${s.day} ${s.start} - ${s.end} · ${s.room}`),
            }))
    )

    if (rows.length === 0) return null

    return (
        <div className="border border-gray-200 rounded-lg">
            <table className="w-full">
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="border-t border-gray-100 align-top">
                            <td className="px-3 py-2 whitespace-nowrap">
                                {row.code}
                                <span className="ml-2 text-gray-400">{row.section}</span>
                            </td>
                            <td className="px-3 py-2">
                                {row.schedules.map((sched, i) => (
                                    <div key={i}>{sched}</div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}