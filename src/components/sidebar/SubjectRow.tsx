import { useStore, type Subject } from "../../lib/store"

type Props = {
    sectionId: string
    subject: Subject
}

export default function SubjectRow({ sectionId, subject }: Props) {
    const { toggleSubject, removeSubject } = useStore()

    return (
        <div className="flex items-center gap-2 py-1">
            <input
                type="checkbox"
                checked={subject.enabled}
                onChange={() => toggleSubject(sectionId, subject.id)}
            />
            <span className="flex-1 text-sm">{subject.code}</span>
            <span className="text-xs text-gray-400">{subject.unit.toFixed(1)}</span>
            <button
                onClick={() => removeSubject(sectionId, subject.id)}
                className="text-xs text-red-400 hover:text-red-600"
            >
                remove
            </button>
        </div>
    )
}