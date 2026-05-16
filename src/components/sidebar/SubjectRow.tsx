import { type Subject } from "../../lib/store"
import Checkbox from "../../ui/Checkbox"
import Button from "../../ui/Button"

type Props = {
    subject: Subject
    onToggle: () => void
    onRemove: () => void
}

export default function SubjectRow({ subject, onToggle, onRemove }: Props) {
    return (
        <div className="flex items-center gap-2 py-1">
            <Checkbox checked={subject.enabled} onChange={onToggle} />
            <span className="flex-1 text-sm">{subject.code}</span>
            <span className="text-xs text-gray-400">{subject.unit.toFixed(1)}</span>
            <Button variant="danger" onClick={onRemove}>remove</Button>
        </div>
    )
}