import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function SyntheticAlertsTrend() {
  const data = [
    { day: "Mon", hits: 2 },
    { day: "Tue", hits: 4 },
    { day: "Wed", hits: 5 },
    { day: "Thu", hits: 1 },
    { day: "Fri", hits: 3 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Synthetic ID Alerts (Weekly)
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

            <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />

            <Tooltip />
            
            <Line
              type="monotone"
              dataKey="hits"
              stroke="#f43f5e"
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
