export default function StatCard({ title, value, subtext }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-gray-400 text-xs mt-1">{subtext}</p>
    </div>
  );
}
