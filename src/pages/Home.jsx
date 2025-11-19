import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

export default function Home() {

  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };


  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);


  const stats = {
    total: 240,
    confirmed: 180,
    pending: 60,
    rejected: 13,
  };

  const barData = [
    { month: "Jan", frauds: 20 },
    { month: "Feb", frauds: 35 },
    { month: "Mar", frauds: 28 },
    { month: "Apr", frauds: 45 },
    { month: "May", frauds: 30 },
    { month: "Jun", frauds: 50 },
  ];

  const pieData = [
    { name: "Confirmed", value: 180, color: "#10b981" },
    { name: "Pending", value: 60, color: "#f59e0b" },
    { name: "Rejected", value: 13, color: "#ef4444" },
  ];

  const [recentCases, setRecentCases] = useState([
    { id: "A1023", applicant: "Rahul Verma", status: "Confirmed", amount: "₹85,000" },
    { id: "A1024", applicant: "Priya Sharma", status: "Pending", amount: "₹45,000" },
    { id: "A1025", applicant: "Amit Yadav", status: "Rejected", amount: "₹30,000" },
    { id: "A1026", applicant: "Neha Singh", status: "Confirmed", amount: "₹60,000" },
  ])

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Welcome, Fraud Analyst 👋</h1>

        <button
          onClick={openProfileModal}
          className="flex items-center bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2 font-bold">
            FA
          </span>
          <span>Fraud Analyst</span>
        </button>

      </div>


      {/* Summary Cards */}
      <SummaryCards
        total={stats.total}
        confirmed={stats.confirmed}
        pending={stats.pending}
        rejected={stats.rejected}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Fraud Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="frauds" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Case Breakdown</h2>
          <div className="h-72 flex justify-center items-center">
            <ResponsiveContainer width="80%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Cases Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Cases</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Case ID</th>
              <th className="py-2">Applicant</th>
              <th className="py-2">Status</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentCases.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{item.id}</td>
                <td>{item.applicant}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-sm rounded-lg ${item.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-80 p-6 relative">
            {/* Close button */}
            <button
              onClick={closeProfileModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              ✕
            </button>

            {/* Profile Info */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                FA
              </div>
              <h2 className="text-xl font-semibold">Fraud Analyst</h2>
              <p className="text-gray-600">fraud.analyst@example.com</p>
              <p className="text-gray-600">Role: Analyst</p>
              <p className="text-gray-600">Department: Fraud Monitoring</p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={closeProfileModal}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
