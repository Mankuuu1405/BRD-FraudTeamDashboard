// src/pages/Reports.jsx
import { MonthlyFraudChart } from "../components/Charts/MonthlyFraudChart";
import { FraudTypeChart } from "../components/Charts/FraudTypeChart";
import QuarterlyFraudChart from "../components/Charts/QuaterlyFraudChart";
import TopFraudCases from "../components/Charts/TopFraudCases";

export default function Reports() {


  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Fraud Reports & Analytics</h1>
      </div>

      {/* Grid for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <MonthlyFraudChart />

        {/* Chart 2 */}
        {/* Fraud Type Breakdown */}
        <FraudTypeChart />

      </div>

      {/* Chart 3 */}
      <QuarterlyFraudChart />

      {/* Optional Table */}
      <TopFraudCases />
    </div>
  );
}
