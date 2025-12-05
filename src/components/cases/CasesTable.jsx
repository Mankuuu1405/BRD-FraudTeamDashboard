import RiskBadge from "../ui/RiskBadge";
import { Link } from "react-router-dom";

const statusPill = (label, type) => {
  const map = {
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

export default function CasesTable({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="border-b border-gray-200">
              <th className="px-5 py-3 text-left align-middle font-medium">Case ID</th>
              <th className="px-5 py-3 text-left align-middle font-medium">Applicant</th>
              <th className="px-5 py-3 text-left align-middle font-medium">Fraud Score</th>
              <th className="px-5 py-3 text-left align-middle font-medium">AML</th>
              <th className="px-5 py-3 text-left align-middle font-medium">Synthetic ID</th>
              <th className="px-5 py-3 text-left align-middle font-medium">Updated</th>
              <th className="px-5 py-3 text-left align-middle font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 align-middle text-gray-800 font-medium">{item.id}</td>
                <td className="px-5 py-3 align-middle text-gray-700">{item.name}</td>

                <td className="px-5 py-3 align-middle">
                  <div className="inline-block">
                    <RiskBadge score={item.fraudScore} />
                  </div>
                </td>

                <td className="px-5 py-3 align-middle">
                  {item.aml === "HIT"
                    ? statusPill("Sanction Hit", "hit")
                    : statusPill("Clear", "clear")}
                </td>

                <td className="px-5 py-3 align-middle">
                  {item.synthetic === "SUSPECT"
                    ? statusPill("Suspect", "suspect")
                    : statusPill("Clean", "clean")}
                </td>

                <td className="px-5 py-3 align-middle text-gray-500">{item.updated}</td>

                <td className="px-5 py-3 align-middle">
                  <Link
                    to={`/cases/${item.id}`}
                    className="text-primary-blue hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
