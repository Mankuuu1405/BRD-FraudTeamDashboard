import { useState } from "react";
import ProfileDropdown from "../settings/ProfileDropdown";
import ProfileModal from "../profile/ProfileModal";

export default function Header({ title }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
  });

  return (
    <>
      <div className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-xl font-semibold">{title}</h1>

        <ProfileDropdown
          user={user}
          onLogout={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          onEditProfile={() => setModalOpen(true)}
        />
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
