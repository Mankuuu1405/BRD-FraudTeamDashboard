import { NavLink, useNavigate } from "react-router-dom";
import {
  HiHome,
  HiClipboard,
  HiChartSquareBar,
  HiDocumentText,
  HiCog,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const menu = [
    { name: "Home", icon: HiHome, path: "/" },
    { name: "Cases", icon: HiClipboard, path: "/cases" },
    { name: "Reports", icon: HiDocumentText, path: "/reports" },
    { name: "Analytics", icon: HiChartSquareBar, path: "/analytics" },
    { name: "Settings", icon: HiCog, path: "/settings" },
  ];

  return (
    <div
      className="
        fixed top-0 left-0 z-50
        h-screen w-64
        flex flex-col
        bg-white text-black p-4 shadow-md
      "
    >
      {/* Title + Close (Mobile Only) */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-primary-blue font-bold">Fraud Dashboard</h2>

        {open && (
          <button onClick={() => setOpen(false)} className="md:hidden">
            <IoClose className="text-2xl" />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => open && setOpen(false)}
            className={({ isActive }) =>
              `
              block p-3 rounded-lg flex items-center gap-4 text-base transition
              ${
                isActive
                  ? "bg-primary-blue text-white shadow-sm"
                  : "hover:bg-blue-500 hover:text-white"
              }
              `
            }
          >
            <item.icon className="text-xl" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout pinned at bottom */}
      <button
        onClick={() => {
          open && setOpen(false);
          handleLogout();
        }}
        className="
          mt-4 bg-primary-blue hover:bg-blue-800
          rounded-lg p-3 text-center font-semibold text-white
        "
      >
        Logout
      </button>
    </div>
  );
}
