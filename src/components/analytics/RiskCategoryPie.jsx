import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const colorMap = {
  "HIGH RISK": "#ef4444",
  "MEDIUM RISK": "#f59e0b",
  "LOW RISK": "#10b981",
};

export default function RiskCategoryPie({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full min-w-0">
        <h2 className="text-[16px] font-bold text-black mb-6">Risk Category Pie</h2>
        <div className="h-64 flex items-center justify-center text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  // Ensure data labels map properly
  let mappedData = [];
  if (Array.isArray(data)) {
    mappedData = data;
  } else if (typeof data === 'object') {
    mappedData = Object.entries(data).map(([key, value]) => ({ name: key, count: value }));
  }

  const formattedData = mappedData.map(item => {
    let rawName = String(item.name || "").toUpperCase();
    if (rawName === "HIGH") rawName = "HIGH RISK";
    if (rawName === "MEDIUM") rawName = "MEDIUM RISK";
    if (rawName === "LOW") rawName = "LOW RISK";
    if (!rawName.includes("RISK")) rawName = `${rawName} RISK`;

    return {
      name: rawName,
      value: item.value || item.count || 0
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full min-w-0">
      <h2 className="text-[16px] font-bold text-black mb-6">Risk Category Pie</h2>

      <div className="flex-1 flex flex-row items-center h-64 gap-8 px-4">
        {/* PIE CHART */}
        <div className="w-[50%] h-full flex justify-center mt-2 border-r border-transparent">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {formattedData.map((item, i) => (
                  <Cell key={i} fill={colorMap[item.name] || "#cccccc"} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT SIDE LEGEND */}
        <div className="w-[50%] flex flex-col justify-center gap-5">
          {formattedData.map((item, i) => (
            <div key={i} className="flex flex-row justify-between items-center text-[13px]">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-[11px] h-[11px] rounded-[3px] flex-shrink-0"
                  style={{ backgroundColor: colorMap[item.name] || "#cccccc" }}
                ></span>
                <span className="font-medium text-gray-800 tracking-wide">
                  {item.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <span className="font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
