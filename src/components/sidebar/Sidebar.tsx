import { useStore } from "../../lib/store/appStore"
import SectionPanel from "./SectionPanel"
import Button from "../../ui/Button"
import { Icon } from "@iconify/react"

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
                    flex flex-col overflow-y-auto
                    text-white
                    bg-[var(--color-brand)]
                    border-r-3 border-[var(--color-border)]
                    fixed inset-y-0 left-0 z-40 w-80
                    transition-transform duration-200
                    md:relative md:translate-x-0 md:flex md:w-80 md:shrink-0
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <div className="flex flex-col gap-3 p-4 flex-1">
                    <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold tracking-normal">Sections</span>
                        <Button variant="secondary" onClick={addSection}>Add Section</Button>
                    </div>

                    {sections.length === 0 && (
                        <p className="text-gray-400">No sections yet.</p>
                    )}

                    {sections.map((section) => (
                        <SectionPanel key={section.id} section={section} />
                    ))}
                </div>
            </aside>
            <button
                onClick={onToggle}
                className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[var(--color-brand)] text-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-90 border-3 border-border"
            >
                <Icon
                    icon={open ? "lucide:x" : "lucide:menu"}
                    width={20}
                    height={20}
                    className="transition-transform duration-200 "
                    style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
                />
            </button>
        </>
    )
}