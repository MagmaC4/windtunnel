import Chart from "@/components/Chart"
import ChartButtons from "@/components/ChartButtons"

export default function ChartContainer(){
    return(
        <div className="h-full flex flex-col gap-2">
            <Chart/>
            <ChartButtons/>
        </div>
    );
}