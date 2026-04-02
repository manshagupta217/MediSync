import { useState } from "react";
import { predictPatientRisk } from "../api/mlApi";

type Props = {
  patientData: any;
};

export default function PatientRisk({ patientData }: Props) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRisk = async () => {
    setLoading(true);
    const res = await predictPatientRisk(patientData);
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleRisk}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        {loading ? "Analyzing..." : "Check Risk"}
      </button>

      {result && (
        <div className="mt-3">
          <p>Risk Score: {result?.risk_score ?? "N/A"}</p>
          <p>Level: {result?.risk_level ?? "N/A"}</p>
          <p>Reason: {result?.reason ?? "Not available"}</p>
        </div>
      )}
    </div>
  );
}