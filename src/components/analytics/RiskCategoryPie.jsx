import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#10b981"]; // red, yellow, green

export default function RiskCategoryPie({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-4">Risk Category Pie</h2>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Risk Category Pie</h2>

      <div className="flex items-center gap-6">
        
        {/* PIE CHART */}
        <div className="w-1/2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                nameKey="category"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT SIDE LEGEND */}
        <div className="w-1/2 space-y-3">

          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></span>

                <p className="text-gray-700 text-sm font-medium">
                  {item.category}
                </p>
              </div>

              <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
