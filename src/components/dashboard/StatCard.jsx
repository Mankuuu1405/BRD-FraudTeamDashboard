export default function StatCard({ title, value, subtext, icon: Icon, trend }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 grid place-items-center">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        {trend && (
          <span className={`text-sm px-2 py-1 rounded ${
            trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend}
          </span>
        )}
      </div>

      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
      {subtext && <p className="text-gray-400 text-xs">{subtext}</p>}
    </div>
  );
}
