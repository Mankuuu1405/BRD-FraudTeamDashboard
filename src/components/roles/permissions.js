export const rolePermissions = {
  SuperAdmin: {
    canAccess: ["Dashboard", "Cases", "CaseDetails", "Reports", "Analytics", "RolesPermissions", "Settings"]
  },
  Analyst: {
    canAccess: ["Dashboard", "Cases", "CaseDetails", "Reports", "Analytics", "Settings"]
  },
  Investigator: {
    canAccess: ["Dashboard", "Cases", "CaseDetails", "Reports", "Settings"]
  },
  Viewer: {
    canAccess: ["Dashboard", "Cases", "Settings"] 
  },
};
