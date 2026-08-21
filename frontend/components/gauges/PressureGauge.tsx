// Dashboard Pressure Gauge

"use client"; // gauge requires browser, so use client here

import { useEffect, useRef, useState } from "react";

type Unit = {
  label: string;
  convert: (value: number) => number;
};

type PressureGaugeProps = {
  value: number;
  activeUnit: Unit;
};

// Gauge parameters per unit
const UNIT_MIN: Record<string, number> = {
  default: 0,
  MPa: 0,
  kPa: 0,
  atm: 0,
};
const UNIT_MAX: Record<string, number> = {
  default: 100,
  MPa: 1.0,
  kPa: 1000,
  atm: 1.0,
};
const UNIT_LABELS: Record<string, number[]> = {
  default: [0, 20, 40, 60, 80, 100],
  MPa: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  kPa: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  atm: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

// Static visual options that never change (angle, colors, ticks, etc).
function buildGaugeOptions(labels: number[]) {
  return {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#ff5757",
    },
    fontSize: 42,
    staticLabels: {
      font: "10px sans-serif",
      labels,
      color: "#808080",
      fractionDigits: 1,
    },
    limitMax: false,
    limitMin: false,
    colorStart: "#6F6EA0",
    colorStop: "#C0C0DB",
    strokeColor: "#EEEEEE",
    generateGradient: true,
    highDpiSupport: true,
    renderTicks: {
      divisions: 5,
      divWidth: 1.1,
      divLength: 0.7,
      divColor: "#333333",
      subDivisions: 4,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: "#666666",
    },
  };
}

const DEFAULT_ANIMATION_SPEED = 32;

export default function PressureGauge({ value, activeUnit }: PressureGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gaugeRef = useRef<any>(null);

  // ===================================================================
  // Create Gauge on mount
  useEffect(() => {
    if (!canvasRef.current) return;

    import("gaugeJS").then(({ Gauge }) => {
      if (!canvasRef.current) return;

      const min = UNIT_MIN[activeUnit.label] ?? UNIT_MIN["default"];
      const max = UNIT_MAX[activeUnit.label] ?? UNIT_MAX["default"];
      const labels = UNIT_LABELS[activeUnit.label] ?? UNIT_LABELS["default"];

      const gauge = new Gauge(canvasRef.current).setOptions(buildGaugeOptions(labels));
      gauge.setMinValue(min);
      gauge.maxValue = max;
      gauge.animationSpeed = DEFAULT_ANIMATION_SPEED;
      gauge.set(value); // start at the current value, no 0-sweep on first paint

      gaugeRef.current = gauge;
    });
  }, []);

  // ===================================================================
  // 2. Update gauge range, labels, and other parameters on unit change
  useEffect(() => {
    if (!gaugeRef.current) return;

    const min = UNIT_MIN[activeUnit.label] ?? UNIT_MIN["default"];
    const max = UNIT_MAX[activeUnit.label] ?? UNIT_MAX["default"];
    const labels = UNIT_LABELS[activeUnit.label] ?? UNIT_LABELS["default"];

    const gauge = gaugeRef.current;
    const restoreSpeed = gauge.animationSpeed;

    gauge.setMinValue(min);
    gauge.maxValue = max;
    gauge.setOptions(buildGaugeOptions(labels)); // resets gauge's internal value to 0

    // Jump straight to the correct value instead of visibly animating 0 -> value.
    // This prevents a visual bug when editing gauge options on the fly
    gauge.animationSpeed = 1;
    gauge.set(value);
    requestAnimationFrame(() => {
      gauge.animationSpeed = restoreSpeed;
    });
  }, [activeUnit]);

  // ===================================================================
  // 3. Update gauge value on value change
  useEffect(() => {
    if (!gaugeRef.current) return;
    gaugeRef.current.set(value);
  }, [value]);

  // gauge display size
  return (
    <canvas
      ref={canvasRef}
      width={250}
      height={180}
      className="w-[140px] h-[120px] md:w-[250px] md:h-[180px]"
    />
  );
}