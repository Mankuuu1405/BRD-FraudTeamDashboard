export default function ReportSelector({ selected, setSelected }) {
  const types = [
    "Fraud Summary Report",
    "AML Sanction Report",
    "High Risk Applicants",
    "Synthetic ID Report",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Report Type</h2>

      <div className="flex flex-wrap gap-3">
        {types.map((t) => {
          const active = selected === t;

          return (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className={
                active
                  ? "h-9 px-4 rounded-full border border-primary-blue/40 bg-primary-blue/10 text-primary-blue text-sm"
                  : "h-9 px-4 rounded-full border border-gray-200 bg-white text-gray-700 text-sm"
              }
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
