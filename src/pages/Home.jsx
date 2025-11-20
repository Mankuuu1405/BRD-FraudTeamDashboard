import FraudScoreCard from "../components/dashboard/FraudScoreCard";
import SyntheticIdCard from "../components/dashboard/SyntheticIdCard";
import AMLCard from "../components/dashboard/AMLCard";
import BehavioralCard from "../components/dashboard/BehavioralCard";
import PatternCard from "../components/dashboard/PatternCard";

export default function Home() {
  return (
    <div className="space-y-6">
      
      {/* Top 5 Risk Engine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <FraudScoreCard />
        <SyntheticIdCard />
        <AMLCard />
        <BehavioralCard />
        <PatternCard />
      </div>

      {/* High Risk Applicants */}
      <div className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">High Risk Applicants</h2>
        <p className="text-gray-500 text-sm">We will populate this table next.</p>
      </div>

      {/* Graph & Analytics */}
      <div className="bg-white p-4 shadow rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-3">Fraud Score Distribution</h2>
        <p className="text-gray-500 text-sm">Graph will be added here.</p>
      </div>
    </div>
  );
}
