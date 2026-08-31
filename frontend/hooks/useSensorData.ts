"use client";

import { useState, useEffect } from "react";

interface SensorData {
  rpm: number;
  rpm_ts: string;
  airSpeed: number;
  airSpeed_ts: string;
  temp: number;
  temp_ts: string;
  pressure: number;
  pressure_ts: string;
}

export function useSensorData(): SensorData {
  const [data, setData] = useState<SensorData>({
    rpm: 0,
    rpm_ts: "",
    airSpeed: 0,
    airSpeed_ts: "",
    temp: 0,
    temp_ts: "",
    pressure: 0,
    pressure_ts: "",
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/sensors");
      const json: SensorData = await res.json();
      setData(json);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}