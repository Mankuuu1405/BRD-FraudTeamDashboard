import { useEffect, useState } from "react";
import { getFraudDashboard } from "../api/fraudDashboardApi";

import StatCard from "../components/dashboard/StatCard";
import {
  ShieldExclamationIcon,
  UserGroupIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const statusBadge = (s) => {
  const map = {
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-300",
    PENDING: "bg-yellow-50 text-yellow-600 border-yellow-300",

    Approved: "bg-green-50 text-green-600 border-green-300",
    APPROVED: "bg-green-50 text-green-600 border-green-300",

    Rejected: "bg-red-50 text-red-600 border-red-300",
    REJECTED: "bg-red-50 text-red-600 border-red-300",

    HIT: "bg-red-50 text-red-600 border-red-300",
    CLEAR: "bg-green-50 text-green-600 border-green-300",

    REVIEW: "bg-primary-blue/10 text-primary-blue border-primary-blue/30",

    Disbursed: "bg-primary-blue/10 text-primary-blue border-primary-blue/30",
    Repaid: "bg-gray-50 text-gray-500 border-gray-300"
  };

  return `inline-flex items-center px-3 py-1 rounded-full text-xs border font-normal ${map[s] || "bg-gray-50 text-gray-500 border-gray-300"}`;
};


export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getFraudDashboard().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const { stats, summary, highRiskApplicants, alerts } = data;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard title="Fraud Score" value={stats.fraudScore} subtext="Updated 2 mins ago" icon={ShieldExclamationIcon} trend={stats.fraudTrend} />
        <StatCard title="Synthetic ID Alerts" value={stats.syntheticAlerts} subtext="3 new today" icon={UserGroupIcon} trend={stats.syntheticTrend} />
        <StatCard title="AML Hits" value={stats.amlHits} subtext="1 unresolved" icon={CreditCardIcon} trend={stats.amlTrend} />
        <StatCard title="Behavioral Flags" value={stats.behavioralFlags} subtext="Detected this week" icon={DocumentTextIcon} trend={stats.behavioralTrend} />
        <StatCard title="Pattern Matches" value={stats.patternMatches} subtext="High-risk patterns found" icon={BanknotesIcon} trend={stats.patternTrend} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Total Cases Today</p>
          <p className="text-3xl font-semibold mt-2 text-gray-900">{summary.totalCases}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 font-medium">High Risk Cases</p>
          <p className="text-3xl font-semibold mt-2 text-red-500">{summary.highRiskCases}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 font-medium">AML Hits</p>
          <p className="text-3xl font-semibold mt-2 text-yellow-500">{summary.amlHitsToday}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-medium">High Risk Applicants</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">Case ID</th>
                <th className="px-5 py-3 font-medium text-gray-500">Name</th>
                <th className="px-5 py-3 font-medium text-gray-500">Fraud Score</th>
                <th className="px-5 py-3 font-medium text-gray-500">AML</th>
                <th className="px-5 py-3 font-medium text-gray-500">Status</th>
              </tr>
            </thead>

            <tbody>
              {highRiskApplicants.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 text-gray-700">{a.id}</td>

                  <td className="px-5 py-3 text-gray-800 font-semibold">
                    {a.name}
                  </td>

                  <td className="px-5 py-3 font-semibold text-red-500">
                    {a.score}
                  </td>

                  <td className="px-5 py-3">
                    <span className={statusBadge(a.aml)}>{a.aml}</span>
                  </td>

                  <td className="px-5 py-3">
                    <span className={statusBadge(a.status)}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-medium">Recent Alerts</h2>
        </div>

        <div className="p-6 space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium">{alert.type}</p>
                <p className="text-sm text-gray-600">{alert.detail}</p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                {alert.time}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
