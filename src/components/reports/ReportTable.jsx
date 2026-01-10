import React from "react";

const statusPill = (label, type) => {
  const map = {
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-green-50 text-green-700 border-green-200",
    hit: "bg-red-50 text-red-700 border-red-200",
    clear: "bg-green-50 text-green-700 border-green-200",
    suspect: "bg-red-50 text-red-700 border-red-200",
    clean: "bg-green-50 text-green-700 border-green-200"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${map[type]}`}>
      {label}
    </span>
  );
};

export default function ReportTable({ data, onExportCSV, onExportPDF }) {
  if (!data.length)
    return <p className="text-gray-500 text-sm">No report generated yet.</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 font-medium text-left">Case ID</th>
              <th className="px-4 py-3 font-medium text-left">Applicant</th>
              <th className="px-4 py-3 font-medium text-left">Fraud Score</th>
              <th className="px-4 py-3 font-medium text-left">AML</th>
              <th className="px-4 py-3 font-medium text-left">Synthetic ID</th>
              <th className="px-4 py-3 font-medium text-left">Risk</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const risk =
                row.fraud >= 75
                  ? statusPill("High", "high")
                  : row.fraud >= 40
                  ? statusPill("Medium", "medium")
                  : statusPill("Low", "low");

              const aml =
                row.aml === "HIT"
                  ? statusPill("Sanction Hit", "hit")
                  : statusPill("Clear", "clear");

              const synthetic =
                row.synthetic === "SUSPECT"
                  ? statusPill("Suspect", "suspect")
                  : statusPill("Clean", "clean");

              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{row.id}</td>
                  <td className="px-4 py-3 text-gray-700">{row.name}</td>
                  <td className="px-4 py-3 text-gray-700">{row.fraud}%</td>
                  <td className="px-4 py-3">{aml}</td>
                  <td className="px-4 py-3">{synthetic}</td>
                  <td className="px-4 py-3">{risk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onExportCSV}
          className="h-7 px-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Export CSV
        </button>

        <button
          onClick={onExportPDF}
          className="h-7 px-2 text-sm rounded-lg bg-red-500 text-white"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
