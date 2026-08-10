import {useState} from "react"
import Chart from "@/components/Chart"
import ChartButtons from "@/components/ChartButtons"

export default function ChartContainer(){
    const [selectedRange, setSelectedRange] = useState("1H")

    return(
        <div className="h-full">
            <ChartButtons
                selectedRange={selectedRange}
                onSelect={setSelectedRange}
            />
            <Chart/>
        </div>
    );
}