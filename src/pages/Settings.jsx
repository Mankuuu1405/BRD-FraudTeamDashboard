import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import RoleManagement from "../components/settings/RoleManagement";
import PermissionMatrix from "../components/settings/PermissionMatrix";

export default function Settings() {
  return (
    <div className="space-y-8">
      <AccountSettings />
      <NotificationSettings />
      <SecuritySettings />
      <RoleManagement />
      <PermissionMatrix />
    </div>
  );
}
