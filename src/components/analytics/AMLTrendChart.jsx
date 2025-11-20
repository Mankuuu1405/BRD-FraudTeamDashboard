import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AMLTrendChart() {
  const data = [
    { day: "Mon", hits: 1 },
    { day: "Tue", hits: 3 },
    { day: "Wed", hits: 2 },
    { day: "Thu", hits: 1 },
    { day: "Fri", hits: 4 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">AML Sanction Hits (Weekly)</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hits" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
