import Accordion from "../ui/Accordion";

export default function VerificationAccordion({ verifications }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Verification Summary</h2>

      <div className="space-y-2">
        <Accordion title="KYC Verification">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PAN Match:</span>
              <span className={`font-medium ${verifications.kyc.panMatch ? "text-green-600" : "text-red-600"}`}>
                {verifications.kyc.panMatch ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Aadhaar Match:</span>
              <span className={`font-medium ${verifications.kyc.aadhaarMatch ? "text-green-600" : "text-red-600"}`}>
                {verifications.kyc.aadhaarMatch ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </Accordion>

        <Accordion title="Biometrics">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Face Match Score:</span>
              <span className="font-medium text-gray-900">{verifications.biometrics.faceMatch}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Liveness Check:</span>
              <span className={`font-medium ${verifications.biometrics.liveness ? "text-green-600" : "text-red-600"}`}>
                {verifications.biometrics.liveness ? "Passed" : "Failed"}
              </span>
            </div>
          </div>
        </Accordion>

        <Accordion title="Geo Location">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Negative Area:</span>
              <span className={`font-medium ${verifications.geo.negativeArea ? "text-red-600" : "text-green-600"}`}>
                {verifications.geo.negativeArea ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </Accordion>

        <Accordion title="Financial Documents">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Income Confidence Score:</span>
              <span className="font-medium text-gray-900">
                {(verifications.financial.incomeConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </Accordion>

        <Accordion title="Bureau Check">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CIBIL Score:</span>
              <span className="font-medium text-gray-900">{verifications.bureau.cibil}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blacklisted:</span>
              <span className={`font-medium ${verifications.bureau.blacklist ? "text-red-600" : "text-green-600"}`}>
                {verifications.bureau.blacklist ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </Accordion>

        <Accordion title="Blockchain Identity Match">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hash Match:</span>
              <span className={`font-medium ${verifications.blockchain.identityHashMatch ? "text-green-600" : "text-red-600"}`}>
                {verifications.blockchain.identityHashMatch ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}