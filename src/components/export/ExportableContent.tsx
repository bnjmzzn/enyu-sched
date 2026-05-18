import { useEffect, useRef, useState } from "react"
import ScheduleTable from "../table/ScheduleTable"
import ErrorList from "../summary/ErrorList"
import StatsBar from "../summary/StatsBar"
import CoursePanel from "../summary/CoursePanel"

function AnimatedSection({ children, dataSection }: { children: React.ReactNode; dataSection: string }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(id)
    }, [])

    return (
        <div
            data-export-section={dataSection}
            style={{
                opacity: mounted ? undefined : 0,
                animation: mounted ? "panel-in 0.25s ease forwards" : "none",
            }}
        >
            {children}
        </div>
    )
}

export default function ExportableContent() {
    return (
        <div data-export-root className="flex flex-col gap-3">
            <AnimatedSection dataSection="table"><ScheduleTable /></AnimatedSection>
            <AnimatedSection dataSection="errors"><ErrorList /></AnimatedSection>
            <AnimatedSection dataSection="summary"><StatsBar /></AnimatedSection>
            <AnimatedSection dataSection="courselist"><CoursePanel /></AnimatedSection>
        </div>
    )
}