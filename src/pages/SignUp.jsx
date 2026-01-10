import React, { useState } from "react";
import { ShieldCheckIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function SignUp({ onSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Your signup logic
    onSignUp(formData);

    // Show success banner
    setSuccess("Account created successfully! Redirecting...");

    // Redirect after delay
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="fixed inset-0 bg-white grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-primary-200 bg-white shadow-card p-6 animate-fadeIn">

        {/* ICON + HEADING */}
        <div className="grid place-items-center">
          <div className="h-12 w-12 rounded-full bg-primary-50 grid place-items-center text-primary-600">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>

          <div className="mt-4 text-3xl font-semibold text-gray-900 text-center">
            Create your account
          </div>

          <div className="mt-1 text-sm text-gray-600 text-center">
            Sign up to access your dashboard
          </div>
        </div>

        {/* SUCCESS BANNER */}
        {success && (
          <div className="mt-4 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg p-3 text-sm">
            {success}
          </div>
        )}

        {/* ERROR BANNER */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}


        {/* EMAIL */}
        <label className="block mt-4">
          <div className="text-sm text-gray-900">Email Address</div>
          <div className="mt-1 relative">
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-11 rounded-xl border border-primary-200 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500">
              <EnvelopeIcon className="h-5 w-5" />
            </div>
          </div>
        </label>

        {/* PASSWORD */}
        <label className="block mt-4">
          <div className="text-sm text-gray-900">Password</div>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 w-full h-11 rounded-xl border border-primary-200 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </label>

        {/* CONFIRM PASSWORD */}
        <label className="block mt-4">
          <div className="text-sm text-gray-900">Confirm Password</div>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="mt-1 w-full h-11 rounded-xl border border-primary-200 px-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </label>

        {/* BUTTON */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="h-11 w-full rounded-xl bg-primary-600 hover:bg-primary-700 transition text-white shadow"
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN LINK */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-700">Already have an account? </span>
          <button onClick={() => navigate("/login")} className="text-primary-600">
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
}
