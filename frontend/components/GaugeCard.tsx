import Card from "./Card";
import Button from "./Button";
import Gauge from "./Gauge";
import InfoTooltip from "./InfoTooltip";
import {ComponentType} from "react";
import {useState} from "react";


type Unit = {
  label: string;
  convert: (value: number) => number;
};

type GaugeCardProps = {
    title: string;
    value: number;
    ts: string;
    units?: Unit[]; // some metrics do not have units (RPM)
}

export default function GaugeCard({ title, value, ts, decimalPlaces, units}: GaugeCardProps) {
    // calculate value based on selected unit
    const [unitIndex, setUnitIndex] = useState(0);
    const activeUnit = units?.[unitIndex];
    const decimals = activeUnit ? activeUnit.decimalPlaces : 0;
    const displayValue = activeUnit ? activeUnit.convert(value) : value;

    return (
        <Card className="flex-1 flex items-center flex-col lg:flex-row  justify-between">
            <div>
                {/* Title and Unit Conversion */}
                <div className="flex flex-row gap-2">
                    {/* Title */}
                    <p className="text-2xl text-center lg:text-left text-title text-nowrap">{title}</p>
                    {/* Only show units button if units are supplied in props */}
                    {units && activeUnit &&
                        (<Button label={activeUnit.label}
                            onClick={() => setUnitIndex((i) => (i + 1) % units.length)}
                            className="min-w-20 max-w-20 bg-zinc-700 border border-zinc-500 px-1 "/>
                        )
                    }
                </div>
                {/* Value Display and Info Hover*/}
                <div className="flex flex-row gap-2">
                    {/* Value */}
                    <p className="text-5xl text-center lg:text-left text-foreground md:text-7xl font-bold">
                        {/* if value is a decimal then truncate it */}
                        {displayValue % 1 == 0 ? displayValue : displayValue.toFixed(decimals)}
                    </p>
                    {/* Info Hover */}
                    <InfoTooltip ts={ts}/>
                </div>
            </div>
            <Gauge value={displayValue} activeUnit={activeUnit} />
        </Card>

    );
}

