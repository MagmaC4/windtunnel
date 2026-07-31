// Dashboard RPM Gauge

"use client"; // gauge requires browser, so use client here

import {useEffect, useRef, useState} from "react";
// import {Gauge} from "gaugeJS";

type RPMGaugeProps = {
    value : number;
}

export default function RPMGauge({value} : RPMGaugeProps){

    const canvasRef = useRef(null);
    const gaugeRef = useRef<any>(null);

    // TUTORIAL: useEffect runs code after React has updated the page
    // Brackets [] will trigger useEffect whenever a value inside them changes
    // useEffect is useful for 

    // Create gauge after page first renders
    useEffect(() => {
        // null check, make sure canvas exists
        if (!canvasRef.current) return;

        import("gaugeJS").then(({ Gauge }) => {
            // customize gauge options (visual style)
            const opts = {
                angle: -0.2, // The span of the gauge arc
                lineWidth: 0.2, // The line thickness
                radiusScale: 1, // Relative radius
                pointer: {
                    length: 0.6, // // Relative to gauge radius
                    strokeWidth: 0.035, // The thickness
                    color: '#ff5757' // Fill color
                },
                fontSize: 42,
                staticLabels: {
                    font: "10px sans-serif",  // Specifies font
                    labels: [0, 250, 500, 750, 1000, 1250, 1500],  // Print labels at these values
                    color: "#ffffff",  // Optional: Label text color
                    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
                },
                limitMax: false,     // If false, max value increases automatically if value > maxValue
                limitMin: false,     // If true, the min value of the gauge will be fixed
                colorStart: '#6F6EA0',   // Colors
                colorStop: '#C0C0DB',    // just experiment with them
                strokeColor: '#EEEEEE',  // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true,     // High resolution support
                // renderTicks is Optional
                renderTicks: {
                    divisions: 6,
                    divWidth: 1.1,
                    divLength: 0.7,
                    divColor: '#333333',
                    subDivisions: 3,
                    subLength: 0.5,
                    subWidth: 0.6,
                    subColor: '#666666'
                }

            };

            // create gauge object
            const gauge = new Gauge(canvasRef.current).setOptions(opts);
            gauge.maxValue = 1500;
            gauge.setMinValue(0);
            gauge.animationSpeed = 32;
            gauge.set(0);
            // assign gauge to gaugeRef
            gaugeRef.current = gauge;
        });

    }, []);


    // Update gauge once value changes
    useEffect(() => {
        // null check, make sure gauge exists
        if (!gaugeRef.current) return;
        gaugeRef.current.set(value);
    }, [value]);

    return (
        <canvas 
            ref={canvasRef}
            width={250}
            height={180}
            className="w-[140px] h-[120px] md:w-[250px] md:h-[180px]"
        />
        
    )
}