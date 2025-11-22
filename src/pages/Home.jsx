import StatCard from "../components/dashboard/StatCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <StatCard
          title="Fraud Score"
          value="78%"
          subtext="Updated 2 mins ago"
        />

        <StatCard
          title="Synthetic ID Alerts"
          value="12"
          subtext="3 new today"
        />

        <StatCard
          title="AML Hits"
          value="5"
          subtext="1 unresolved"
        />

        <StatCard
          title="Behavioral Flags"
          value="18"
          subtext="Detected this week"
        />

        <StatCard
          title="Pattern Matches"
          value="4"
          subtext="High-risk patterns found"
        />

      </div>

      {/* Today Summary Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded-xl">
          <p className="text-sm text-gray-500">Total Cases Today</p>
          <p className="text-2xl font-bold mt-1">142</p>
        </div>

        <div className="bg-white p-4 shadow rounded-xl">
          <p className="text-sm text-gray-500">High Risk Cases</p>
          <p className="text-2xl font-bold mt-1 text-red-600">37</p>
        </div>

        <div className="bg-white p-4 shadow rounded-xl">
          <p className="text-sm text-gray-500">AML Hits</p>
          <p className="text-2xl font-bold mt-1 text-yellow-600">12</p>
        </div>
      </div>

      {/* High Risk Applicants  */}
      <div className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">High Risk Applicants</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Case ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Fraud Score</th>
              <th className="p-2">AML</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {highRiskApplicants.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-2">{a.id}</td>
                <td className="p-2">{a.name}</td>
                <td className="p-2 font-bold text-red-600">{a.score}</td>
                <td className="p-2">{a.aml}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Alerts  */}
      <div className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Recent Alerts</h2>

        <div className="space-y-3 text-sm">
          {alerts.map((alert, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{alert.type}</p>
                <p className="text-gray-500">{alert.detail}</p>
              </div>
              <span className="text-gray-400 text-xs">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph Placeholder  */}
      <div className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Fraud Score Distribution</h2>
        <p className="text-gray-500 text-sm">Chart will be added here.</p>
      </div>

    </div>
  );
}
