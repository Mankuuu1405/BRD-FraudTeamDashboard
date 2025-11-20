import Accordion from "../ui/Accordion";

export default function VerificationAccordion({ verifications }) {
  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-lg font-bold mb-4">Verification Summary</h2>

      <Accordion title="KYC Verification">
        <p>PAN Match: {verifications.kyc.panMatch ? "Yes" : "No"}</p>
        <p>Aadhaar Match: {verifications.kyc.aadhaarMatch ? "Yes" : "No"}</p>
      </Accordion>

      <Accordion title="Biometrics">
        <p>Face Match Score: {verifications.biometrics.faceMatch}</p>
        <p>Liveness Check: {verifications.biometrics.liveness ? "Yes" : "No"}</p>
      </Accordion>

      <Accordion title="Geo Location">
        <p>Negative Area: {verifications.geo.negativeArea ? "Yes" : "No"}</p>
      </Accordion>

      <Accordion title="Financial Documents">
        <p>Income Confidence Score: {verifications.financial.incomeConfidence}</p>
      </Accordion>

      <Accordion title="Bureau Check">
        <p>CIBIL Score: {verifications.bureau.cibil}</p>
        <p>Blacklisted: {verifications.bureau.blacklist ? "Yes" : "No"}</p>
      </Accordion>

      <Accordion title="Blockchain Identity Match">
        <p>
          Hash Match:{" "}
          {verifications.blockchain.identityHashMatch ? "Yes" : "No"}
        </p>
      </Accordion>
    </div>
  );
}
