import { SUBJECT_CODE_RE, SCHEDULE_LINE_RE, UNIT_RE } from "./config"

export type Schedule = {
    day: string
    start: string
    end: string
    room: string
}

export type ParsedSubject = {
    code: string
    unit: number
    schedules: Schedule[]
}

export function parseScheduleString(input: string): ParsedSubject[] {
    const lines = input
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0)

    const results: ParsedSubject[] = []
    let current: ParsedSubject | null = null

    for (const line of lines) {
        const scheduleMatch = line.match(SCHEDULE_LINE_RE)
        const subjectMatch = line.match(SUBJECT_CODE_RE)
        const unitMatch = line.match(UNIT_RE)

        if (scheduleMatch) {
            if (current) {
                if (current.unit === 0) {
                    const unitMatch = line.match(UNIT_RE)
                    if (unitMatch) current.unit = parseFloat(unitMatch[1])
                }
                current.schedules.push({
                    day: scheduleMatch[1].toUpperCase(),
                    start: scheduleMatch[2].toUpperCase(),
                    end: scheduleMatch[3].toUpperCase(),
                    room: scheduleMatch[4].trim(),
                })
            }
            continue
        }

        if (subjectMatch) {
            if (current) results.push(current)

            const unit = unitMatch ? parseFloat(unitMatch[1]) : 0
            current = { code: subjectMatch[1], unit, schedules: [] }

            const rest = line.slice(subjectMatch[0].length).trim()
            const inlineSchedule = rest.match(SCHEDULE_LINE_RE)
            if (inlineSchedule) {
                current.schedules.push({
                    day: inlineSchedule[1].toUpperCase(),
                    start: inlineSchedule[2].toUpperCase(),
                    end: inlineSchedule[3].toUpperCase(),
                    room: inlineSchedule[4].trim(),
                })
            }

            continue
        }
    }

    if (current) results.push(current)

    return results.filter((s) => s.schedules.length > 0)
}