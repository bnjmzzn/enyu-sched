import { useStore } from "../../lib/store"
import SectionPanel from "./SectionPanel"
import Button from "../../ui/Button"

type Props = {
    open: boolean
    onToggle: () => void
}

export default function Sidebar({ open, onToggle }: Props) {
    const { sections, addSection } = useStore()

    return (
        <>
            <aside
                className={`
                    flex flex-col bg-white border-r border-gray-200 overflow-y-auto z-40
                    fixed inset-y-0 left-0 w-80 transition-transform duration-200
                    md:relative md:translate-x-0 md:flex md:w-80 md:shrink-0
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">sections</span>
                        <Button onClick={addSection}>+ new section</Button>
                    </div>

                    {sections.length === 0 && (
                        <p className="text-xs text-gray-400">no sections yet.</p>
                    )}

                    {sections.map((section) => (
                        <SectionPanel key={section.id} section={section} />
                    ))}
                </div>
            </aside>

            <button
                onClick={onToggle}
                className="md:hidden fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-gray-900 text-white text-sm shadow-lg flex items-center justify-center"
            >
                {open ? "✕" : "☰"}
            </button>
        </>
    )
}