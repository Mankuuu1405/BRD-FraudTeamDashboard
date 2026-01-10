import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function AccountSettings() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>

      <div className="flex flex-col gap-1 mb-4 text-sm text-gray-700">
        <p><span className="font-medium text-gray-800">Name:</span> Ravi Sharma</p>
        <p><span className="font-medium text-gray-800">Email:</span> ravi@example.com</p>
        <p><span className="font-medium text-gray-800">Phone:</span> 9876543210</p>
      </div>

      <button
        onClick={() => setEditOpen(true)}
        className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm"
      >
        Edit Profile
      </button>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
