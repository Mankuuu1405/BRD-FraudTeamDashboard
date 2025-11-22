import { useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

export default function EditProfileModal({ open, onClose }) {
  const [name, setName] = useState("Ravi Sharma");
  const [email, setEmail] = useState("ravi@example.com");
  const [phone, setPhone] = useState("9876543210");

  const handleSave = () => {
    toast.success("Profile updated successfully");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            className="px-4 py-2 rounded-lg border"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-primary-blue text-white rounded-lg"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
