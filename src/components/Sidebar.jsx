import { NavLink, useNavigate } from "react-router-dom";
import {
  HiHome,
  HiClipboard,
  HiChartSquareBar,
  HiDocumentText,
  HiCog,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const menu = [
    { name: "Home", icon: HiHome, path: "/home" },
    { name: "Cases", icon: HiClipboard, path: "/cases" },
    { name: "Reports", icon: HiDocumentText, path: "/reports" },
    { name: "Analytics", icon: HiChartSquareBar, path: "/analytics" },
    { name: "Settings", icon: HiCog, path: "/settings" },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 z-50
        h-screen w-64 flex flex-col
        bg-white border-r border-gray-200
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* HEADER LOGO AREA */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        {/* Logo + Text */}
        <div className="flex items-center gap-3">
          {/* Round icon box matching theme */}
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Fraud Dashboard
            </h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Mobile close button */}
        {open && (
          <button onClick={() => setOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
            <IoClose className="text-2xl" />
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
            <item.icon className="text-xl flex-shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
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
          <MdLogout className="text-xl flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}