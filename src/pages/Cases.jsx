import { useState, useEffect } from "react";
import CasesTable from "../components/cases/CasesTable";

export default function Cases() {
  const [cases, setCases] = useState([]);

  // MOCK DATA FOR NOW — Replace with API later
  useEffect(() => {
    setCases([
      {
        id: "CASE-001",
        name: "Ravi Sharma",
        fraudScore: 82,
        aml: "CLEAR",
        synthetic: "SUSPECT",
        updated: "2 min ago",
      },
      {
        id: "CASE-002",
        name: "Aditya Singh",
        fraudScore: 45,
        aml: "HIT",
        synthetic: "CLEAN",
        updated: "10 min ago",
      },
    ]);
  }, []);

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
          High Risk
        </button>

        <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
          Medium Risk
        </button>

        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
          Low Risk
        </button>

        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
          Sanction Hits
        </button>

        <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
          Synthetic ID Suspects
        </button>
      </div>

      <CasesTable data={cases} />
    </div>
  );
}