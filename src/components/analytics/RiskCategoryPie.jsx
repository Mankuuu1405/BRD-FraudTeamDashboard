import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function RiskCategoryPie() {
  const data = [
    { name: "High Risk", value: 22, range: "75–100" },
    { name: "Medium Risk", value: 38, range: "40–74" },
    { name: "Low Risk", value: 40, range: "0–39" },
  ];

  const COLORS = ["#dc2626", "#facc15", "#16a34a"];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Risk Category Breakdown</h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* PIE CHART */}
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RANGE LEGEND */}
        <div className="space-y-3 text-sm w-full lg:w-1/2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-gray-600">Score Range: {item.range}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
