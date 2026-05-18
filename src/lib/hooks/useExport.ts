import { useState } from "react"
import { toPng } from "html-to-image"
import { useStore } from "../store/appStore"
import { useUI } from "../store/uiStore"

export type ExportSelection = {
    table: boolean
    errors: boolean
    summary: boolean
    courseList: boolean
}

export function useExport() {
    const { showToast } = useUI()
    const tableTitle = useStore((s) => s.tableTitle)
    const sections = useStore((s) => s.sections)

    const [selection, setSelection] = useState<ExportSelection>({
        table: true,
        errors: false,
        summary: true,
        courseList: false,
    })

    function toggleSelection(key: keyof ExportSelection) {
        setSelection((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    async function handleExportPNG() {
        const root = document.querySelector<HTMLElement>("[data-export-root]")
        if (!root) return
    
        const sectionMap: Record<string, boolean> = {
            table: true,
            errors: selection.errors,
            summary: selection.summary,
            courselist: selection.courseList,
        }
    
        const prevWidth = root.style.width
        const prevMinWidth = root.style.minWidth
        root.style.width = "900px"
        root.style.minWidth = "900px"
    
        await new Promise((resolve) => requestAnimationFrame(resolve))
    
        try {
            const dataUrl = await toPng(root, {
                pixelRatio: 2,
                backgroundColor: "#F8F9FA",
                filter: (node) => {
                    if (node instanceof HTMLElement) {
                        const section = node.getAttribute("data-export-section")
                        if (section && !sectionMap[section]) return false
                    }
                    return true
                },
            })
            const link = document.createElement("a")
            link.download = `${tableTitle.trim() || "schedule"}.png`
            link.href = dataUrl
            link.click()
        } catch (err) {
            console.error("export failed", err)
            showToast("export failed", "error")
        } finally {
            root.style.width = prevWidth
            root.style.minWidth = prevMinWidth
        }
    }

    function handleExportText() {
        const lines: string[] = []

        const enabledCourses = sections.flatMap((s) =>
            s.courses.filter((c) => c.enabled).map((c) => ({ ...c, sectionName: s.name }))
        )

        if (tableTitle.trim().length > 0) {
            lines.push(tableTitle.trim())
            lines.push("")
        }

        if (selection.table) {
            const usedDays = [...new Set(enabledCourses.flatMap((c) => c.schedules.map((s) => s.day)))]
            for (const day of usedDays) {
                const daySchedules = enabledCourses.flatMap((c) =>
                    c.schedules.filter((s) => s.day === day).map((s) => ({ course: c, schedule: s }))
                )
                if (daySchedules.length === 0) continue
                lines.push(`[${day}]`)
                lines.push("")
                for (const { course, schedule } of daySchedules) {
                    lines.push(`${course.code} (${course.sectionName})`)
                    lines.push(`${schedule.start} - ${schedule.end} ${schedule.room}`)
                    lines.push("")
                }
            }
        }

        if (selection.courseList) {
            lines.push("COURSES")
            lines.push("")
            for (const course of enabledCourses) {
                lines.push(`${course.code} — ${course.unit.toFixed(1)} units (${course.sectionName})`)
            }
            lines.push("")
        }

        navigator.clipboard.writeText(lines.join("\n")).then(() => {
            showToast("copied to clipboard", "success")
        }).catch(() => {
            showToast("failed to copy", "error")
        })
    }

    return {
        selection,
        toggleSelection,
        handleExportPNG,
        handleExportText,
    }
}