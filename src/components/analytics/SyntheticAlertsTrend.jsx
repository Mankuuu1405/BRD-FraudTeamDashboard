import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SyntheticAlertsTrend() {
  const data = [
    { day: "Mon", hits: 2 },
    { day: "Tue", hits: 4 },
    { day: "Wed", hits: 5 },
    { day: "Thu", hits: 1 },
    { day: "Fri", hits: 3 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Synthetic ID Alerts (Weekly)</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hits" stroke="#dc2626" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
