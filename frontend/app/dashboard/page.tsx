// dashboard/page.tsx

"use client"

import { useSensorData } from "@/hooks/useSensorData";
import Card from "@/components/Card";
import StatusBox from "@/components/StatusBox";
import ChartContainer from "@/components/ChartContainer"
import GaugeCard from "@/components/GaugeCard";

// gauges
import RPMGauge from "@/components/gauges/RPMGauge";
import WindGauge from "@/components/gauges/WindGauge";
import TempGauge from "@/components/gauges/TempGauge";
import PressureGauge from "@/components/gauges/PressureGauge";

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
            <GaugeCard title="Motor RPM" value={rpm} decimalPlaces={0} GaugeComponent={RPMGauge} />
            <GaugeCard title="Air Speed" value={airSpeed} decimalPlaces={3} GaugeComponent={WindGauge}
                units={[
                    {label : 'm/s', convert: v => v},
                    {label : 'mph', convert: v => v * 2.23694}
                ]}
            />
        </div>

        {/* Temperature and Pressure Gauges */}
        <div className="flex flex-col gap-4">
            <GaugeCard title="Temperature" value={temp} decimalPlaces={2} GaugeComponent={TempGauge}
                units={[
                    {label : 'C', convert: v => v},
                    {label : 'F', convert: v => v * 9/5 + 32}
                ]}
            />
            <GaugeCard title="Pressure" value={pressure} decimalPlaces={5} GaugeComponent={PressureGauge}
                units={[
                    {label : 'MPa', convert: v => v},
                    {label : 'kPa', convert: v => v * 1000},
                    {label : 'atm', convert: v => v * 9.86923}
                ]}
            />
        </div>
    </div>
  );
}