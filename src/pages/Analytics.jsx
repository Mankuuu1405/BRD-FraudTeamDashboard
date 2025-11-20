import FraudScoreDistribution from "../components/analytics/FraudScoreDistribution";
import RiskCategoryPie from "../components/analytics/RiskCategoryPie";
import SyntheticAlertsTrend from "../components/analytics/SyntheticAlertsTrend";
import AMLTrendChart from "../components/analytics/AMLTrendChart";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FraudScoreDistribution />
        <RiskCategoryPie />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SyntheticAlertsTrend />
        <AMLTrendChart />
      </div>
    </div>
  );
}
