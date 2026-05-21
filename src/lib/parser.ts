// FORMAT 1: Registration page 
// CODE DAY TIME-TIME ROOM [DAY TIME-TIME ROOM...] 3.0 ...noise

// FORMAT 2: Registered subjects page
// CODE SECTION / Day TIME-TIME ROOM / 3.0 ...noise

// FORMAT 3: Assessment page
// CODE DESCRIPTION SECTION / DAYABBR TIME-TIME ROOM / 3.0

export type Schedule = {
    day: string
    start: string
    end: string
    room: string
}

export type ParsedCourse = {
    code: string
    unit: number
    schedules: Schedule[]
}

const SUBJECT_CODE_RE = /^([A-Z]{2,}[A-Z0-9]+)(?:\s|$)/
const TIME_RANGE_RE = /(\d{1,2}:\d{2}(?:AM|PM))\s*-\s*(\d{1,2}:\d{2}(?:AM|PM))/i
const UNIT_RE = /\b(\d+\.\d+)\b/
const F1_DAY_RE = /\b(SUN|MON|TUE|WED|THU|FRI|SAT)\b/gi
const BLOCK_SCHED_RE = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|SUN|MON|TUE|WED|THU|FRI|SAT|SU|TH|M|T|W|F|S)\b.*\d{1,2}:\d{2}(?:AM|PM)/i

const DAY_ALIASES: Record<string, string> = {
    SUN: "SUN", MON: "MON", TUE: "TUE", WED: "WED", THU: "THU", FRI: "FRI", SAT: "SAT",
    SUNDAY: "SUN", MONDAY: "MON", TUESDAY: "TUE", WEDNESDAY: "WED",
    THURSDAY: "THU", FRIDAY: "FRI", SATURDAY: "SAT",
    SU: "SUN", M: "MON", T: "TUE", W: "WED", TH: "THU", F: "FRI", S: "SAT",
}

function normalizeDay(raw: string): string | null {
    return DAY_ALIASES[raw.toUpperCase()] ?? null
}

function parseRoom(afterTime: string): string | null {
    const token = afterTime.trim().split(/\s+/)[0]
    if (!token || /^\d+\.\d+$/.test(token)) return null
    return token
}

function parseInlineFormat(lines: string[]): ParsedCourse[] {
    const results: ParsedCourse[] = []

    for (const line of lines) {
        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (!codeMatch) continue

        const rest = line.slice(codeMatch[0].length)
        const dayMatches = [...rest.matchAll(F1_DAY_RE)]
        if (dayMatches.length === 0) continue

        const schedules: Schedule[] = []

        for (let i = 0; i < dayMatches.length; i++) {
            const seg = rest.slice(dayMatches[i].index!, dayMatches[i + 1]?.index ?? rest.length)
            const day = normalizeDay(dayMatches[i][0])
            const timeMatch = seg.match(TIME_RANGE_RE)
            if (!day || !timeMatch) continue
            const room = parseRoom(seg.slice(timeMatch.index! + timeMatch[0].length))
            if (!room) continue
            schedules.push({ day, start: timeMatch[1].toUpperCase(), end: timeMatch[2].toUpperCase(), room })
        }

        if (schedules.length === 0) continue
        const unitMatch = rest.match(UNIT_RE)
        results.push({ code: codeMatch[1], unit: unitMatch ? parseFloat(unitMatch[1]) : 0, schedules })
    }

    return results
}

function parseBlockFormat(lines: string[]): ParsedCourse[] {
    const results: ParsedCourse[] = []
    let current: ParsedCourse | null = null

    for (const raw of lines) {
        const line = raw.trim()
        if (!line) continue

        if (BLOCK_SCHED_RE.test(line)) {
            const dayToken = line.match(/^(\S+)/)?.[1]
            const day = dayToken ? normalizeDay(dayToken) : null
            const timeMatch = line.match(TIME_RANGE_RE)
            const afterTime = timeMatch ? line.slice(line.indexOf(timeMatch[0]) + timeMatch[0].length) : ""
            const room = parseRoom(afterTime)
            if (day && timeMatch && room && current) {
                current.schedules.push({ day, start: timeMatch[1].toUpperCase(), end: timeMatch[2].toUpperCase(), room })
            }
            continue
        }

        const unitOnlyMatch = line.match(/^(\d+\.\d+)/)
        if (unitOnlyMatch && current && current.unit === 0) {
            current.unit = parseFloat(unitOnlyMatch[1])
            continue
        }

        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (codeMatch) {
            if (current && current.schedules.length > 0) results.push(current)
            current = { code: codeMatch[1], unit: 0, schedules: [] }
            continue
        }
    }

    if (current && current.schedules.length > 0) results.push(current)
    return results
}

function detectFormat(lines: string[]): "inline" | "block" {
    for (const line of lines) {
        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (!codeMatch) continue
        const rest = line.slice(codeMatch[0].length)
        if (F1_DAY_RE.test(rest)) return "inline"
        F1_DAY_RE.lastIndex = 0
    }
    return "block"
}

export function parseScheduleString(input: string): ParsedCourse[] {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean)
    const results = detectFormat(lines) === "inline" ? parseInlineFormat(lines) : parseBlockFormat(lines)
    return results.filter((c) => c.schedules.length > 0)
}