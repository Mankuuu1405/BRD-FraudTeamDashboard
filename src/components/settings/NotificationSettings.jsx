export default function NotificationSettings() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>

      <div className="space-y-4 text-sm text-gray-700">
        <label className="flex justify-between items-center">
          <span>Fraud Alert Notifications</span>
          <input type="checkbox" className="toggle-switch" />
        </label>

        <label className="flex justify-between items-center">
          <span>AML Screening Alerts</span>
          <input type="checkbox" className="toggle-switch" />
        </label>

        <label className="flex justify-between items-center">
          <span>Case Status Updates</span>
          <input type="checkbox" className="toggle-switch" />
        </label>
      </div>
    </div>
  );
}
