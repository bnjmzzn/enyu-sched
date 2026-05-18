import { useEffect, useState } from "react"
import Sidebar from "./components/sidebar/Sidebar"
import ExportableContent from "./components/export/ExportableContent"
import ExportPanel from "./components/export/ExportPanel"
import Toaster from "./ui/Toaster"
import ConfirmDialog from "./ui/ConfirmDialog"
import Hero from "./components/Hero"

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
                <div className="flex flex-col gap-3 pb-8">
                    <Hero />
                    <ExportableContent />
                    <ExportPanel />
                </div>
            </div>

            <Toaster />
            <ConfirmDialog />
        </div>
    )
}