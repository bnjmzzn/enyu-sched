type Variant = "default" | "danger" | "primary"

type Props = {
    onClick?: () => void
    disabled?: boolean
    variant?: Variant
    children: React.ReactNode
    className?: string
}

const variantClasses: Record<Variant, string> = {
    default: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    danger: "border border-gray-300 text-red-500 hover:bg-red-50",
    primary: "bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed",
}

export default function Button({ onClick, disabled, variant = "default", children, className = "" }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`text-xs px-2 py-1 rounded ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    )
}