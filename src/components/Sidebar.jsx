import { NavLink, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdOutlineCases } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const menu = [
    { name: "Home", icon: <HiHome />, path: "/" },
    { name: "Cases", icon: <MdOutlineCases />, path: "/cases" },
    { name: "Reports", icon: <TbReportSearch />, path: "/reports" },
    { name: "Analytics", icon: <IoAnalytics />, path: "/analytics" },
    { name: "Settings", icon: <IoMdSettings />, path: "/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-8">Fraud Dashboard</h2>

        <nav className="flex-1 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-lg font-medium ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-800"
                }`
              }
            >
              <div className="flex items-center gap-4">
                <span>{item.icon}</span>
                {item.name}
              </div>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 rounded-lg p-3 text-center font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Mobile Sidebar (Overlay) */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay background */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sidebar Drawer */}
          <div className="relative bg-gray-900 text-white w-64 p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Fraud Dashboard</h2>
              <button onClick={() => setOpen(false)}>
                <IoClose className="text-2xl" />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block p-3 rounded-lg font-medium ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-800"
                    }`
                  }
                >
                  <div className="flex items-center gap-4">
                    <span>{item.icon}</span>
                    {item.name}
                  </div>
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="mt-auto bg-red-600 hover:bg-red-700 rounded-lg p-3 text-center font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
