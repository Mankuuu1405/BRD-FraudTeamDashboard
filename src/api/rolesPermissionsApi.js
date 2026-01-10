import api from "./axiosInstance";
import { rolesPermissionsMock } from "./mock/rolesPermissionsMock";
import { useApiWithFallback } from "./useApiWithFallback";

// ----------------------------------------------
// AUTO-GENERATED PERMISSION TEMPLATE LOGIC
// ----------------------------------------------
const generatePermissionTemplate = () => {
  const template = rolesPermissionsMock.permissions[1] || []; // Super Admin template

  return template.map(group => ({
    module: group.module,
    items: group.items.map(item => ({
      ...item,
      granted: false, // default off
    })),
  }));
};

// ----------------------------------------------
// 📌 GET ALL ROLES
// ----------------------------------------------
export const fetchRoles = () =>
  useApiWithFallback(
    () => api.get("/roles"),
    { data: rolesPermissionsMock.roles }
  );

// ----------------------------------------------
// 📌 CREATE ROLE
// ----------------------------------------------
export const createRole = (payload) =>
  useApiWithFallback(
    () => api.post("/roles", payload),
    {
      data: (() => {
        const newRole = {
          id: Date.now(),
          name: payload.name,
          description: payload.description,
          system: false,
        };

        rolesPermissionsMock.roles.push(newRole);

        // Assign default permissions template
        rolesPermissionsMock.permissions[newRole.id] = generatePermissionTemplate();

        return newRole;
      })(),
    }
  );

// ----------------------------------------------
// 📌 DELETE ROLE
// ----------------------------------------------
export const deleteRoleApi = (id) =>
  useApiWithFallback(
    () => api.delete(`/roles/${id}`),
    {
      data: (() => {
        rolesPermissionsMock.roles = rolesPermissionsMock.roles.filter(
          (r) => r.id !== id
        );

        delete rolesPermissionsMock.permissions[id];

        return { success: true };
      })(),
    }
  );

// ----------------------------------------------
// 📌 FETCH PERMISSIONS FOR ONE ROLE
// ----------------------------------------------
export const fetchPermissions = (roleId) =>
  useApiWithFallback(
    () => api.get(`/roles/${roleId}/permissions`),
    {
      data: (() => {
        // If this role already has permissions
        if (rolesPermissionsMock.permissions[roleId]) {
          return rolesPermissionsMock.permissions[roleId];
        }

        // Otherwise generate template
        rolesPermissionsMock.permissions[roleId] = generatePermissionTemplate();

        return rolesPermissionsMock.permissions[roleId];
      })(),
    }
  );

// ----------------------------------------------
// 📌 UPDATE PERMISSION MATRIX
// ----------------------------------------------
export const updatePermissionsApi = (roleId, grantedList) =>
  useApiWithFallback(
    () =>
      api.post(`/roles/${roleId}/permissions`, {
        granted: grantedList,
      }),
    {
      data: (() => {
        const groups = rolesPermissionsMock.permissions[roleId] || [];

        rolesPermissionsMock.permissions[roleId] = groups.map((group) => ({
          ...group,
          items: group.items.map((item) => ({
            ...item,
            granted: grantedList.includes(item.id),
          })),
        }));

        return { success: true };
      })(),
    }
  );
