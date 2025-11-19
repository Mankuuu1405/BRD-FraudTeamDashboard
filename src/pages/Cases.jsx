import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Cases() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [viewCase, setViewCase] = useState(null); // null when no case is selected


    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // ✅ proper state initialization
    const [cases, setCases] = useState([
        { id: "FRA001", applicant: "Rahul Verma", amount: "₹85,000", status: "Confirmed", date: "2025-10-25" },
        { id: "FRA002", applicant: "Priya Sharma", amount: "₹45,000", status: "Pending", date: "2025-10-26" },
        { id: "FRA003", applicant: "Amit Yadav", amount: "₹30,000", status: "Rejected", date: "2025-10-27" },
        { id: "FRA004", applicant: "Neha Singh", amount: "₹60,000", status: "Confirmed", date: "2025-10-29" },
        { id: "FRA005", applicant: "Vikas Mehra", amount: "₹50,000", status: "Pending", date: "2025-10-30" },
    ]);

    // ✅ delete handler
    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-medium text-gray-800">Are you sure you want to delete this case?</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setCases((prev) => prev.filter((c) => c.id !== id));
                            toast.dismiss(t.id);
                            toast.success("Case deleted successfully!");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                        Yes, delete
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };

    // ✅ filtering + search
    const filteredCases = cases.filter((c) => {
        const matchesSearch = c.applicant.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || c.status === filter;
        return matchesSearch && matchesFilter;
    });

    // ✅ new case state for modal form
    const [newCase, setNewCase] = useState({
        applicant: "",
        amount: "",
        status: "Pending",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCase((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddCase = (e) => {
        e.preventDefault();
        const id = `FRA${Math.floor(100 + Math.random() * 900)}`; // generate random ID
        setCases((prev) => [...prev, { id, ...newCase }]);
        setNewCase({ applicant: "", amount: "", status: "Pending", date: "" }); // reset form
        closeModal();
        toast.success("New case added successfully!");
    };

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Fraud Cases</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    + Add New Case
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search by applicant name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="All">All Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Case ID</th>
                            <th className="p-3">Applicant</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3 font-medium text-gray-800">{c.id}</td>
                                <td className="p-3">{c.applicant}</td>
                                <td className="p-3">{c.amount}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-sm rounded-lg ${c.status === "Confirmed"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : c.status === "Pending"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-3">{c.date}</td>
                                <td className="p-3 text-center space-x-4">
                                    <button onClick={() => setViewCase(c)} className="text-blue-600 hover:underline cursor-pointer">View</button>
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="text-red-600 hover:underline cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCases.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No cases found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">Prev</button>
                <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">2</button>
                <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">Next</button>
            </div>

            {/* Add New Case Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Add New Case</h2>

                        <form className="flex flex-col gap-4" onSubmit={handleAddCase}>
                            <input
                                type="text"
                                name="applicant"
                                placeholder="Applicant Name"
                                value={newCase.applicant}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="text"
                                name="amount"
                                placeholder="Amount (₹)"
                                value={newCase.amount}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <select
                                name="status"
                                value={newCase.status}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Rejected</option>
                            </select>
                            <input
                                type="date"
                                name="date"
                                value={newCase.date}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add Case
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {viewCase && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
                        <button
                            onClick={() => setViewCase(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Case Details</h2>

                        <div className="flex flex-col gap-2">
                            <p><strong>Case ID:</strong> {viewCase.id}</p>
                            <p><strong>Applicant:</strong> {viewCase.applicant}</p>
                            <p><strong>Amount:</strong> {viewCase.amount}</p>
                            <p><strong>Status:</strong> {viewCase.status}</p>
                            <p><strong>Date:</strong> {viewCase.date}</p>
                            {/* Add any extra details here */}
                            <p><strong>Fraud Type:</strong> {viewCase.type || "Loan Fraud"}</p>
                            <p><strong>Description:</strong> {viewCase.description || "N/A"}</p>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setViewCase(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
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
