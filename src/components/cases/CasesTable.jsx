import RiskBadge from "../ui/RiskBadge";
import { Link } from "react-router-dom";

export default function CasesTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3">Case ID</th>
            <th>Applicant</th>
            <th>Fraud Score</th>
            <th>AML</th>
            <th>Synthetic ID</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="py-3">{item.id}</td>
              <td>{item.name}</td>

              <td>
                <RiskBadge score={item.fraudScore} />
              </td>

              <td>
                {item.aml === "HIT" ? (
                  <span className="text-red-600 font-semibold">Sanction Hit</span>
                ) : (
                  <span className="text-green-600">Clear</span>
                )}
              </td>

              <td>
                {item.synthetic === "SUSPECT" ? (
                  <span className="text-red-600 font-semibold">Suspect</span>
                ) : (
                  <span className="text-green-600">Clean</span>
                )}
              </td>

              <td>{item.updated}</td>

              <td>
                <Link
                  to={`/cases/${item.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
