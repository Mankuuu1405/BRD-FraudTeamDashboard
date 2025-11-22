export default function PermissionMatrix() {
  const modules = ["Cases", "Reports", "Analytics", "Settings"];
  const actions = ["View", "Edit", "Create", "Delete"];

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-6 overflow-auto">
      <h2 className="text-lg font-semibold">Permission Matrix</h2>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border">Module</th>
            {actions.map((a) => (
              <th key={a} className="p-3 border">{a}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {modules.map((module) => (
            <tr key={module}>
              <td className="p-3 border font-medium">{module}</td>
              {actions.map((action) => (
                <td key={action} className="p-3 border text-center">
                  <input type="checkbox" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
