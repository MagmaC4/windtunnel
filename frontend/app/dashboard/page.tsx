// dashboard/page.tsx

"use client"

import { useSensorData } from "@/hooks/useSensorData";
import Card from "@/components/Card";
import StatusBox from "@/components/StatusBox";
import ChartContainer from "@/components/ChartContainer"
import GaugeCard from "@/components/GaugeCard";

const RPM_UNITS = [
    { label: 'RPM', convert: (v: number) => v }
];

const AIR_SPEED_UNITS = [
    { label: 'm/s', convert: (v: number) => v },
    { label: 'mph', convert: (v: number) => v * 2.23694 }
];

const TEMP_UNITS = [
    { label: 'C', convert: (v: number) => v },
    { label: 'F', convert: (v: number) => v * 9 / 5 + 32 }
];

const PRESSURE_UNITS = [
    { label: 'MPa', convert: (v: number) => v },
    { label: 'kPa', convert: (v: number) => v * 1000 },
    { label: 'atm', convert: (v: number) => v * 9.86923 }
];

export default function Dashboard() {
    // update sensor values using api function (aka hook)
    const { rpm, airSpeed, temp, pressure } = useSensorData();

return (
    // display Dashboard as grid of cards
    <div className="grid grid-cols-2  gap-4 min-h-screen p-4">
        {/* Wind Tunnel Running Status */}
        <Card className="col-span-2 lg:col-span-1"><StatusBox /></Card>
        {/* Historical Data Chart */}
        <Card className="col-span-2 lg:col-span-1 min-h-[375px]"><ChartContainer/></Card>

        {/* RPM and Air Speed Gauges */}
        <div className="flex flex-col gap-4">
            <GaugeCard title="Motor" value={rpm} decimalPlaces={0} units={RPM_UNITS}/>
            <GaugeCard title="Air Speed" value={airSpeed} decimalPlaces={3} units={AIR_SPEED_UNITS}/>
        </div>

        {/* Temperature and Pressure Gauges */}
        <div className="flex flex-col gap-4">
            <GaugeCard title="Temperature" value={temp} decimalPlaces={2} units={TEMP_UNITS}/>
            <GaugeCard title="Pressure" value={pressure} decimalPlaces={5} units={PRESSURE_UNITS}/>
        </div>
    </div>
  );
}