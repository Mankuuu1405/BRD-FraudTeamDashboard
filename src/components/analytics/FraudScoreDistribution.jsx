import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function FraudScoreDistribution({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Fraud Score Distribution</h2>
        <p className="text-gray-500 text-sm">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Fraud Score Distribution</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="range" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
