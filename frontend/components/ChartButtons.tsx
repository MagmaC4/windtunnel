// row of buttons that choose data type
// row of buttons that choose timescale to view chart

import Button from "@/components/Button";

const TIME_RANGES = ["LIVE", "1H", "1D", "1W", "1MO", "6MO", "1Y"];
const METRICS = ["RPM", "Air Speed", "Temp", "Pressure"]

type ChartButtonsProps = {
    selectedRange: string;
    selectedMetric: string;
    onRangeSelect: (range: string) => void;
    onMetricSelect: (range: string) => void;
}

export default function ChartButtons({selectedRange, selectedMetric, onRangeSelect, onMetricSelect} : ChartButtonsProps){

    return(
        <div className="flex flex-col gap-1 mx-6">
            <div className="flex flex-row gap-1">
                {/* Add 1 button for every time range */}
                {METRICS.map(r => (
                    <Button key={r} label={r} onClick={() => onMetricSelect(r)}
                        /* Change button appearance for selected range */
                        className={selectedMetric === r ? "bg-button-selected" : "bg-button"}
                    />
                ))}
            </div>
            <div className="flex flex-row gap-1">
                {/* Add 1 button for every time range */}
                {TIME_RANGES.map(r => (
                    <Button key={r} label={r} onClick={() => onRangeSelect(r)}
                        /* Change button appearance for selected range */
                        className={selectedRange === r ? "bg-button-selected" : "bg-button"}
                    />
                ))}
            </div>
        </div>
    );
}