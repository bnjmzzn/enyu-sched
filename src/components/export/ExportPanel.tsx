import { useExport } from "../../lib/hooks/useExport"
import Button from "../../ui/Button"
import Checkbox from "../../ui/Checkbox"

type CheckboxRowProps = {
    label: string
    checked: boolean
    onChange: () => void
    disabled?: boolean
}

function CheckboxRow({ label, checked, onChange, disabled = false }: CheckboxRowProps) {
    return (
        <label className={`flex items-center gap-2 select-none ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}>
            <Checkbox checked={checked} onChange={onChange} />
            <span className="text-sm">{label}</span>
        </label>
    )
}

export default function ExportPanel() {
    const { selection, toggleSelection, handleExportPNG, handleExportText } = useExport()

    return (
        <div
            className="border-3 border-border rounded-lg bg-white px-4 py-3 flex flex-wrap items-center gap-4 hover:scale-[1.01] transition-transform duration-150 shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
            style={{ animation: "panel-in 0.2s ease forwards" }}
        >
            <span className="font-semibold text-sm">Export</span>

            <div className="flex flex-wrap items-center gap-4">
                <CheckboxRow label="Table" checked={true} onChange={() => {}} disabled />
                <CheckboxRow label="Errors" checked={selection.errors} onChange={() => toggleSelection("errors")} />
                <CheckboxRow label="Summary" checked={selection.summary} onChange={() => toggleSelection("summary")} />
                <CheckboxRow label="Course list" checked={selection.courseList} onChange={() => toggleSelection("courseList")} />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <Button variant="secondary" onClick={handleExportText}>Copy TXT</Button>
                <Button variant="primary" onClick={handleExportPNG}>Export PNG</Button>
            </div>
        </div>
    )
}