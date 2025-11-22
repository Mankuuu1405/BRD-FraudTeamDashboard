export default function ReportTable({ data, onExportCSV, onExportPDF }) {
  if (!data.length)
    return <p className="text-gray-500 text-sm">No report generated yet.</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Case ID</th>
            <th>Applicant</th>
            <th>Fraud Score</th>
            <th>AML</th>
            <th>Synthetic ID</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="py-2">{row.id}</td>
              <td>{row.name}</td>
              <td>{row.fraud}%</td>
              <td>{row.aml}</td>
              <td>{row.synthetic}</td>

              <td>
                <span
                  className={
                    row.fraud >= 75
                      ? "text-red-600 font-semibold"
                      : row.fraud >= 40
                      ? "text-yellow-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }
                >
                  {row.fraud >= 75
                    ? "High"
                    : row.fraud >= 40
                    ? "Medium"
                    : "Low"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onExportCSV}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          Export CSV
        </button>

        <button
          onClick={onExportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
