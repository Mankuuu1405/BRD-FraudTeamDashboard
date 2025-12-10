export const rolesPermissionsMock = {
  roles: [
    { id: 1, name: "Super Admin", description: "Platform owner role", system: true },
    { id: 2, name: "Investigator", description: "Investigates cases", system: false },
    { id: 3, name: "Analyst", description: "Analyzes fraud patterns", system: false },
    { id: 4, name: "Viewer", description: "Can only view dashboards", system: false },
  ],

  permissions: {
    // Only Super Admin has hardcoded permissions.
    // Other roles will auto-generate permissions from this template.
    1: [
      {
        module: "Cases",
        items: [
          { id: "VIEW_CASES", label: "View Cases", granted: true },
          { id: "CASE_DETAILS", label: "View Case Details", granted: true },
        ],
      },
      {
        module: "Reports",
        items: [{ id: "VIEW_REPORTS", label: "View Reports", granted: true }],
      },
      {
        module: "Analytics",
        items: [{ id: "VIEW_ANALYTICS", label: "View Analytics", granted: true }],
      },
      {
        module: "Settings",
        items: [{ id: "MANAGE_SETTINGS", label: "Manage Settings", granted: true }],
      },
    ],
  },
};
