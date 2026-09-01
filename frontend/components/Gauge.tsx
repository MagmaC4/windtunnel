// Dashboard Gauge

"use client"; // gauge requires browser, so use client here

import { useEffect, useRef, useState } from "react";
import { useTheme } from 'next-themes'

type Unit = {
  label: string;
  convert: (value: number) => number;
};

type GaugeProps = {
  value: number;
  activeUnit?: Unit;
};

type GaugeUnitConfig = {
  min: number;
  max: number;
  labels: number[];
  divisions: [major: number, minor: number];
  fractionDigits: number;
};

const UNIT_CONFIG: Record<string, GaugeUnitConfig> = {
  default: {
    min: 0,
    max: 100,
    labels: [0, 20, 40, 60, 80, 100],
    divisions: [5, 4],
    fractionDigits: 0,
  },
  RPM: {
    min: 0,
    max: 1500,
    labels: [0, 250, 500, 750, 1000, 1250, 1500],
    divisions: [6, 3],
    fractionDigits: 0,
  },
  "m/s": {
    min: 0,
    max: 50,
    labels: [0, 10, 20, 30, 40, 50],
    divisions: [5, 4],
    fractionDigits: 0,
  },
  mph: {
    min: 0,
    max: 120,
    labels: [0, 20, 40, 60, 80, 100, 120],
    divisions: [6, 4],
    fractionDigits: 0,
  },
  C: {
    min: 0,
    max: 100,
    labels: [0, 20, 40, 60, 80, 100],
    divisions: [5, 4],
    fractionDigits: 0,
  },
  F: {
    min: 0,
    max: 100,
    labels: [0, 20, 40, 60, 80, 100],
    divisions: [5, 4],
    fractionDigits: 0,
  },
  MPa: {
    min: 0.095,
    max: 0.105,
    labels: [0.095, 0.097, 0.099, 0.101, 0.103, 0.105],
    divisions: [5, 3],
    fractionDigits: 3,
  },
  kPa: {
    min: 95,
    max: 105,
    labels: [95, 97, 99, 101, 103, 105],
    divisions: [5, 3],
    fractionDigits: 0,
  },
  atm: {
    min: 0.94,   // corrected: was inconsistent with MPa/kPa range above
    max: 1.04,
    labels: [0.94, 0.96, 0.98, 1.0, 1.02, 1.04],
    divisions: [5, 3],
    fractionDigits: 2,
  },
};

function getUnitConfig(label?: string): GaugeUnitConfig {
  return UNIT_CONFIG[label ?? "default"] ?? UNIT_CONFIG["default"];
}

// Find the css color from theme variables
function getCSSVar(name : string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// Static visual options that never change (angle, colors, ticks, etc).
function buildGaugeOptions(labels: number[], fractionDigits : number, divisions : number[]) {
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
      fractionDigits,
    },
    limitMax: false,
    limitMin: false,
    colorStart: getCSSVar('--gauge-start'),
    colorStop: getCSSVar('--gauge-stop'),
    strokeColor: "#EEEEEE",
    generateGradient: true,
    highDpiSupport: true,
    renderTicks: {
      divisions: divisions[0],
      divWidth: 1.1,
      divLength: 0.7,
      divColor: "#333333",
      subDivisions: divisions[1],
      subLength: 0.5,
      subWidth: 0.6,
      subColor: "#666666",
    },
  };
}

const DEFAULT_ANIMATION_SPEED = 32;

export default function Gauge({ value, activeUnit }: GaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gaugeRef = useRef<any>(null);
  const { theme, resolvedTheme } = useTheme();

  // ===================================================================
  // Create Gauge on mount
  useEffect(() => {
    if (!canvasRef.current) return;

    const raf = requestAnimationFrame(() => {
        import("gaugeJS").then(({ Gauge }) => {
          if (!canvasRef.current) return;

          const { min, max, labels, divisions, fractionDigits } = getUnitConfig(activeUnit?.label);

          const gauge = new Gauge(canvasRef.current).setOptions(buildGaugeOptions(labels, fractionDigits, divisions));
          gauge.setMinValue(min);
          gauge.maxValue = max;
          gauge.animationSpeed = DEFAULT_ANIMATION_SPEED;
          gauge.set(min); // start at the current value, no 0-sweep on first paint

          gaugeRef.current = gauge;

          console.log("created gauge with value: " + value + " min: " + min + " max: " + max + " labels " + labels);
        });
    });
  }, []);

  // ===================================================================
  // 2. Update gauge range, labels, and other parameters on unit change
  useEffect(() => {
    if (!gaugeRef.current) return;

    const raf = requestAnimationFrame(() => {
        const { min, max, labels, divisions, fractionDigits } = getUnitConfig(activeUnit?.label);

        const gauge = gaugeRef.current;
        gauge.setMinValue(min);
        gauge.maxValue = max;
        gauge.setOptions(buildGaugeOptions(labels, fractionDigits, divisions)); // resets gauge's internal value to 0

        // Jump straight to the correct value instead of visibly animating 0 -> value.
        // This prevents a visual bug when editing gauge options on the fly
        const restoreSpeed = gauge.animationSpeed;
        gauge.animationSpeed = 1;
        gauge.set(value === 0 ? 0.0001 : value);
        requestAnimationFrame(() => {
          gauge.animationSpeed = restoreSpeed;
        });
    });

    console.log("updated gauge");
  }, [activeUnit, theme, resolvedTheme]);

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