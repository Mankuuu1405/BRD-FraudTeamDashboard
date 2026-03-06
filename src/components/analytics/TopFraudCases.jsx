import React, { useState } from "react";

const topFrauds = [
    { id: "FRA901", applicant: "Rohit Sharma", amount: "₹1,20,000", type: "Loan Fraud", date: "2025-10-05" },
    { id: "FRA902", applicant: "Aditi Mehra", amount: "₹95,000", type: "Identity Theft", date: "2025-10-08" },
    { id: "FRA903", applicant: "Vikas Patel", amount: "₹88,000", type: "Card Fraud", date: "2025-10-12" },
    { id: "FRA904", applicant: "Karan Singh", amount: "₹78,000", type: "Insurance Scam", date: "2025-10-14" },
    { id: "FRA905", applicant: "Riya Kapoor", amount: "₹74,000", type: "Loan Fraud", date: "2025-10-18" },
];

export default function TopFraudCases() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // Convert amount from ₹ string to number for sorting
    const parseAmount = (amt) => Number(amt.replace(/[₹,]/g, ""));

    const handleExportReport = () => {
        try {
            // Use the actual data you're showing
            const data = topFrauds.map((f) => ({
                ID: f.id,
                Applicant: f.applicant,
                Amount: f.amount,
                Type: f.type,
                Date: f.date,
            }));

            // Convert JSON → CSV (simple way)
            const headers = Object.keys(data[0]).join(",") + "\n";
            const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
            const csv = headers + rows;

            // Create a downloadable file
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "fraud-report.csv";
            link.click();
            URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Export failed:", err);
        }
    };


    // Filtered data based on search term
    const filteredData = topFrauds.filter(
        (f) =>
            f.id.toLowerCase().includes(search.toLowerCase()) ||
            f.applicant.toLowerCase().includes(search.toLowerCase()) ||
            f.type.toLowerCase().includes(search.toLowerCase())
    );

    // Sorted data based on field and order
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortField) return 0;
        if (sortField === "amount") {
            const valA = parseAmount(a.amount);
            const valB = parseAmount(b.amount);
            return sortOrder === "asc" ? valA - valB : valB - valA;
        } else if (sortField === "date") {
            const valA = new Date(a.date);
            const valB = new Date(b.date);
            return sortOrder === "asc" ? valA - valB : valB - valA;
        }
        return 0;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold">Top Fraud Cases</h2>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by name, ID, or type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        onClick={handleExportReport}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                    >
                        Export Report
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Case ID</th>
                            <th className="p-3">Applicant</th>
                            <th
                                className="p-3 cursor-pointer select-none"
                                onClick={() => handleSort("amount")}
                            >
                                Amount{" "}
                                {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="p-3">Fraud Type</th>
                            <th
                                className="p-3 cursor-pointer select-none"
                                onClick={() => handleSort("date")}
                            >
                                Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((f) => (
                            <tr key={f.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3 font-medium text-gray-800">{f.id}</td>
                                <td className="p-3">{f.applicant}</td>
                                <td className="p-3">{f.amount}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-sm rounded-lg ${f.type === "Loan Fraud"
                                            ? "bg-blue-100 text-blue-700"
                                            : f.type === "Identity Theft"
                                                ? "bg-purple-100 text-purple-700"
                                                : f.type === "Card Fraud"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {f.type}
                                    </span>
                                </td>
                                <td className="p-3">{f.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
