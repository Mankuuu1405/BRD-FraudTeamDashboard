import { useState } from "react";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-8">
      <h2 className="text-lg font-semibold">Security Settings</h2>

      {/* Update Email */}
      <div className="space-y-3">
        <p className="font-medium text-sm">Change Email</p>
        <div className="flex flex-col sm:flex-row w-1/2 gap-3">
          <input
            type="email"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition p-2 flex-1"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={() => toast.success("Email updated")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Update
          </button>
        </div>
      </div>

      {/* Update Password */}
      <div className="space-y-3">
        <p className="font-medium text-sm">Change Password</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            type="password"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition p-2"
            placeholder="New password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition p-2"
            placeholder="Confirm password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
          />
          <button
            onClick={() =>
              pw1 === pw2
                ? toast.success("Password updated")
                : toast.error("Passwords do not match")
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-1/3"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
