import { Icon } from "@iconify/react"

type Props = {
    icon: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    size?: number
}

export default function IconButton({ icon, onClick, disabled, className = "", size = 18 }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <Icon icon={icon} width={size} height={size} />
        </button>
    )
}