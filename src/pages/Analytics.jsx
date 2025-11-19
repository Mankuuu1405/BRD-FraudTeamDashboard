import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";

// Dummy Data
const monthlyFraudData = [
  { month: "Jan", frauds: 25 },
  { month: "Feb", frauds: 40 },
  { month: "Mar", frauds: 32 },
  { month: "Apr", frauds: 45 },
  { month: "May", frauds: 28 },
  { month: "Jun", frauds: 55 },
  { month: "Jul", frauds: 50 },
  { month: "Aug", frauds: 38 },
  { month: "Sep", frauds: 47 },
  { month: "Oct", frauds: 60 },
  { month: "Nov", frauds: 53 },
  { month: "Dec", frauds: 62 },
];

const fraudTypeData = [
  { name: "Identity Theft", value: 45, color: "#3b82f6" },
  { name: "Loan Fraud", value: 30, color: "#f59e0b" },
  { name: "Card Fraud", value: 20, color: "#10b981" },
  { name: "Insurance Scam", value: 10, color: "#ef4444" },
];

const fraudGrowthData = [
  { quarter: "Q1", total: 120 },
  { quarter: "Q2", total: 150 },
  { quarter: "Q3", total: 190 },
  { quarter: "Q4", total: 250 },
];

// KPI Card Component
function KpiCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
      <span className="text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Fraud Analytics Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Fraud Cases" value="240" />
        <KpiCard title="Highest Fraud Month" value="Oct 2025" />
        <KpiCard title="Average Fraud Amount" value="₹48,000" />
        <KpiCard title="Fraud Growth" value="+15%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Fraud Trend - Line Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Fraud Trend</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyFraudData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="frauds" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Growth - Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quarterly Fraud Growth</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fraudGrowthData}>
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fraud Type Distribution - Pie Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Fraud Type Distribution</h2>
        <div className="h-[400px] flex justify-center items-center">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={fraudTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
              >
                {fraudTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
