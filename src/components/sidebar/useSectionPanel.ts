import { useState, useRef } from "react"
import { useStore, type Section } from "../../lib/store"

export function useSectionPanel(section: Section) {
    const { renameSection, removeSection, toggleAllCourses } = useStore()
    const [collapsed, setCollapsed] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(false)
    const [nameInput, setNameInput] = useState(section.name)
    const checkboxRef = useRef<HTMLInputElement>(null)

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
        removeSection(section.id)
    }

    return {
        collapsed, setCollapsed,
        showModal, setShowModal,
        editing, setEditing,
        nameInput, setNameInput,
        checkboxRef,
        allEnabled,
        isIndeterminate,
        handleSectionToggle,
        handleRename,
        handleRemove,
    }
}