import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FraudScoreDistribution({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full min-w-0">
        <h2 className="text-[16px] font-bold text-black mb-6">Fraud Score Distribution</h2>
        <div className="h-64 flex items-center justify-center text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full min-w-0">
      <h2 className="text-[16px] font-bold text-black mb-6">Fraud Score Distribution</h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <XAxis
              dataKey="bucket"
              axisLine={{ stroke: '#9ca3af' }}
              tickLine={{ stroke: '#9ca3af' }}
              tick={{ fill: '#4b5563', fontSize: 13 }}
            />
            <YAxis
              axisLine={{ stroke: '#9ca3af' }}
              tickLine={{ stroke: '#9ca3af' }}
              tick={{ fill: '#4b5563', fontSize: 13 }}
            />
            <Tooltip cursor={{ fill: '#f1f5f9' }} />
            <Bar dataKey="count" fill="#4f46e5" barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
