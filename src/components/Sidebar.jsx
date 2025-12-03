import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const menu = [
    { name: "Home", icon: HomeIcon, path: "/home" },
    { name: "Cases", icon: ClipboardDocumentListIcon, path: "/cases" },
    { name: "Reports", icon: DocumentTextIcon, path: "/reports" },
    { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 z-50
        h-screen w-64 flex flex-col
        bg-white border-r border-gray-200
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <ShieldCheckIcon className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Fraud Dashboard
            </h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Mobile close */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => open && setOpen(false)}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100 font-normal"
              }
              `
            }
          >
            <item.icon className="h-6 w-6 flex-shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="px-4 pb-6 border-t border-gray-200 pt-4">
        <button
          onClick={() => {
            open && setOpen(false);
            handleLogout();
          }}
          className="
            flex items-center gap-3 px-3 py-2.5 w-full
            text-red-600 hover:bg-red-50 rounded-lg 
            text-sm font-normal transition-colors
          "
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
