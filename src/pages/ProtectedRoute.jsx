import { Navigate } from "react-router-dom";
import { rolePermissions } from "../components/roles/permissions";

export default function ProtectedRoute({ children, pageName }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || "Viewer";

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const allowedPages = rolePermissions[role]?.canAccess || [];

  if (!allowedPages.includes(pageName)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
