import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";

export default function RolesAndPermissions() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", userCount: 5 },
    { id: 2, name: "Fraud Analyst", userCount: 12 },
    { id: 3, name: "Viewer", userCount: 8 }
  ]);

  const [newRole, setNewRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");

  const modules = ["Cases", "Reports", "Analytics", "Settings"];
  const actions = ["View", "Edit", "Create", "Delete"];

  const handleAddRole = () => {
    if (!newRole.trim()) return;

    setRoles([...roles, { id: Date.now(), name: newRole, userCount: 0 }]);
    toast.success("Role added successfully");
    setNewRole("");
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((r) => r.id !== id));
    toast.success("Role deleted");
  };

  return (
    <div className="space-y-6">

      {/* Role Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Role Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage user roles</p>
        </div>

        <div className="p-6 space-y-5">

          {/* Add New Role */}
          <div className="flex gap-3 max-w-lg">
            <input
              className="border border-gray-300 rounded-lg h-9 px-3 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition flex-1"
              placeholder="Enter new role name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddRole()}
            />

            <button
              onClick={handleAddRole}
              className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm"
            >
              Add Role
            </button>
          </div>

          {/* Roles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.name)}
                className={`p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    selectedRole === role.name
                      ? "border-blue-600 bg-blue-600/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-800">{role.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{role.userCount} users</p>
                  </div>

                  <button
                    className="p-1 hover:bg-red-50 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role.id);
                    }}
                  >
                    <HiTrash className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Permission Matrix</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure permissions for{" "}
            <span className="text-blue-600 font-medium">{selectedRole}</span>
          </p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <th className="px-6 py-4 text-left font-semibold">Module</th>
                {actions.map((action) => (
                  <th
                    key={action}
                    className="px-6 py-4 text-center font-semibold"
                  >
                    {action}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {modules.map((module, idx) => (
                <tr key={module} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium border-b border-gray-200">
                    {module}
                  </td>

                  {actions.map((action) => (
                    <td
                      key={action}
                      className="px-6 py-4 text-center border-b border-gray-200"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={idx === 0}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button className="h-9 px-4 rounded-lg bg-gray-100 text-gray-700 text-sm">
            Cancel
          </button>

          <button
            onClick={() => toast.success("Permissions updated successfully")}
            className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm"
          >
            Save Permissions
          </button>
        </div>
      </div>

    </div>
  );
}
