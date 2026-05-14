import { useStore } from "../../lib/store"
import SectionPanel from "./SectionPanel"

export default function Sidebar() {
    const { sections, addSection } = useStore()

    return (
        <div className="flex flex-col gap-3 p-4 w-80 shrink-0 overflow-y-auto border-r border-gray-200">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">sections</span>
                <button
                    onClick={addSection}
                    className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                >
                    + new section
                </button>
            </div>

            {sections.length === 0 && (
                <p className="text-xs text-gray-400">no sections yet.</p>
            )}

            {sections.map((section) => (
                <SectionPanel key={section.id} section={section} />
            ))}
        </div>
    )
}