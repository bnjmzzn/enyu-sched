import { useEffect, useState } from "react"
import Sidebar from "./components/sidebar/Sidebar"
import ScheduleTable from "./components/table/ScheduleTable"
import StatsBar from "./components/summary/StatsBar"
import ConflictList from "./components/summary/ErrorList"

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)")
        if (mq.matches) setSidebarOpen(false)
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex flex-col flex-1 overflow-scroll p-4 gap-3 min-w-0">
                <ScheduleTable />
                <StatsBar />
                <ConflictList />
            </div>
        </div>
    )
}