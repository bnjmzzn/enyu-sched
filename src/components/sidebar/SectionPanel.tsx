import { useStore, type Section } from "../../lib/store/appStore"
import { useSectionPanel } from "../../lib/hooks/useSectionPanel"
import CourseRow from "./CourseRow"
import AddCoursesModal from "./AddCourseModal"
import Button from "../../ui/Button"
import Checkbox from "../../ui/Checkbox"

type HeaderProps = {
    section: Section
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
        <div className="flex items-center gap-2 px-3 py-2 border-b-3 border-border">
            <Checkbox
                checked={allEnabled}
                indeterminate={isIndeterminate}
                onChange={onSectionToggle}
            />

            {editing ? (
                <input
                    autoFocus
                    value={nameInput}
                    onChange={(e) => onNameChange(e.target.value)}
                    onBlur={onRename}
                    onKeyDown={(e) => e.key === "Enter" && onRename()}
                    className="flex-1 py-1 px-2"
                />
            ) : (
                <button onClick={onEditStart} className="flex-1 text-left truncate font-mono">
                    {section.name}
                </button>
            )}

            {!editing && (
                <div className="flex items-center gap-1 shrink-0">
                    <Button onClick={onAdd}>+ add</Button>
                    <Button variant="danger" onClick={onRemove}>remove</Button>
                </div>
            )}
        </div>
    )
}

export default function SectionPanel({ section }: { section: Section }) {
    const { toggleCourse, removeCourse } = useStore()
    const {
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
        <div className="border-3 border-border rounded-md bg-white text-black">
            <SectionHeader
                section={section}
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

            <div className="px-3 py-2">
                {section.courses.length === 0 && (
                    <p>No courses yet</p>
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

            {showModal && (
                <AddCoursesModal
                    sectionId={section.id}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}