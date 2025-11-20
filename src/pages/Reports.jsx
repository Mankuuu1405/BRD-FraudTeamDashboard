import { useState } from "react";
import ReportSelector from "../components/reports/ReportSelector";
import ReportGenerator from "../components/reports/ReportGenerator";
import ReportTable from "../components/reports/ReportTable";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("Fraud Summary Report");
  const [reportData, setReportData] = useState([]);

  const mockData = [
    {
      id: "CASE-001",
      name: "Ravi Sharma",
      fraud: 78,
      aml: "CLEAR",
      synthetic: "SUSPECT",
    },
    {
      id: "CASE-002",
      name: "Aditya Singh",
      fraud: 45,
      aml: "HIT",
      synthetic: "CLEAN",
    },
  ];

  const generateReport = (from, to) => {
    // Filtering logic can be added later
    setReportData(mockData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <ReportSelector selected={selectedReport} setSelected={setSelectedReport} />

      <ReportGenerator onGenerate={generateReport} />

      <ReportTable data={reportData} />
    </div>
  );
}
