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
    danger: "border border-[var(--color-border)] text-white bg-[var(--color-danger)] hover:brightness-90",
}

export default function Button({ onClick, disabled, variant = "default", children, className = "" }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                text px-3 py-1 rounded-md
                transition-transform duration-100
                hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100
                ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    )
}