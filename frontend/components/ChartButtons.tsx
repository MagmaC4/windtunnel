// row of buttons that choose data type
// row of buttons that choose timescale to view chart

import Button from "@/components/Button";

const TIME_RANGES = ["LIVE", "1H", "1D", "1W", "1MO", "6MO", "1Y"];

type ChartButtonProps = {
    selectedRange: string;
    onSelect: (range: string) => void;
}

export default function ChartButtons({selectedRange, onSelect} : ChartButtonProps){

    return(
        <div className="flex flex-row gap-1 mx-6">
            {/* Add 1 button for every time range */}
            {TIME_RANGES.map(r => (
                <Button key={r} label={r} onClick={() => onSelect(r)}
                    /* Change button appearance for selected range*/
                    className={selectedRange === r ? "bg-indigo-500" : ""}
                />
            ))}
        </div>
    );
}