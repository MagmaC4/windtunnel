"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";

export default function RechartCard() {

    const [chartData, setChartData] = useState([]);

    // Define API Call function
    // Call function on an interval
    useEffect(() => {
        // function that
        const fetchChartRpm = async () => {

            try {
                const res = await fetch('/api/rpm/chart-recent');
                // check for api errors
                if (!res.ok) {
                  console.error('Failed to load chart data');
                  setChartData([]);
                  return;
                }
                const data = await res.json();
                setChartData(data);
            } catch (error) {
                console.error('Network error:', error);
                setChartData([]);

            }
        }

        fetchChartRpm(); // first fetch
        const interval = setInterval(fetchChartRpm, 1000) // repeat api calls
        return () => clearInterval(interval) // cleanup on unmount

    }, []);

  return (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      focus: 'outline-none'
    }}
  >
    <div style={{ width: '90%', height: '90%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          <XAxis dataKey="name" stroke="#666" interval={47}/>
          <YAxis
            width={40}
            stroke="#666"
            domain={[0, 2400]}
          />
          <Tooltip
            cursor={{ stroke: '#ccc' }}
            contentStyle={{
              backgroundColor: '#fff',
              borderColor: '#ccc',
            }}
            labelStyle={{ color: '#000' }}   // the top line (your "name"/timestamp)
            itemStyle={{ color: '#000' }}    // each data line below (e.g. "rpm: 4200")
          />
          <Legend />
          <Line
            type="linear"
            dataKey="rpm"
            stroke="#818cf8"
            strokeWidth={3}
            dot={false}
            activeDot={{ stroke: '#fff' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
</div>
  );
}