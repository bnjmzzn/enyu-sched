import { useRef, useState } from "react"
import { useStore, type Section } from "../../lib/store"
import SubjectRow from "./SubjectRow"
import AddSubjectsModal from "./AddSubjectsModal"

type Props = {
    section: Section
}

export default function SectionPanel({ section }: Props) {
    const { renameSection, removeSection, toggleAllSubjects } = useStore()
    const [collapsed, setCollapsed] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(false)
    const [nameInput, setNameInput] = useState(section.name)
    const checkboxRef = useRef<HTMLInputElement>(null)

    const allEnabled = section.subjects.every((s) => s.enabled)
    const someEnabled = section.subjects.some((s) => s.enabled)
    const isIndeterminate = someEnabled && !allEnabled

    if (checkboxRef.current) {
        checkboxRef.current.indeterminate = isIndeterminate
    }

    function handleSectionToggle() {
        toggleAllSubjects(section.id, !allEnabled)
    }

    function handleRename() {
        const trimmed = nameInput.trim()
        if (trimmed.length > 0) renameSection(section.id, trimmed)
        else setNameInput(section.name)
        setEditing(false)
    }

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                <input
                    ref={checkboxRef}
                    type="checkbox"
                    checked={allEnabled}
                    onChange={handleSectionToggle}
                />

                <button
                    onClick={() => setCollapsed((v) => !v)}
                    className="text-gray-400 text-xs"
                >
                    {collapsed ? "▶" : "▼"}
                </button>

                {editing ? (
                    <input
                        autoFocus
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === "Enter" && handleRename()}
                        className="flex-1 text-sm font-medium border-b border-gray-400 bg-transparent focus:outline-none"
                    />
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex-1 text-sm font-medium text-left hover:text-gray-500 truncate"
                    >
                        {section.name}
                    </button>
                )}

                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
                    >
                        + add
                    </button>
                    <button
                        onClick={() => removeSection(section.id)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 text-red-500 hover:bg-red-50"
                    >
                        remove
                    </button>
                </div>
            </div>

            {!collapsed && (
                <div className="px-3 py-2">
                    {section.subjects.length === 0 && (
                        <p className="text-xs text-gray-400 py-1">no subjects yet.</p>
                    )}
                    {section.subjects.map((subject) => (
                        <SubjectRow
                            key={subject.id}
                            sectionId={section.id}
                            subject={subject}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <AddSubjectsModal
                    sectionId={section.id}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}