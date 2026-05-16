export function timeToMinutes(time: string): number {
    const match = time.match(/^(\d{1,2}):(\d{2})(AM|PM)$/)
    if (!match) return 0

    let hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    const period = match[3]

    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    return hours * 60 + minutes
}

export function formatHour(hour: number): string {
    if (hour === 12) return "12pm"
    if (hour > 12) return `${hour - 12}pm`
    return `${hour}am`
}