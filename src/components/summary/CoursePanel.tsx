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
        <div
            className="border-3 border-border rounded-lg bg-white hover-lift shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
            style={{ animation: "panel-in 0.2s ease forwards" }}
        >
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border text-left text-sm text-[var(--color-muted)]">
                        <th className="px-3 py-2 font-medium">Course</th>
                        <th className="px-3 py-2 font-medium">Schedule</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="border-t border-border align-top">
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="font-semibold">{row.code}</span>
                                <span className="ml-2 text-[var(--color-muted)]">{row.section}</span>
                            </td>
                            <td className="px-3 py-2 font-mono">
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