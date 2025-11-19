import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Cases from "./pages/Cases";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { HiMenu } from "react-icons/hi";

export default function App() {
  const location = useLocation();

  // ⛔ Hide sidebar on these pages
  const hideSidebarRoutes = ["/login", "/forgot-password"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideSidebar ? (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          {/* Main content */}
          <div className="flex-1 md:ml-64 p-6">
            {/* Hamburger Button (Mobile only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden mb-4 p-2 bg-gray-200 rounded-lg"
            >
              <HiMenu className="text-2xl" />
            </button>

            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cases"
                element={
                  <ProtectedRoute>
                    <Cases />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        // Login & Forgot Password (no sidebar)
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
