import Card from "./Card";

export default function GaugeCard({ title, value, unit, GaugeComponent }) {
  return (
    <Card className="flex-1 flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">
                {value}
                {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
            </p>
        </div>
        <GaugeComponent value={value} />
    </Card>
  );
}

