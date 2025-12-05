import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import RolesAndPermissions from "../components/settings/RolesAndPermission";

export default function Settings() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-gray-800">Settings</h2>

        <AccountSettings />

        <NotificationSettings />
      
        <SecuritySettings />

        <RolesAndPermissions />

    </div>
  );
}
