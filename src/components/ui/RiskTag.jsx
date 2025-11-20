export default function RiskTag({ score }) {
  const getColor = () => {
    if (score >= 75) return "bg-red-100 text-red-700 border-red-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getColor()}`}>
      {score}%
    </span>
  );
}
