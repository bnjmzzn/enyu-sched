import { useState } from "react"
import { parseScheduleString, type ParsedSubject } from "../../lib/parser"
import { useStore } from "../../lib/store"
import ParsedSubjectCard from "./ParsedSubjectCard"

type Props = {
    sectionId: string
    onClose: () => void
}

export default function AddSubjectsModal({ sectionId, onClose }: Props) {
    const addSubjects = useStore((s) => s.addSubjects)
    const [input, setInput] = useState("")

    const parsed: ParsedSubject[] = input.trim().length > 0
        ? parseScheduleString(input)
        : []

    const isEmpty = input.trim().length === 0
    const hasNoResults = !isEmpty && parsed.length === 0

    function handleConfirm() {
        if (parsed.length === 0) return
        addSubjects(sectionId, parsed)
        onClose()
    }

    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg p-6 w-[520px] max-h-[80vh] overflow-y-auto flex flex-col gap-4">
                <h2 className="text-sm font-semibold">add subjects</h2>

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
                    {hasNoResults && <p className="text-sm text-red-400">no valid subjects found. check your input.</p>}
                    {parsed.length > 0 && (
                        <>
                            <p className="text-xs text-gray-400">
                                found {parsed.length} subject{parsed.length > 1 ? "s" : ""}
                            </p>
                            {parsed.map((subject) => (
                                <ParsedSubjectCard key={subject.code} subject={subject} />
                            ))}
                        </>
                    )}
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="text-sm px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                    >
                        cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={parsed.length === 0}
                        className="text-sm px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {parsed.length > 0
                            ? `add ${parsed.length} subject${parsed.length > 1 ? "s" : ""}`
                            : "add"}
                    </button>
                </div>
            </div>
        </div>
    )
}