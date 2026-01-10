import { useState } from "react";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
      <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>

      {/* Update Email */}
      <div className="space-y-3">
        <p className="font-medium text-sm text-gray-700">Change Email</p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            className="border border-gray-300 rounded-lg h-9 px-3 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition w-full"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={() => toast.success("Email updated")}
            className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm"
          >
            Update
          </button>
        </div>
      </div>

      {/* Update Password */}
      <div className="space-y-3">
        <p className="font-medium text-sm text-gray-700">Change Password</p>

        <div className="grid sm:grid-cols-3 gap-3 max-w-xl">
          <input
            type="password"
            className="border border-gray-300 rounded-lg h-9 px-3 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            placeholder="New password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
          />

          <input
            type="password"
            className="border border-gray-300 rounded-lg h-9 px-3 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
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
            className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
