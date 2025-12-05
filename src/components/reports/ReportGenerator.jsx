import { useState } from "react";

export default function ReportGenerator({ onGenerate }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!from || !to) return alert("Please select both dates");
    setLoading(true);
    onGenerate(from, to, () => setLoading(false));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Date Range</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="h-9 rounded-lg border border-gray-300 px-3 text-sm"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-9 rounded-lg border border-gray-300 px-3 text-sm"
        />

        <button
          onClick={handleGenerate}
          className="h-9 px-3 rounded-lg bg-blue-600 text-white text-sm"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
}
