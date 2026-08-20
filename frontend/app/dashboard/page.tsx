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
    // display Dashboard as grid of these cards
    <div className="grid grid-cols-2  gap-4 min-h-screen p-4">
        {/* Hide chart when screen is small */}
        <Card className="col-span-2 lg:col-span-1"><StatusBox /></Card>
        <Card className="col-span-2 lg:col-span-1 min-h-[375px]"><ChartContainer/></Card>

        <div className="flex flex-col gap-4">
            <GaugeCard title="Motor RPM" value={rpm} decimalPlaces={0} GaugeComponent={RPMGauge} />
            <GaugeCard title="Air Speed (m/s)" value={airSpeed} decimalPlaces={3} GaugeComponent={WindGauge} />
        </div>

        <div className="flex flex-col gap-4">
            <GaugeCard title="Temperature (C)" value={temp} decimalPlaces={2} GaugeComponent={TempGauge} />
            <GaugeCard title="Pressure (MPa)" value={pressure} decimalPlaces={5} GaugeComponent={PressureGauge} />
        </div>
    </div>
  );
}