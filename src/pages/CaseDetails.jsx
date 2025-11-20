import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VerificationAccordion from "../components/cases/VerificationAccordion";
import RiskTag from "../components/ui/RiskTag";
import StatusTag from "../components/ui/StatusTag";
import AuditEvent from "../components/cases/AuditEvent";
import PatternTag from "../components/ui/PatternTag";
import BehaviorTag from "../components/ui/BehaviorTag";
import CaseTimeline from "../components/cases/CasesTimeline";

export default function CaseDetails() {
    const { caseId } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [notes, setNotes] = useState([]);

    // Mock data for now — replace with API later
    useEffect(() => {
        const mock = {
            id: caseId,
            applicant: {
                name: "Ravi Sharma",
                mobile: "9999999999",
                pan: "ABCDE1234F",
            },
            fraudEngine: {
                fraudScore: 78,
                syntheticId: "SUSPECT",
                aml: "CLEAR",
                behavioral: "HIGH RISK",
                pattern: "MATCH FOUND",
            },
            verifications: {
                kyc: { panMatch: true, aadhaarMatch: false },
                biometrics: { faceMatch: 82, liveness: true },
                geo: { negativeArea: false },
                financial: { incomeConfidence: 0.52 },
                bureau: { cibil: 620, blacklist: false },
                blockchain: { identityHashMatch: true },
            },
            workflow: {
                status: "REVIEW",
            },
            progressStage: 4,
            audit: [
                {
                    id: 1,
                    action: "Fraud score calculated",
                    ts: "2025-06-12 10:05 AM",
                },
                {
                    id: 2,
                    action: "AML screening completed",
                    ts: "2025-06-12 10:06 AM",
                },
            ],
            notes: [
                {
                    id: 1,
                    text: "Initial review: Fraud score unusually high.",
                    ts: "2025-06-12 10:10 AM",
                },
            ],
        };

        setCaseData(mock);
        setNotes(mock.notes);
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
            {/* Summary */}
            <div className=" bg-white p-4 rounded-xl shadow">
                <h1 className="text-xl font-bold mb-3">Case #{caseData.id}</h1>

                <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                        <p className="font-medium">Name</p>
                        <p>{caseData.applicant.name}</p>
                    </div>
                    <div>
                        <p className="font-medium">Mobile</p>
                        <p>{caseData.applicant.mobile}</p>
                    </div>
                    <div>
                        <p className="font-medium">PAN</p>
                        <p>{caseData.applicant.pan}</p>
                    </div>
                    <div>
                        <p className="font-medium">Status</p>
                        <p className="text-blue-600 font-semibold">{caseData.workflow.status}</p>
                    </div>

                </div>
            </div>

            {/* Timeline */}
            <CaseTimeline stage={caseData.progressStage} />

            {/* Risk Engine Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 shadow rounded-xl">
                    <p className="text-xs text-gray-500">Fraud Score</p>
                    <RiskTag score={caseData.fraudEngine.fraudScore} />
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <p className="text-xs text-gray-500">Synthetic ID</p>
                    <StatusTag status={caseData.fraudEngine.syntheticId} />
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <p className="text-xs text-gray-500">AML Screening</p>
                    <StatusTag status={caseData.fraudEngine.aml} />
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <p className="text-xs text-gray-500">Behavioral Consent</p>
                    <BehaviorTag level={caseData.fraudEngine.behavioral} />
                </div>

                <div className="bg-white p-4 shadow rounded-xl">
                    <p className="text-xs text-gray-500">Pattern Recognition</p>
                    <PatternTag match={caseData.fraudEngine.pattern} />
                </div>
            </div>

            {/* Verifications Summary */}
            <VerificationAccordion verifications={caseData.verifications} />

            {/* Workflow Actions */}
            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-lg font-bold mb-4">Actions</h2>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleAction("APPROVED")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Approve
                    </button>

                    <button
                        onClick={() => handleAction("UNDERWRITING")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Send to Underwriting
                    </button>

                    <button
                        onClick={() => handleAction("REJECTED")}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                        Reject
                    </button>

                    <button
                        onClick={() => handleAction("BLACKLISTED")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                        Blacklist
                    </button>
                </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white p-4 shadow rounded-xl">
                <h2 className="text-lg font-bold mb-4">Audit Trail</h2>

                <div className="space-y-2">
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
