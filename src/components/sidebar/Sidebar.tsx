import { useStore } from "../../lib/store"
import SectionPanel from "./SectionPanel"
import Button from "../../ui/Button"

export default function Sidebar() {
    const { sections, addSection } = useStore()

    return (
        <div className="flex flex-col gap-3 p-4 w-80 shrink-0 overflow-y-auto border-r border-gray-200">
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
    )
}