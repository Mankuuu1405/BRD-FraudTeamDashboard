import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const fraudGrowthData = [
  { quarter: "Q1", total: 120 },
  { quarter: "Q2", total: 150 },
  { quarter: "Q3", total: 190 },
  { quarter: "Q4", total: 250 },
];

export default function QuarterlyFraudChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-3">Quarterly Fraud Growth</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fraudGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} Cases`, "Total Fraud"]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
