import FraudScoreDistribution from "../components/analytics/FraudScoreDistribution";
import RiskCategoryPie from "../components/analytics/RiskCategoryPie";
import SyntheticAlertsTrend from "../components/analytics/SyntheticAlertsTrend";
import AMLTrendChart from "../components/analytics/AMLTrendChart";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FraudScoreDistribution />
          <RiskCategoryPie />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SyntheticAlertsTrend />
          <AMLTrendChart />
        </div>

      </div>
    </div>
  );
}

