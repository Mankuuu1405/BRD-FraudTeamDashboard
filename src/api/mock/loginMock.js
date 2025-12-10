export const loginMock = (email) => {
  if (email === "admin@example.com") {
    return {
      user: {
        id: "u-1",
        name: "Admin User",
        role: "SuperAdmin",
      },
      token: "mock-token-admin"
    };
  }

  if (email === "analyst@example.com") {
    return {
      user: {
        id: "u-1",
        name: "Admin User",
        role: "Analyst",
      },
      token: "mock-token-admin"
    };
}
  if (email === "investigator@example.com") {
    return {
      user: {
        id: "u-1",
        name: "Admin User",
        role: "Investigator",
      },
      token: "mock-token-admin"
    };
  }
  if (email === "viewer@example.com") {
    return {
      user: {
        id: "u-1",
        name: "Admin User",
        role: "Viewer",
      },
      token: "mock-token-admin"
    };
  }


  return {
    user: {
      id: "u-2",
      name: "Default User",
      role: "Viewer"
    },
    token: "mock-token-viewer"
  };
};
