import React from "react";

export default function SummaryCards({ total, confirmed, pending, rejected }) {
  const stats = [
    { title: "Total Cases", value: total, color: "bg-blue-500" },
    { title: "Confirmed", value: confirmed, color: "bg-emerald-500" },
    { title: "Pending", value: pending, color: "bg-amber-500" },
    { title: "Rejected", value: rejected, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`p-6 rounded-2xl shadow-md text-white ${item.color}`}
        >
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
