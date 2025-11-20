import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function RiskCategoryPie() {
  const data = [
    { name: "High Risk", value: 22 },
    { name: "Medium Risk", value: 38 },
    { name: "Low Risk", value: 40 },
  ];

  const COLORS = ["#dc2626", "#facc15", "#16a34a"];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Risk Category Breakdown</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
