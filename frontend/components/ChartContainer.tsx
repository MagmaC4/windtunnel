import {useState} from "react"
import Chart from "@/components/Chart"
import ChartButtons from "@/components/ChartButtons"

export default function ChartContainer(){
    const [selectedRange, setSelectedRange] = useState("LIVE")
    const [selectedMetric, setSelectedMetric] = useState("RPM")

    return(
        <div className="h-full">
            <ChartButtons
                selectedRange={selectedRange}
                selectedMetric={selectedMetric}
                onRangeSelect={setSelectedRange}
                onMetricSelect={setSelectedMetric}
            />
            <Chart
                selectedRange={selectedRange}
                selectedMetric={selectedMetric}
            />
        </div>
    );
}