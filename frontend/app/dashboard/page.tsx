import { useSensorData } from "@/hooks/useSensorData";
import Card from "@/components/Card";
import GaugeCard from "@/components/GaugeCard";
import StatusBox from "@/components/StatusBox";
import RechartCard from "@/components/RechartCard";
import RpmGauge from "@/components/gauges/RpmGauge";
import WindGauge from "@/components/gauges/WindGauge";
import TempGauge from "@/components/gauges/TempGauge";
import PressureGauge from "@/components/gauges/PressureGauge";

export default function Dashboard() {
  const { rpm, windSpeed, temp, pressure } = useSensorData();

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen p-4">
      <Card><StatusBox /></Card>
      <Card><RechartCard rpm={rpm} temp={temp} /></Card>

      <div className="flex flex-col gap-4">
        <GaugeCard title="RPM" value={rpm} GaugeComponent={RpmGauge} />
        <GaugeCard title="Wind Speed" value={windSpeed} GaugeComponent={WindGauge} />
      </div>

      <div className="flex flex-col gap-4">
        <GaugeCard title="Temp" value={temp} GaugeComponent={TempGauge} />
        <GaugeCard title="Pressure" value={pressure} GaugeComponent={PressureGauge} />
      </div>
    </div>
  );
}