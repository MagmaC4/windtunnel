"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default function RPMChart() {

    const [chartData, setChartData] = useState();

    // api calls to get chart data
    useEffect(() => {


        const res = await fetch('/api/rpm-data');

        if (!res.ok) {
          // res.ok is false for any status outside 200-299 range — catches your 500 case
          console.error('Failed to load chart data');
          setChartData([]); // or some fallback, or leave old data on screen
          return;
        }

        const data = await res.json();
        setChartData(data);



    }, []);








  return (
    <div style={{ width: '100%', maxWidth: 700, height: '70vh', maxHeight: 500, margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis width={40} stroke="#666" />
          <Tooltip
            cursor={{ stroke: '#ccc' }}
            contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            dot={{ fill: '#fff' }}
            activeDot={{ r: 8, stroke: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            dot={{ fill: '#fff' }}
            activeDot={{ stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}