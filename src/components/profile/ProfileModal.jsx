import { HiX } from "react-icons/hi";

export default function ProfileModal({ open, onClose, user, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="p-1">
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-lg w-full"
              value={user.name}
              onChange={(e) => onSave({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 p-2 border rounded-lg w-full"
              value={user.email}
              onChange={(e) => onSave({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
