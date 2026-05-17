type Variant = "label" | "body" | "muted"
type Size = "xs" | "sm" | "base"

type Props = {
    variant?: Variant
    size?: Size
    children: React.ReactNode
    className?: string
}

const variants: Record<Variant, string> = {
    label: "text-[var(--color-body)] font-semibold",
    body:  "text-[var(--color-body)]",
    muted: "text-[var(--color-muted)]",
}

const sizes: Record<Size, string> = {
    xs:   "text-xs",
    sm:   "text-sm",
    base: "text-base",
}

export default function Text({ variant = "body", size = "sm", children, className = "" }: Props) {
    return (
        <span className={`${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    )
}