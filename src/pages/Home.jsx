import StatCard from "../components/dashboard/StatCard";
import { 
  HiShieldExclamation, 
  HiUserGroup, 
  HiCreditCard, 
  HiDocumentText,
  HiCurrencyRupee
} from "react-icons/hi";

export default function Home() {
  const highRiskApplicants = [
    { id: "CASE-1001", name: "Ravi Sharma", score: 82, aml: "HIT", status: "REVIEW" },
    { id: "CASE-1002", name: "Aman Verma", score: 76, aml: "CLEAR", status: "PENDING" },
    { id: "CASE-1003", name: "Sameer Khan", score: 91, aml: "HIT", status: "REVIEW" },
  ];

  const alerts = [
    { type: "AML Match", detail: "Applicant matched PEP list", time: "2m ago" },
    { type: "High Fraud Score", detail: "Fraud score > 80 detected", time: "15m ago" },
    { type: "Document Mismatch", detail: "Aadhaar and PAN did not match", time: "1h ago" },
  ];

  return (
    <div className="space-y-6">

      {/* Top Engine Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

        <StatCard
          title="Fraud Score"
          value="78%"
          subtext="Updated 2 mins ago"
          icon={HiShieldExclamation}
          trend="+12.5%"
        />

        <StatCard
          title="Synthetic ID Alerts"
          value="12"
          subtext="3 new today"
          icon={HiUserGroup}
          trend="+8.2%"
        />

        <StatCard
          title="AML Hits"
          value="5"
          subtext="1 unresolved"
          icon={HiCreditCard}
          trend="+15.3%"
        />

        <StatCard
          title="Behavioral Flags"
          value="18"
          subtext="Detected this week"
          icon={HiDocumentText}
          trend="+22.1%"
        />

        <StatCard
          title="Pattern Matches"
          value="4"
          subtext="High-risk patterns found"
          icon={HiCurrencyRupee}
          trend="+5.7%"
        />

      </div>

      {/* Today Summary Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium">Total Cases Today</p>
          <p className="text-3xl font-bold mt-2 text-gray-800">142</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium">High Risk Cases</p>
          <p className="text-3xl font-bold mt-2 text-red-600">37</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-medium">AML Hits</p>
          <p className="text-3xl font-bold mt-2 text-yellow-600">12</p>
        </div>
      </div>

      {/* High Risk Applicants  */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">High Risk Applicants</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 font-semibold text-gray-600">Case ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Fraud Score</th>
                <th className="px-6 py-4 font-semibold text-gray-600">AML</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>

            <tbody>
              {highRiskApplicants.map((a) => (
                <tr key={a.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">{a.id}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{a.name}</td>
                  <td className="px-6 py-4 font-bold text-red-600">{a.score}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      a.aml === "HIT" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {a.aml}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts  */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Recent Alerts</h2>
        </div>

        <div className="p-6 space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-semibold text-gray-800">{alert.type}</p>
                <p className="text-sm text-gray-500 mt-1">{alert.detail}</p>
              </div>
              <span className="text-gray-400 text-xs whitespace-nowrap ml-4">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph Placeholder  */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Fraud Score Distribution</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm">Chart will be added here.</p>
        </div>
      </div>

    </div>
  );
}