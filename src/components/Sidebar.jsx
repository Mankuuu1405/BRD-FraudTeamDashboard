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
    { name: "Dashboard", icon: HomeIcon, path: "/home" },
    { name: "Cases", icon: ClipboardDocumentListIcon, path: "/cases" },
    { name: "Reports", icon: DocumentTextIcon, path: "/reports" },
    { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/settings" }
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
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShieldCheckIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Fraud Dashboard</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {open && (
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {menu.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => open && setOpen(false)}
            className={({ isActive }) =>
              `
                w-full flex items-center gap-3 px-4 py-2
                text-base rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-100">
        <button
          onClick={() => {
            open && setOpen(false);
            handleLogout();
          }}
          className="
            w-full flex items-center gap-3 px-4 py-2
            text-base text-red-600 hover:bg-red-50
            rounded-lg transition-colors
          "
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
