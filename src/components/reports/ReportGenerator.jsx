import { useState } from "react";

export default function ReportGenerator({ onGenerate }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!from || !to) return alert("Please select both dates");

    setLoading(true);

    onGenerate(from, to, () => {
      setLoading(false);
    });
  };

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
          onClick={handleGenerate}
          className="px-4 py-2 bg-primary-blue text-white rounded-lg"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
}
