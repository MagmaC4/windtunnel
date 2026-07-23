import Card from "./Card";

import {ComponentType} from "react";
type GaugeCardProps = {
    title: string;
    value: number;
    GaugeComponent: ComponentType<{value : number}>;
}

export default function GaugeCard({ title, value, GaugeComponent }: GaugeCardProps) {
  return (
    <Card className="flex-1 flex items-center justify-between">
        <div>
            <p className="text-2xl text-gray-500">{title}</p>
            <p className="text-8xl font-bold">
                {/* display value here, if its a decimal then truncate to 0.00 */}
                {value % 1 == 0 ? value : value.toFixed(2)}
            </p>
        </div>
        <GaugeComponent value={value} />
    </Card>
  );
}

