export const DEFAULT_MAX_UNITS = 12
export const DEFAULT_SECTION_NAME = "Section 1"
export const DEFAULT_START_HOUR = 7
export const DEFAULT_END_HOUR = 21

export const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const
export type Day = typeof DAYS[number]

export const CELL_HEIGHT = 40

export const SUBJECT_CODE_RE = /^([A-Z]{2,}[A-Z0-9]+)(?:\s|$)/
export const SCHEDULE_LINE_RE =
    /^(SUN|MON|TUE|WED|THU|FRI|SAT)\s+(\d{1,2}:\d{2}(?:AM|PM))\s*-\s*(\d{1,2}:\d{2}(?:AM|PM))\s+(.+?)(?:\s+\d+\.\d+.*)?$/i
export const UNIT_RE = /\b(\d+\.\d+)\b/