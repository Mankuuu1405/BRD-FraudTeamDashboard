import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheckIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../api/loginApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await loginUser(email, password);

    if (!result || !result.user) {
      setError("Invalid login");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(result.user));

    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-white grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-primary-200 bg-white shadow-card p-6 animate-fadeIn">

        {/* ICON HEADER */}
        <div className="grid place-items-center">
          <div className="h-12 w-12 rounded-full bg-primary-50 grid place-items-center text-primary-600">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>

          <div className="mt-4 text-3xl font-semibold text-gray-900 text-center">
            Login to Your Account
          </div>

          <div className="mt-1 text-sm text-gray-600 text-center">
            Sign in to Fraud Analysis Dashboard
          </div>
        </div>

        {error && (
          <div className="mt-3 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">

          {/* EMAIL INPUT */}
          <label className="block">
            <div className="text-sm text-gray-900">Email</div>
            <div className="mt-1 relative">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-primary-200 px-3 pr-10 
                focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500">
                <EnvelopeIcon className="h-5 w-5" />
              </div>
            </div>
          </label>

          {/* PASSWORD INPUT */}
          <label className="block">
            <div className="text-sm text-gray-900">Password</div>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border border-primary-200 px-3 pr-10
                focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </label>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary-600 hover:bg-primary-700 
            transition text-white shadow"
          >
            Sign In
          </button>

        </form>

        {/* SIGNUP LINK */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-700">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-primary-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
