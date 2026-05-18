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
            className={`
                p-1.5 rounded-md
                transition-transform duration-100
                hover:scale-115 active:scale-90
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                ${className}`}
        >
            <Icon icon={icon} width={size} height={size} />
        </button>
    )
}