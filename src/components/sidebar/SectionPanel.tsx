import { useStore, type Section } from "../../lib/store/appStore"
import { useSectionPanel } from "../../lib/hooks/useSectionPanel"
import CourseRow from "./CourseRow"
import AddCoursesModal from "./AddCourseModal"
import Button from "../../ui/Button"
import Checkbox from "../../ui/Checkbox"

type HeaderProps = {
    section: Section
    collapsed: boolean
    onToggle: () => void
    editing: boolean
    onEditStart: () => void
    nameInput: string
    onNameChange: (v: string) => void
    onRename: () => void
    allEnabled: boolean
    isIndeterminate: boolean
    onSectionToggle: () => void
    onAdd: () => void
    onRemove: () => void
}

function SectionHeader({
    section,
    collapsed,
    onToggle,
    editing,
    onEditStart,
    nameInput,
    onNameChange,
    onRename,
    allEnabled,
    isIndeterminate,
    onSectionToggle,
    onAdd,
    onRemove,
}: HeaderProps) {
    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
            <Checkbox
                checked={allEnabled}
                indeterminate={isIndeterminate}
                onChange={onSectionToggle}
            />

            <button
                onClick={onToggle}
                className="text-gray-400 text-xs"
            >
                {collapsed ? "▶" : "▼"}
            </button>

            {editing ? (
                <input
                    autoFocus
                    value={nameInput}
                    onChange={(e) => onNameChange(e.target.value)}
                    onBlur={onRename}
                    onKeyDown={(e) => e.key === "Enter" && onRename()}
                    className="flex-1 text-sm font-medium border-b border-gray-400 bg-transparent focus:outline-none"
                />
            ) : (
                <button
                    onClick={onEditStart}
                    className="flex-1 text-sm font-medium text-left hover:text-gray-500 truncate"
                >
                    {section.name}
                </button>
            )}

            <div className="flex items-center gap-1 shrink-0">
                <Button onClick={onAdd}>+ add</Button>
                <Button variant="danger" onClick={onRemove}>remove</Button>
            </div>
        </div>
    )
}

export default function SectionPanel({ section }: { section: Section }) {
    const { toggleCourse, removeCourse } = useStore()
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
            <SectionHeader
                section={section}
                collapsed={collapsed}
                onToggle={() => setCollapsed((v) => !v)}
                editing={editing}
                onEditStart={() => setEditing(true)}
                nameInput={nameInput}
                onNameChange={setNameInput}
                onRename={handleRename}
                allEnabled={allEnabled}
                isIndeterminate={isIndeterminate}
                onSectionToggle={handleSectionToggle}
                onAdd={() => setShowModal(true)}
                onRemove={handleRemove}
            />

            {!collapsed && (
                <div className="px-3 py-2">
                    {section.courses.length === 0 && (
                        <p className="text-xs text-gray-400 py-1">no courses yet.</p>
                    )}
                    {section.courses.map((course) => (
                        <CourseRow
                            key={course.id}
                            course={course}
                            onToggle={() => toggleCourse(section.id, course.id)}
                            onRemove={() => removeCourse(section.id, course.id)}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <AddCoursesModal
                    sectionId={section.id}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}