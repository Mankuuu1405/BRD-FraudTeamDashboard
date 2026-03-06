export default function ReportSelector({ selected, setSelected, options }) {
  const types = options || [
    "Fraud Summary Report",
    "AML Sanction Report",
    "High Risk Applicants",
    "Synthetic ID Report",
    "All Case Records",
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Select Report Type</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`p-3 rounded-lg border text-sm ${selected === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-50 border-gray-300"
              }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
