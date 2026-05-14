import Sidebar from "./components/sidebar/Sidebar"
import ScheduleTable from "./components/table/ScheduleTable"
import StatsBar from "./components/summary/StatsBar"
import ConflictList from "./components/summary/ConflictList"

export default function App() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3">
                <StatsBar />
                <ConflictList />
                <ScheduleTable />
            </div>
        </div>
    )
}