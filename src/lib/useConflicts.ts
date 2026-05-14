import { useStore, type Subject } from "./store"

export type Conflict = {
    codeA: string
    codeB: string
    reason: string
}

export type ConflictResult = {
    conflicts: Conflict[]
    conflictKeys: Set<string>
}

function timeToMinutes(time: string): number {
    const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/)
    if (!match) return 0

    let hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    const period = match[3]

    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    return hours * 60 + minutes
}

function findOverlappingDays(a: Subject, b: Subject): string[] {
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

export function useConflicts(): ConflictResult {
    const sections = useStore((s) => s.sections)

    const enabled = sections
        .flatMap((s) => s.subjects)
        .filter((s) => s.enabled)

    const conflicts: Conflict[] = []
    const conflictKeys = new Set<string>()
    const seen = new Set<string>()

    for (let i = 0; i < enabled.length; i++) {
        for (let j = i + 1; j < enabled.length; j++) {
            const a = enabled[i]
            const b = enabled[j]

            const pairKey = [a.id, b.id].sort().join(":")
            if (seen.has(pairKey)) continue
            seen.add(pairKey)

            if (a.code === b.code) {
                conflicts.push({ codeA: a.code, codeB: b.code, reason: `duplicate: ${a.code}` })
                a.schedules.forEach((s) => conflictKeys.add(`${a.id}:${s.day}`))
                b.schedules.forEach((s) => conflictKeys.add(`${b.id}:${s.day}`))
                continue
            }

            const overlappingDays = findOverlappingDays(a, b)
            if (overlappingDays.length === 0) continue

            conflicts.push({
                codeA: a.code,
                codeB: b.code,
                reason: `${a.code} and ${b.code} overlap on ${overlappingDays.join(", ")}`,
            })

            overlappingDays.forEach((day) => {
                conflictKeys.add(`${a.id}:${day}`)
                conflictKeys.add(`${b.id}:${day}`)
            })
        }
    }

    return { conflicts, conflictKeys }
}