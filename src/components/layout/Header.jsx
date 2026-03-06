import { useState } from "react";
import ProfileDropdown from "../settings/ProfileDropdown";
import ProfileModal from "../profile/ProfileModal";
import { authApi } from "../../api/authApi";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  // Parse user from local storage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({
    name: savedUser.fullName || "User",
    email: savedUser.email || "",
  });

  return (
    <>
      <div className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30">

        {/* Static Dashboard Title */}
        <h1 className="font-semibold text-gray-900">
          Fraud Team Dashboard
        </h1>

        {/* Static Dashboard Subtitle */}
        <p className="text-xs text-gray-500 mt-1">
          Fraud Risk Monitoring & Analysis
        </p>

        {/* Profile Menu */}
        <div className="absolute right-6 top-4">
          <ProfileDropdown
            user={user}
            onLogout={async () => {
              await authApi.logout();
              window.location.href = "/login";
            }}
            onEditProfile={() => setModalOpen(true)}
          />
        </div>
      </div>

      <ProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        onSave={setUser}
      />
    </>
  );
}
