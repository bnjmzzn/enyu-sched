import { Icon } from "@iconify/react"

export default function Hero() {
    const features = [
        { icon: "lucide:calendar-days", label: "Visual schedule" },
        { icon: "lucide:triangle-alert", label: "Conflict detection" },
        { icon: "lucide:image-down", label: "Export as PNG" },
    ]

    return (
        <div className="bg-[var(--color-brand)] text-white px-10 pt-10 -mx-10 -mt-10">
            <div className="max-w-lg py-4">
                <h1 className="text-4xl font-extrabold tracking-tight">enyu-sched</h1>
                <p className="text-blue-200 mt-2 text-base">Build and visualize your semester schedule from a string of text</p>

                <div className="flex flex-wrap gap-3 mt-4">
                    {features.map((f) => (
                        <div key={f.label} className="flex items-center gap-1.5 text-blue-200 text-sm">
                            <Icon icon={f.icon} width={13} height={13} />
                            <span>{f.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <svg
                viewBox="0 0 1440 80"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[calc(100%+5rem)] -mx-10 block -mb-px"
                preserveAspectRatio="none"
                style={{ height: 72 }}
            >
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" opacity="0.08" />
                </pattern>
                <rect width="1440" height="80" fill="url(#dots)" />
                <path
                    d="M0,50 C200,20 400,70 600,45 C800,20 1000,65 1200,40 C1320,25 1400,50 1440,45 L1440,80 L0,80 Z"
                    fill="white"
                    opacity="0.06"
                />
                <path
                    d="M0,45 C180,75 360,20 540,50 C720,80 900,15 1080,45 C1260,72 1380,30 1440,45 L1440,80 L0,80 Z"
                    fill="var(--color-page-bg)"
                />
            </svg>
        </div>
    )
}