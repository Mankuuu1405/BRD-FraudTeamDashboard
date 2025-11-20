import { useState } from "react";

export default function ReportGenerator({ onGenerate }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-lg font-bold mb-4">Select Date Range</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <button
          onClick={() => onGenerate(from, to)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
