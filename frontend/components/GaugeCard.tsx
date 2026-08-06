import Card from "./Card";

import {ComponentType} from "react";
type GaugeCardProps = {
    title: string;
    value: number;
    decimalPlaces : number;
    GaugeComponent: ComponentType<{value : number}>;
}

export default function GaugeCard({ title, value, decimalPlaces, GaugeComponent }: GaugeCardProps) {
  return (
    <Card className="flex-1 flex items-center flex-col lg:flex-row  justify-between">
        <div>
            <p className="text-2xl text-title text-nowrap">{title}</p>
            <p className="text-5xl text-foreground md:text-7xl font-bold">
                {/* display value here, if its a decimal then truncate to 0.00 */}
                {value % 1 == 0 ? value : value.toFixed(decimalPlaces)}
            </p>
        </div>
        <GaugeComponent value={value} />
    </Card>
  );
}

