import { useState } from "react"
import { useStore, type Section } from "../../lib/store/appStore"
import { useUI } from "../../lib/store/uiStore"

export function useSectionPanel(section: Section) {
    const { renameSection, removeSection, toggleAllCourses } = useStore()
    const { showConfirm } = useUI()
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(false)
    const [nameInput, setNameInput] = useState(section.name)

    const allEnabled = section.courses.every((s) => s.enabled)
    const someEnabled = section.courses.some((s) => s.enabled)
    const isIndeterminate = someEnabled && !allEnabled

    function handleSectionToggle() {
        toggleAllCourses(section.id, !allEnabled)
    }

    function handleRename() {
        const trimmed = nameInput.trim()
        if (trimmed.length > 0) renameSection(section.id, trimmed)
        else setNameInput(section.name)
        setEditing(false)
    }

    function handleRemove() {
        const count = section.courses.length
        if (count > 0) {
            showConfirm({
                title: `remove "${section.name}"?`,
                message: `This section has ${count} course${count > 1 ? "s" : ""}. This cannot be undone.`,
                confirmLabel: "Remove section",
                onConfirm: () => removeSection(section.id),
            })
            return
        }
        removeSection(section.id)
    }

    return {
        showModal, setShowModal,
        editing, setEditing,
        nameInput, setNameInput,
        allEnabled,
        isIndeterminate,
        handleSectionToggle,
        handleRename,
        handleRemove,
    }
}