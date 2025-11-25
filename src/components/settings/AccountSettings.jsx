import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function AccountSettings() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Account</h2>

      <div className="flex flex-col gap-1 mb-4 text-sm">
        <p><span className="font-medium">Name:</span> Ravi Sharma</p>
        <p><span className="font-medium">Email:</span> ravi@example.com</p>
        <p><span className="font-medium">Phone:</span> 9876543210</p>
      </div>

      <button
        onClick={() => setEditOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
      >
        Edit Profile
      </button>

      {/* Modal */}
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
