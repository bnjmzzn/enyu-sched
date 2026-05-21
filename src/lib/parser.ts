// FORMAT 1: Registration page
// CODE DAY TIME-TIME ROOM [DAY TIME-TIME ROOM...] 3.0 ...noise

// FORMAT 2: Registered subjects page 
// CODE SECTION / Day TIME-TIME ROOM / 3.0 ...noise

// FORMAT 3: Assessment page 
// CODE DESCRIPTION SECTION / DAYABBR TIME-TIME ROOM / 3.0

// NOTE: paste one format at a time; mixing formats in a single input is not supported

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
const CANONICAL_DAYS = new Set(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])

const DAY_ALIASES: Record<string, string> = {
    SUN: "SUN", MON: "MON", TUE: "TUE", WED: "WED", THU: "THU", FRI: "FRI", SAT: "SAT",
    SUNDAY: "SUN", MONDAY: "MON", TUESDAY: "TUE", WEDNESDAY: "WED",
    THURSDAY: "THU", FRIDAY: "FRI", SATURDAY: "SAT",
    SU: "SUN", M: "MON", T: "TUE", W: "WED", TH: "THU", F: "FRI", S: "SAT",
}

function dayRe(): RegExp {
    return /\b(SUN|MON|TUE|WED|THU|FRI|SAT)\b/gi
}

function normalizeDay(raw: string): string | null {
    return DAY_ALIASES[raw.toUpperCase()] ?? null
}

function parseRoom(afterTime: string): string | null {
    const token = afterTime.trim().split(/\s+/)[0]
    if (!token || /^\d+\.\d+$/.test(token)) return null
    return token
}

function extractSchedulesFromSegment(text: string): Schedule[] {
    const schedules: Schedule[] = []
    const matches = [...text.matchAll(dayRe())]

    for (let i = 0; i < matches.length; i++) {
        const seg = text.slice(matches[i].index!, matches[i + 1]?.index ?? text.length)
        const day = normalizeDay(matches[i][0])
        const timeMatch = seg.match(TIME_RANGE_RE)
        if (!day || !timeMatch) continue
        const room = parseRoom(seg.slice(timeMatch.index! + timeMatch[0].length))
        if (!room) continue
        schedules.push({ day, start: timeMatch[1].toUpperCase(), end: timeMatch[2].toUpperCase(), room })
    }

    return schedules
}

function parseInlineFormat(lines: string[]): ParsedCourse[] {
    const stitched: string[] = []

    for (const line of lines) {
        const firstToken = line.split(/[\s\t]/)[0].toUpperCase()
        if (CANONICAL_DAYS.has(firstToken) && stitched.length > 0) {
            stitched[stitched.length - 1] += " " + line
        } else {
            stitched.push(line)
        }
    }

    const results: ParsedCourse[] = []

    for (const line of stitched) {
        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (!codeMatch) continue

        const rest = line.slice(codeMatch[0].length)
        const schedules = extractSchedulesFromSegment(rest)
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

        const firstToken = line.split(/[\s\t]/)[0].toUpperCase()
        const startsWithDay = DAY_ALIASES[firstToken] !== undefined && TIME_RANGE_RE.test(line)

        if (startsWithDay) {
            const day = normalizeDay(firstToken)
            const timeMatch = line.match(TIME_RANGE_RE)
            const afterTime = timeMatch ? line.slice(line.indexOf(timeMatch[0]) + timeMatch[0].length) : ""
            const room = parseRoom(afterTime)
            if (day && timeMatch && room && current) {
                current.schedules.push({
                    day,
                    start: timeMatch[1].toUpperCase(),
                    end: timeMatch[2].toUpperCase(),
                    room,
                })
            }
            continue
        }

        const unitOnlyMatch = line.match(/^(\d+\.\d+)/)
        if (unitOnlyMatch && current && current.unit === 0) {
            current.unit = parseFloat(unitOnlyMatch[1])
            continue
        }

        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (!codeMatch) continue

        if (current && current.schedules.length > 0) results.push(current)
        current = { code: codeMatch[1], unit: 0, schedules: [] }

        const rest = line.slice(codeMatch[0].length)
        const inlineSchedules = extractSchedulesFromSegment(rest)
        const inlineUnit = rest.match(UNIT_RE)

        for (const s of inlineSchedules) current.schedules.push(s)
        if (inlineUnit) current.unit = parseFloat(inlineUnit[1])
    }

    if (current && current.schedules.length > 0) results.push(current)
    return results
}

function detectFormat(lines: string[]): "inline" | "block" {
    for (const line of lines) {
        const firstToken = line.split(/[\s\t]/)[0].toUpperCase()
        if (CANONICAL_DAYS.has(firstToken)) continue
        const codeMatch = line.match(SUBJECT_CODE_RE)
        if (!codeMatch) continue
        const rest = line.slice(codeMatch[0].length)
        if (dayRe().test(rest)) return "inline"
    }
    return "block"
}

export function parseScheduleString(input: string): ParsedCourse[] {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean)
    const results = detectFormat(lines) === "inline" ? parseInlineFormat(lines) : parseBlockFormat(lines)
    return results.filter((c) => c.schedules.length > 0)
}