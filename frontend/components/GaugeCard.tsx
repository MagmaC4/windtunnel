import Card from "./Card";
import Button from "./Button";
import {ComponentType} from "react";
import {useState} from "react";

type Unit = {
  label: string;
  convert: (value: number) => number;
};

type GaugeCardProps = {
    title: string;
    value: number;
    decimalPlaces : number;
    GaugeComponent: ComponentType<{value : number}>;
    units?: Unit[]; // some metrics do not have units (RPM)
}

export default function GaugeCard({ title, value, decimalPlaces, GaugeComponent, units}: GaugeCardProps) {
    // calculate value based on selected unit
    const [unitIndex, setUnitIndex] = useState(0);
    const activeUnit = units?.[unitIndex];
    const displayValue = activeUnit ? activeUnit.convert(value) : value;

    return (
        <Card className="flex-1 flex items-center flex-col lg:flex-row  justify-between">
            <div>
                {/* Title and Unit Conversion */}
                <div className="flex flex-row gap-2">
                    <p className="text-2xl text-center lg:text-left text-title text-nowrap">{title}</p>
                    {/* Only show units button if units are supplied in props */}
                    {units && activeUnit &&
                        (<Button label={activeUnit.label}
                                onClick={() => setUnitIndex((i) => (i + 1) % units.length)}
                                className="min-w-10 bg-zinc-700 border border-zinc-500"/>
                        )
                    }
                </div>
                {/* Value Display */}
                <p className="text-5xl text-center lg:text-left text-foreground md:text-7xl font-bold">
                    {/* if value is a decimal then truncate it */}
                    {displayValue % 1 == 0 ? displayValue : displayValue.toFixed(decimalPlaces)}
                </p>
            </div>
            <GaugeComponent value={displayValue} />
        </Card>
    );
}

