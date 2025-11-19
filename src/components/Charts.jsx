import React from "react";

export default function Chart() {
  const data = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 28 },
    { month: "Apr", value: 45 },
    { month: "May", value: 30 },
    { month: "Jun", value: 50 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end space-x-4 h-48">
      {data.map((d) => (
        <div key={d.month} className="flex flex-col items-center w-10">
          <div
            className="w-full bg-blue-500 rounded-t-md transition-all duration-300"
            style={{ height: `${(d.value / maxValue) * 100}%` }}
          ></div>
          <span className="text-sm mt-2">{d.month}</span>
        </div>
      ))}
    </div>
  );
}
