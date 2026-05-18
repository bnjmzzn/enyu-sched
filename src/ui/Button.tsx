type Variant = "primary" | "secondary" | "default" | "danger"

type Props = {
    onClick?: () => void
    disabled?: boolean
    variant?: Variant
    children: React.ReactNode
    className?: string
}

const variantClasses: Record<Variant, string> = {
    primary: "bg-[var(--color-bootstrap-blue)] text-white hover:brightness-110",
    secondary: "bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:brightness-105",
    default: "border border-[var(--color-border)] bg-white text-[var(--color-body)] hover:bg-[var(--color-page-bg)]",
    danger: "border border-[var(--color-border)] text-red-500 bg-white hover:bg-red-50",
}

export default function Button({ onClick, disabled, variant = "default", children, className = "" }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                text px-3 py-1 rounded-md
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variantClasses[variant]} ${className}`}
            >
            {children}
        </button>
    )
}