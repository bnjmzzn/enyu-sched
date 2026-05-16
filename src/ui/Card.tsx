type Props = {
    children: React.ReactNode
    className?: string
}

export default function Card({ children, className = "" }: Props) {
    return (
        <div className={`border border-gray-200 rounded p-2 flex flex-col gap-1 ${className}`}>
            {children}
        </div>
    )
}