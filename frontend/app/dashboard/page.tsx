// app/dashboard/page.tsx

"use client"

import { useSensorData } from "@/hooks/useSensorData";
import Card from "@/components/Card";
import GaugeCard from "@/components/GaugeCard";
import StatusBox from "@/components/StatusBox";
import RechartCard from "@/components/RechartCard";
import RPMGauge from "@/components/gauges/RPMGauge";
import WindGauge from "@/components/gauges/WindGauge";
import TempGauge from "@/components/gauges/TempGauge";
import PressureGauge from "@/components/gauges/PressureGauge";

export default function Dashboard() {
    // update sensor values using api function (aka hook)
    const { rpm, airSpeed, temp, pressure } = useSensorData();

return (
    // display Dashboard as grid of these cards
    <div className="grid grid-cols-2 grid-rows-2 gap-4 min-h-screen p-4">
        <Card><StatusBox /></Card>
        <Card><RechartCard /></Card>

        <div className="flex flex-col gap-4">
            <GaugeCard title="Motor RPM" value={rpm} GaugeComponent={RPMGauge} />
            <GaugeCard title="Air Speed (m/s)" value={airSpeed} decimalPlaces={2} GaugeComponent={WindGauge} />
        </div>

        <div className="flex flex-col gap-4">
            <GaugeCard title="Temperature (C)" value={temp} decimalPlaces={2} GaugeComponent={TempGauge} />
            <GaugeCard title="Pressure (MPa)" value={pressure} decimalPlaces={4} GaugeComponent={PressureGauge} />
        </div>
    </div>
  );
}