import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  // Profile info
  const [name] = useState("Fraud Analyst");
  const [email, setEmail] = useState("analyst@example.com");

  // Account Settings
  const [password, setPassword] = useState("********");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // Profile modal toggle
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Handlers
  const handleUpdateEmail = () => toast.success(`Email updated to ${email}`);
  const handleUpdatePassword = () => {
    if (!newPassword) return toast.error("Password cannot be empty");
    setPassword("*".repeat(newPassword.length));
    setNewPassword("");
    toast.success("Password updated successfully");
  };
  const handleLogout = () => toast.success("Logged out successfully");

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header with profile */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center uppercase">
              {name.split(" ")[0][0]}
            </div>
            <span className="font-medium">{name}</span>
          </button>


          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-50">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl uppercase">
                  {name.split(" ")[0][0]}
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Account Settings
        </h2>

        {/* Email Update */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleUpdateEmail}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Email
          </button>
        </div>

        {/* Password Update */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
          />
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <button
            onClick={handleUpdatePassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </div>
      </div>


    </div>
  );
}
