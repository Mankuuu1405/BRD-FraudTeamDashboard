import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Header from "./components/layout/Header";

import Home from "./pages/Home";
import Cases from "./pages/Cases";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import CaseDetails from "./pages/CaseDetails";

import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import RolesPermissions from "./pages/RolesPermissions";
import NotAuthorized from "./pages/NotAuthorized";
import { HiMenu } from "react-icons/hi";

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideSidebarRoutes = ["/login", "/forgot-password", "/signup", "/"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  const handleSignUp = (data) => {
    localStorage.setItem("newUser", JSON.stringify(data));
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-100 flex">

        {!hideSidebar && (
          <>
            {sidebarOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                <div
                  className="absolute inset-0 bg-black opacity-50"
                  onClick={() => setSidebarOpen(false)}
                ></div>

                <div className="relative w-64 h-full bg-white shadow-xl">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                </div>
              </div>
            )}

            <div className="hidden md:block md:w-64 bg-white shadow-lg">
              <Sidebar open={false} setOpen={setSidebarOpen} />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col min-w-0">

          {!hideSidebar && (
            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden p-2 m-2 rounded bg-gray-200 w-fit ${
                sidebarOpen ? "hidden" : ""
              }`}
            >
              <HiMenu className="text-2xl" />
            </button>
          )}

          {!hideSidebar && <Header />}

          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            <Routes>

              <Route path="/" element={<SignUp onSignUp={handleSignUp} />} />
              <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute pageName="Dashboard">
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cases"
                element={
                  <ProtectedRoute pageName="Cases">
                    <Cases />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cases/:caseId"
                element={
                  <ProtectedRoute pageName="CaseDetails">
                    <CaseDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reports"
                element={
                  <ProtectedRoute pageName="Reports">
                    <Reports />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute pageName="Analytics">
                    <Analytics />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute pageName="Settings">
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/roles"
                element={
                  <ProtectedRoute pageName="RolesPermissions">
                    <RolesPermissions />
                  </ProtectedRoute>
                }
              />

              <Route path="/not-authorized" element={<NotAuthorized />} />

            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
