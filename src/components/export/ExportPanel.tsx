import { useExport } from "../../lib/hooks/useExport"
import Button from "../../ui/Button"

type CheckboxRowProps = {
    label: string
    checked: boolean
    onChange: () => void
}

function CheckboxRow({ label, checked, onChange }: CheckboxRowProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={checked} onChange={onChange} className="size-4" />
            <span className="text-sm">{label}</span>
        </label>
    )
}

export default function ExportPanel() {
    const { selection, hasSelection, toggleSelection, handleExportPNG, handleExportText } = useExport()

    return (
        <div className="border-3 border-border rounded-lg bg-white px-4 py-3 flex flex-wrap items-center gap-4">
            <span className="font-semibold text-sm">Export</span>

            <div className="flex flex-wrap items-center gap-4">
                <CheckboxRow label="Table" checked={selection.table} onChange={() => toggleSelection("table")} />
                <CheckboxRow label="Errors" checked={selection.errors} onChange={() => toggleSelection("errors")} />
                <CheckboxRow label="Summary" checked={selection.summary} onChange={() => toggleSelection("summary")} />
                <CheckboxRow label="Course list" checked={selection.courseList} onChange={() => toggleSelection("courseList")} />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <Button variant="secondary" disabled={!hasSelection} onClick={handleExportText}>Copy TXT</Button>
                <Button variant="primary" disabled={!hasSelection} onClick={handleExportPNG}>Export PNG</Button>
            </div>
        </div>
    )
}