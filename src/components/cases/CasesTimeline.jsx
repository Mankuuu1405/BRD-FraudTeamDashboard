export default function CaseTimeline({ stage }) {
  const steps = [
    "Eligibility",
    "KYC",
    "Fraud Check",
    "AML",
    "Underwriting",
    "Document Execution",
    "Disbursement",
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-lg font-bold mb-3">Case Progress</h2>

      <div className="flex items-center gap-4 overflow-x-auto">
        {steps.map((step, index) => {
          const completed = index < stage;
          const current = index === stage;

          return (
            <div key={step} className="flex items-center">
              {/* Step Dot */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center 
                ${completed ? "bg-green-600 border-green-600 text-white" : ""}
                ${current ? "bg-blue-600 border-blue-600 text-white" : ""}`}
              >
                {completed ? "✓" : current ? "●" : ""}
              </div>

              <p
                className={`ml-2 text-sm ${
                  completed || current ? "font-semibold text-gray-900" : "text-gray-500"
                }`}
              >
                {step}
              </p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="w-12 h-[2px] bg-gray-300 mx-4"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
