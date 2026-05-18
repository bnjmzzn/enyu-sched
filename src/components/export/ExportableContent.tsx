import ScheduleTable from "../table/ScheduleTable"
import ErrorList from "../summary/ErrorList"
import StatsBar from "../summary/StatsBar"
import CoursePanel from "../summary/CoursePanel"

export default function ExportableContent() {
    return (
        <div data-export-root className="flex flex-col gap-3">
            <div data-export-section="table"><ScheduleTable /></div>
            <div data-export-section="errors"><ErrorList /></div>
            <div data-export-section="summary"><StatsBar /></div>
            <div data-export-section="courselist"><CoursePanel /></div>
        </div>
    )
}