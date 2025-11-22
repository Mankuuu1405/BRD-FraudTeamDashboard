import { useState } from "react";

export default function RoleManagement() {
  const [roles, setRoles] = useState(["Admin", "Fraud Analyst"]);
  const [newRole, setNewRole] = useState("");

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold">Role Management</h2>

      <div className="flex gap-3">
        <input
          className="border rounded-lg p-2 flex-1"
          placeholder="New Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-primary-blue text-white rounded-lg text-sm"
          onClick={() => {
            if (newRole.trim().length === 0) return;
            setRoles([...roles, newRole]);
            setNewRole("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="text-sm space-y-2">
        {roles.map((role) => (
          <li
            key={role}
            className="px-3 py-2 border rounded-lg bg-gray-50"
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}
