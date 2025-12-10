import { useEffect, useState } from "react";
import {
  fetchRoles,
  createRole,
  deleteRoleApi,
  fetchPermissions,
  updatePermissionsApi,
} from "../api/rolesPermissionsApi";
import toast from "react-hot-toast";

export default function RolesPermissions() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const [matrixRole, setMatrixRole] = useState(null);
  const [matrix, setMatrix] = useState([]);
  const [matrixLoading, setMatrixLoading] = useState(false);
  const [matrixError, setMatrixError] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadRoles = async () => {
    setError(null);
    const res = await fetchRoles();
    if (res.data) setRoles(res.data);
    else setError("Unable to load roles");
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const openMatrix = async (role) => {
    setMatrixRole(role);
    setMatrix([]);
    setMatrixError(null);
    setMatrixLoading(true);

    const res = await fetchPermissions(role.id);
    setMatrixLoading(false);

    if (res.data) setMatrix(res.data);
    else setMatrixError("Unable to load permissions");
  };

  const togglePerm = (permId) => {
    setMatrix((m) =>
      m.map((group) => ({
        ...group,
        items: group.items.map((p) =>
          p.id === permId ? { ...p, granted: !p.granted } : p
        ),
      }))
    );
  };


  const saveMatrix = async () => {
    const granted = matrix.flatMap((group) =>
      group.items.filter((p) => p.granted).map((p) => p.id)
    );

    await updatePermissionsApi(matrixRole.id, granted);
    toast.success("Permissions saved");
    setMatrixRole(null);
  };


  const createNewRole = async () => {
    const res = await createRole({
      name: newRole.name,
      description: newRole.description,
    });

    if (res.data) {
      toast.success("Role created");
      setCreating(false);
      setNewRole({ name: "", description: "" });
      loadRoles();
    }
  };

  const deleteRole = async () => {
    const res = await deleteRoleApi(confirmDelete.id);
    if (res.data) {
      toast.success("Role deleted");
      setConfirmDelete(null);
      loadRoles();
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Roles & Permissions</div>
        <button
          className="h-9 px-3 rounded-lg bg-blue-600 text-white"
          onClick={() => setCreating(true)}
        >
          Create Role
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* ROLES TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3">Role Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">System Role</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr
                key={r.id}
                className="border-t border-gray-100"
              >
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">{r.description}</td>
                <td className="px-4 py-3">{r.system ? "Yes" : "No"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="h-8 px-3 rounded-lg border border-gray-200"
                    onClick={() => openMatrix(r)}
                  >
                    Manage Permissions
                  </button>

                  <button
                    disabled={r.system}
                    className="h-8 px-3 rounded-lg border border-red-200 text-red-700 disabled:opacity-50"
                    onClick={() => setConfirmDelete(r)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {creating && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-card p-4">
            <div className="text-lg font-semibold">Create Role</div>

            <div className="mt-3 space-y-3">
              <label className="block">
                <div className="text-sm text-gray-700">Role Name</div>
                <input
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="mt-1 w-full h-9 rounded-lg border border-gray-300 px-3"
                />
              </label>

              <label className="block">
                <div className="text-sm text-gray-700">Description</div>
                <input
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="mt-1 w-full h-9 rounded-lg border border-gray-300 px-3"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  className="h-9 px-3 rounded-lg border border-gray-200"
                  onClick={() => setCreating(false)}
                >
                  Cancel
                </button>
                <button
                  className="h-9 px-3 rounded-lg bg-blue-600 text-white"
                  onClick={createNewRole}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {confirmDelete && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-card p-4">
            <div className="text-lg font-semibold">Delete Role</div>
            <div className="mt-2 text-sm text-gray-700">
              Are you sure you want to delete the role "{confirmDelete.name}"?
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                className="h-9 px-3 rounded-lg border border-gray-200"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="h-9 px-3 rounded-lg bg-red-600 text-white"
                onClick={deleteRole}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {matrixRole && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-xl border border-gray-200 shadow-card p-4">

            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Manage Permissions • {matrixRole.name}
              </div>

              <button
                className="h-9 px-3 rounded-lg border border-gray-200"
                onClick={() => setMatrixRole(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {matrixLoading && (
                <div className="text-sm text-gray-600">
                  Loading permissions...
                </div>
              )}

              {matrixError && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
                  {matrixError}
                </div>
              )}

              {matrix.map((group) => (
                <div
                  key={group.module}
                  className="border border-gray-100 rounded-lg p-3"
                >
                  <div className="font-medium mb-2">{group.module}</div>

                  <div className="grid grid-cols-2 gap-2">
                    {group.items.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={p.granted}
                          onChange={() => togglePerm(p.id)}
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                className="h-9 px-3 rounded-lg bg-blue-600 text-white disabled:opacity-60"
                disabled={!matrix.length || matrixLoading}
                onClick={saveMatrix}
              >
                Save Permissions
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
