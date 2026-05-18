import { useRef, useEffect } from "react"

type Props = {
    checked: boolean
    indeterminate?: boolean
    onChange: () => void
}

export default function Checkbox({ checked, indeterminate = false, onChange }: Props) {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate
    }, [indeterminate])

    return (
        <div className="hover:scale-110 active:scale-90 transition-transform duration-150 cursor-pointer">
            <input
                ref={ref}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="size-4 cursor-pointer"
            />
        </div>
    )
}