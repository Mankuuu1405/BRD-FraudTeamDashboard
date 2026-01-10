import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AMLTrendChart() {
  const data = [
    { day: "Mon", hits: 1 },
    { day: "Tue", hits: 3 },
    { day: "Wed", hits: 2 },
    { day: "Thu", hits: 1 },
    { day: "Fri", hits: 4 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        AML Sanction Hits (Weekly)
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="hits"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
