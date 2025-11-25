import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    // Dummy email check
    if (email !== "admin@example.com") {
      alert("Email not found");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your email to receive a password reset link
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                Send Reset Link
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Login
              </Link>
            </div>
          </>
        ) : (
          /* Success Message */
          <div className="text-center py-6">
            <AiOutlineCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <p className="text-gray-800 font-semibold text-lg mb-2">
              Reset Link Sent!
            </p>
            <p className="text-gray-500 text-sm">
              Check your email for password reset instructions.
              <br />
              Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}