export const DEFAULT_MAX_UNITS = 12
export const DEFAULT_SECTION_NAME = "Section 1"
export const DEFAULT_START_HOUR = 7
export const DEFAULT_END_HOUR = 21
export const CELL_HEIGHT = 40
export const ONLINE_ROOM_PREFIX = "VR"
export const TOAST_DURATION_MS = 3000

export const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const
export type Day = typeof DAYS[number]