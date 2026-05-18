import { useStore, type Course } from "../store/appStore"
import { timeToMinutes } from "../time"

export type Issue = {
    id: string
    message: string
}

export type ValidationResult = {
    issues: Issue[]
    hasIssues: boolean
    conflictKeys: Set<string>
}

function findOverlappingDays(a: Course, b: Course): string[] {
    const days: string[] = []

    for (const sa of a.schedules) {
        for (const sb of b.schedules) {
            if (sa.day !== sb.day) continue

            const aStart = timeToMinutes(sa.start)
            const aEnd = timeToMinutes(sa.end)
            const bStart = timeToMinutes(sb.start)
            const bEnd = timeToMinutes(sb.end)

            if (aStart < bEnd && bStart < aEnd && !days.includes(sa.day)) {
                days.push(sa.day)
            }
        }
    }

    return days
}

export function useValidation(): ValidationResult {
    const { sections, maxUnits } = useStore()

    const enabled = sections.flatMap((s) => s.courses).filter((c) => c.enabled)

    const totalUnits = enabled.reduce((sum, c) => sum + c.unit, 0)
    const issues: Issue[] = []
    const conflictKeys = new Set<string>()
    const seen = new Set<string>()

    if (totalUnits > maxUnits) {
        issues.push({
            id: "over-limit",
            message: `UNIT LIMIT REACHED (${totalUnits.toFixed(1)} / ${maxUnits})`,
        })
    }

    for (let i = 0; i < enabled.length; i++) {
        for (let j = i + 1; j < enabled.length; j++) {
            const a = enabled[i]
            const b = enabled[j]

            const pairKey = [a.id, b.id].sort().join(":")
            if (seen.has(pairKey)) continue
            seen.add(pairKey)

            if (a.code === b.code) {
                issues.push({ id: pairKey, message: `DUPLICATE: ${a.code}` })
                a.schedules.forEach((s) => conflictKeys.add(`${a.id}:${s.day}`))
                b.schedules.forEach((s) => conflictKeys.add(`${b.id}:${s.day}`))
                continue
            }

            const overlappingDays = findOverlappingDays(a, b)
            if (overlappingDays.length === 0) continue

            issues.push({
                id: pairKey,
                message: `OVERLAP: ${a.code} and ${b.code} on ${overlappingDays.join(", ")}`,
            })

            overlappingDays.forEach((day) => {
                conflictKeys.add(`${a.id}:${day}`)
                conflictKeys.add(`${b.id}:${day}`)
            })
        }
    }

    return { issues, conflictKeys, hasIssues: issues.length > 0 }
}