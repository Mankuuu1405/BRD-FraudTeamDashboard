import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FraudScoreDistribution() {
  const data = [
    { range: "0-20", count: 12 },
    { range: "21-40", count: 30 },
    { range: "41-60", count: 45 },
    { range: "61-80", count: 28 },
    { range: "81-100", count: 18 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Fraud Score Distribution</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
