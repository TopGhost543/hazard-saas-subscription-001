
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    hazard: "Fire Hazard",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    hazard: "Chemical Hazard",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    hazard: "Construction Hazard",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    hazard: "Biological Hazard",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    hazard: "Mechanical Hazard",
    total: Math.floor(Math.random() * 10) + 1,
  },
  
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="hazard"
          stroke="#888888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="total" 
          fill="currentColor"
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

