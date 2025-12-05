import { useEffect, useState } from "react";
import { getAnalyticsData } from "../api/analyticsApi";

import FraudScoreDistribution from "../components/analytics/FraudScoreDistribution";
import RiskCategoryPie from "../components/analytics/RiskCategoryPie";
import SyntheticAlertsTrend from "../components/analytics/SyntheticAlertsTrend";
import AMLTrendChart from "../components/analytics/AMLTrendChart";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalyticsData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <FraudScoreDistribution data={data.fraudScoreDistribution} />

          <RiskCategoryPie data={data.riskCategoryPie} />
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <SyntheticAlertsTrend data={data.syntheticAlertsTrend} />
        
          <AMLTrendChart data={data.amlTrend} />
        
      </div>
    </div>
  );
}
