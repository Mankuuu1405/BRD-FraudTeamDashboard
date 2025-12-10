import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import { getCurrentUser } from "../utils/auth";

export default function Settings() {

  const user = getCurrentUser();
  const isSuperAdmin = user?.role === "SuperAdmin";
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-gray-800">Settings</h2>

        <AccountSettings />

        <NotificationSettings />
      
        <SecuritySettings />

    </div>
  );
}
