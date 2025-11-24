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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-6 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}