import { useState, useEffect } from "react";
import CasesTable from "../components/cases/CasesTable";
import { getCases } from "../api/caseApi";

const riskBadge = (type) => {
  const map = {
    "High Risk": "bg-red-50 text-red-700 border-red-200",
    "Medium Risk": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Low Risk": "bg-green-50 text-green-700 border-green-200",
    "Sanction Hits": "bg-blue-50 text-blue-700 border-blue-200",
    "Synthetic ID Suspects": "bg-purple-50 text-purple-700 border-purple-200",
  };
  return `inline-flex items-center px-3 py-1 rounded-full text-sm border ${map[type]}`;
};

export default function Cases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    getCases().then(setCases);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Cases</h2>

      <div className="flex flex-wrap gap-3">
        <button className={riskBadge("High Risk")}>High Risk</button>
        <button className={riskBadge("Medium Risk")}>Medium Risk</button>
        <button className={riskBadge("Low Risk")}>Low Risk</button>
        <button className={riskBadge("Sanction Hits")}>Sanction Hits</button>
        <button className={riskBadge("Synthetic ID Suspects")}>Synthetic ID Suspects</button>
      </div>

      <CasesTable data={cases} />
    </div>
  );
}
