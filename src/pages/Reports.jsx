import { useState } from "react";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

import ReportSelector from "../components/reports/ReportSelector";
import ReportGenerator from "../components/reports/ReportGenerator";
import ReportTable from "../components/reports/ReportTable";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("Fraud Summary Report");
  const [reportData, setReportData] = useState([]);

  // 1️⃣ GENERATE report (but do NOT export)
  const handleGenerateReport = (from, to, done) => {
    if (!from || !to) {
      toast.error("Please select a date range");
      done();
      return;
    }

    // Mock backend data
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

    setReportData(mockData);

    toast.success("Report generated");
    done();
  };

  // 2️⃣ EXPORT CSV (user-triggered)
  const exportCSV = () => {
    if (!reportData.length) return toast.error("No data to export");

    const rows = [
      ["Case ID", "Applicant", "Fraud Score", "AML", "Synthetic"],
      ...reportData.map((r) => [r.id, r.name, r.fraud + "%", r.aml, r.synthetic]),
    ];

    const csvContent = rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    saveAs(blob, "fraud-report.csv");
    toast.success("CSV exported");
  };

  // 3️⃣ EXPORT PDF (simple fallback)
  const exportPDF = () => {
    if (!reportData.length) return toast.error("No data to export");

    let text = "Fraud Report\n\n";
    reportData.forEach((row) => {
      text += `${row.id} | ${row.name} | Fraud: ${row.fraud}% | AML: ${row.aml} | Synthetic: ${row.synthetic}\n`;
    });

    const blob = new Blob([text], {
      type: "application/pdf",
    });

    saveAs(blob, "fraud-report.pdf");
    toast.success("PDF exported");
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-gray-700">Reports</h2>

      <ReportSelector
        selected={selectedReport}
        setSelected={setSelectedReport}
      />

      <ReportGenerator onGenerate={handleGenerateReport} />

      <ReportTable
        data={reportData}
        onExportCSV={exportCSV}
        onExportPDF={exportPDF}
      />
    </div>
  );
}
