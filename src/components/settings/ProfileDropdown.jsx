import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineCog
} from "react-icons/hi";

export default function ProfileDropdown({ user, onLogout, onEditProfile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();  // <-- ADDED

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 flex items-center justify-center bg-gray-300 rounded-full text-sm font-semibold hover:bg-gray-400"
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 border z-40">
          
          {/* Profile */}
          <button
            onClick={() => {
              setOpen(false);
              onEditProfile();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <HiOutlineUserCircle className="text-lg" />
            Profile
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/settings");   // <-- FIXED
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <HiOutlineCog className="text-lg" />
            Settings
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            <HiOutlineLogout className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
