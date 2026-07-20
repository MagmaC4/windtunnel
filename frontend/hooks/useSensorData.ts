"use client";

import { useState, useEffect } from "react";

interface SensorData {
  rpm: number;
  airSpeed: number;
  temp: number;
  pressure: number;
}

export function useSensorData(): SensorData {
  const [data, setData] = useState<SensorData>({
    rpm: 0,
    airSpeed: 0,
    temp: 0,
    pressure: 0,
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