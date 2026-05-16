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
        <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
    )
}