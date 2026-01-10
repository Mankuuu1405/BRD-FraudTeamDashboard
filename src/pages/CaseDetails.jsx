import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import VerificationAccordion from "../components/cases/VerificationAccordion";
import RiskTag from "../components/ui/RiskTag";
import StatusTag from "../components/ui/StatusTag";
import AuditEvent from "../components/cases/AuditEvent";
import PatternTag from "../components/ui/PatternTag";
import BehaviorTag from "../components/ui/BehaviorTag";
import CaseTimeline from "../components/cases/CasesTimeline";

import { getCaseDetails } from "../api/caseDetailsApi";

export default function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    getCaseDetails(caseId).then(setCaseData);
  }, [caseId]);

  const handleAction = (newStatus) => {
    setCaseData((prev) => ({
      ...prev,
      workflow: { status: newStatus },
      audit: [
        ...prev.audit,
        {
          id: prev.audit.length + 1,
          action: `Status changed to ${newStatus}`,
          ts: new Date().toLocaleString(),
        },
      ],
    }));
  };

  if (!caseData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Case Details</h2>

      {/* Back Button */}
      <button
        onClick={() => navigate("/cases")}
        className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        ← Back to Cases
      </button>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Case #{caseData.id}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-sm font-medium text-gray-600">Name</p>
            <p className="text-gray-800">{caseData.applicant.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Mobile</p>
            <p className="text-gray-800">{caseData.applicant.mobile}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">PAN</p>
            <p className="text-gray-800">{caseData.applicant.pan}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            <p className="text-primary-blue font-semibold">
              {caseData.workflow.status}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <CaseTimeline stage={caseData.progressStage} />
      </div>

      {/* Risk Engine */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Fraud Score</p>
          <RiskTag score={caseData.fraudEngine.fraudScore} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Synthetic ID</p>
          <StatusTag status={caseData.fraudEngine.syntheticId} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">AML Screening</p>
          <StatusTag status={caseData.fraudEngine.aml} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Behavioral</p>
          <BehaviorTag level={caseData.fraudEngine.behavioral} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Pattern Match</p>
          <PatternTag match={caseData.fraudEngine.pattern} />
        </div>
      </div>

      {/* Verifications */}
      <VerificationAccordion verifications={caseData.verifications} />

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleAction("APPROVED")}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Approve
          </button>

          <button
            onClick={() => handleAction("UNDERWRITING")}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Underwriting
          </button>

          <button
            onClick={() => handleAction("REJECTED")}
            className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Reject
          </button>

          <button
            onClick={() => handleAction("BLACKLISTED")}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Blacklist
          </button>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Audit Trail</h2>

        <div className="space-y-3">
          {caseData.audit
            .slice()
            .reverse()
            .map((log) => (
              <AuditEvent key={log.id} action={log.action} ts={log.ts} />
            ))}
        </div>
      </div>

    </div>
  );
}
