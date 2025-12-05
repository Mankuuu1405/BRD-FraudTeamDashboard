import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ['#2563eb', '#22c55e', '#f59e0b'];

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  value,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const labelRadius = outerRadius + 26;

  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index]}
      fontSize="12"
      fontWeight="600"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

export default function RiskCategoryPie({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Risk Category Pie
        </h2>
        <p className="text-gray-500 text-sm">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Risk Category Pie
      </h2>

      <div className="flex items-center justify-between gap-8">

        {/* PIE — same container height, bigger chart */}
        <div className="w-2/3 h-64 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart style={{ transform: "scale(1.18)" }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                nameKey="category"
                label={renderLabel}
                labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND (unchanged) */}
        <div className="w-1/3 flex flex-col justify-center space-y-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[i] }}
              ></span>
              <p className="text-gray-700 text-sm font-medium">
                {item.category}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
