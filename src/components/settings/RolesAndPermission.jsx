import { useEffect, useMemo, useState } from "react";
import { HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import { settingsApi } from "../../api/settingsApi";

export default function RolesAndPermissions() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [permissionRows, setPermissionRows] = useState([]);

  const actions = ["View", "Edit", "Create", "Delete"];

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId),
    [roles, selectedRoleId]
  );

  const loadRolesAndModules = async () => {
    try {
      const rolesData = await settingsApi.getRoles();

      const normalizedRoles = (rolesData || []).map((role) => ({
        id: role.id,
        name: role.name,
        userCount: role.user_count || 0,
      }));

      setRoles(normalizedRoles);

      if (normalizedRoles.length > 0) {
        setSelectedRoleId(normalizedRoles[0].id);
      }
    } catch {
      toast.error("Failed to load roles and modules");
    }
  };

  const loadPermissions = async (roleId) => {
    if (!roleId) return;

    try {
      const data = await settingsApi.getRolePermissions(roleId);
      const rows = (data.permissions || []).map((item) => ({
        module: item.module,
        can_view: !!item.can_view,
        can_edit: !!item.can_edit,
        can_create: !!item.can_create,
        can_delete: !!item.can_delete,
      }));

      setPermissionRows(rows);
    } catch {
      toast.error("Failed to load permissions");
    }
  };

  useEffect(() => {
    loadRolesAndModules();
  }, []);

  useEffect(() => {
    loadPermissions(selectedRoleId);
  }, [selectedRoleId]);

  const handleAddRole = async () => {
    if (newRole.trim().length === 0) return;

    try {
      const createdRole = await settingsApi.createRole(newRole.trim());
      const nextRole = {
        id: createdRole.id,
        name: createdRole.name,
        userCount: 0,
      };
      setRoles((prev) => [...prev, nextRole]);
      setSelectedRoleId(nextRole.id);
      toast.success("Role added successfully ✅");
      setNewRole("");
    } catch {
      toast.error("Failed to add role");
    }
  };


  const handleDeleteRole = async (id) => {
    try {
      await settingsApi.deleteRole(id);
      const nextRoles = roles.filter((role) => role.id !== id);
      setRoles(nextRoles);
      if (selectedRoleId === id) {
        setSelectedRoleId(nextRoles[0]?.id || null);
      }
      toast.success("Role deleted");
    } catch {
      toast.error("Failed to delete role");
    }
  };

  const handleTogglePermission = (moduleId, permissionKey) => {
    setPermissionRows((prev) =>
      prev.map((row) =>
        row.module.id === moduleId
          ? { ...row, [permissionKey]: !row[permissionKey] }
          : row
      )
    );
  };

  const handleSavePermissions = async () => {
    if (!selectedRoleId) return;

    try {
      const payload = permissionRows.map((row) => ({
        module_id: row.module.id,
        can_view: row.can_view,
        can_edit: row.can_edit,
        can_create: row.can_create,
        can_delete: row.can_delete,
      }));

      await settingsApi.saveRolePermissions(selectedRoleId, payload);
      toast.success("Permissions updated successfully ✅");
    } catch {
      toast.error("Failed to update permissions");
    }
  };


  return (
    <div className="space-y-6">

      {/* Role Management Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Role Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage user roles</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Add New Role */}
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition px-4 py-3 flex-1"
              placeholder="Enter new role name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddRole()}
            />
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              onClick={handleAddRole}
            >
              Add Role
            </button>
          </div>

          {/* Roles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedRoleId === role.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setSelectedRoleId(role.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{role.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{role.userCount} users</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-1.5 hover:bg-red-50 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.id);
                      }}
                    >
                      <HiTrash className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permission Matrix Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Permission Matrix</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure permissions for <span className="font-semibold text-blue-600">{selectedRole?.name || "-"}</span> role
          </p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left font-semibold text-gray-600 border-b border-gray-200">
                  Module
                </th>
                {actions.map((action) => (
                  <th
                    key={action}
                    className="px-6 py-4 text-center font-semibold text-gray-600 border-b border-gray-200"
                  >
                    {action}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {permissionRows.map((row) => (
                <tr
                  key={row.module.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 border-b border-gray-200">
                    {row.module.name}
                  </td>
                  {actions.map((action) => {
                    const key = `can_${action.toLowerCase()}`;
                    return (
                      <td
                        key={action}
                        className="px-6 py-4 text-center border-b border-gray-200"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                          checked={!!row[key]}
                          onChange={() => handleTogglePermission(row.module.id, key)}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSavePermissions}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Save Permissions
          </button>

        </div>
      </div>

    </div>
  );
}