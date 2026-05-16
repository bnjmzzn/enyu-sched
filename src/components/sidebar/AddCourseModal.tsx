import { useState } from "react"
import { parseScheduleString, type ParsedCourse } from "../../lib/parser"
import { useStore } from "../../lib/store"
import ParsedCourseCard from "./ParsedCourseCard"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"

type Props = {
    sectionId: string
    onClose: () => void
}

export default function AddCoursesModal({ sectionId, onClose }: Props) {
    const addCourses = useStore((s) => s.addCourses)
    const [input, setInput] = useState("")

    const parsed: ParsedCourse[] = input.trim().length > 0
        ? parseScheduleString(input)
        : []

    const isEmpty = input.trim().length === 0
    const hasNoResults = !isEmpty && parsed.length === 0
    const addLabel = parsed.length > 0
        ? `add ${parsed.length} course${parsed.length > 1 ? "s" : ""}`
        : "add"

    function handleConfirm() {
        if (parsed.length === 0) return
        addCourses(sectionId, parsed)
        onClose()
    }

    const footer = (
        <div className="flex justify-end gap-2">
            <Button onClick={onClose}>cancel</Button>
            <Button variant="primary" disabled={parsed.length === 0} onClick={handleConfirm}>
                {addLabel}
            </Button>
        </div>
    )

    return (
        <Modal title="add courses" onClose={onClose} footer={footer}>
            <div className="flex flex-col gap-4">
                <textarea
                    rows={8}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="paste your schedule here..."
                    className="w-full border border-gray-300 rounded p-2 text-sm font-mono resize-y focus:outline-none"
                    autoFocus
                />

                <div className="flex flex-col gap-2">
                    {isEmpty && <p className="text-sm text-gray-400">paste something to see a preview.</p>}
                    {hasNoResults && <p className="text-sm text-red-400">no valid courses found. check your input.</p>}
                    {parsed.length > 0 && (
                        <>
                            <p className="text-xs text-gray-400">
                                found {parsed.length} course{parsed.length > 1 ? "s" : ""}
                            </p>
                            {parsed.map((course) => (
                                <ParsedCourseCard key={course.code} course={course} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Modal>
    )
}