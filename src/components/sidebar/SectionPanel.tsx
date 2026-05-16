import { useStore, type Section } from "../../lib/store"
import { useSectionPanel } from "./useSectionPanel"
import SubjectRow from "./SubjectRow"
import AddSubjectsModal from "./AddSubjectsModal"
import Button from "../../ui/Button"
import Checkbox from "../../ui/Checkbox"

type Props = {
    section: Section
}

export default function SectionPanel({ section }: Props) {
    const { toggleSubject, removeSubject } = useStore()
    const {
        collapsed, setCollapsed,
        showModal, setShowModal,
        editing, setEditing,
        nameInput, setNameInput,
        allEnabled,
        isIndeterminate,
        handleSectionToggle,
        handleRename,
        handleRemove,
    } = useSectionPanel(section)

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                <Checkbox
                    checked={allEnabled}
                    indeterminate={isIndeterminate}
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
                    <Button onClick={() => setShowModal(true)}>+ add</Button>
                    <Button variant="danger" onClick={handleRemove}>remove</Button>
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
                            subject={subject}
                            onToggle={() => toggleSubject(section.id, subject.id)}
                            onRemove={() => removeSubject(section.id, subject.id)}
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