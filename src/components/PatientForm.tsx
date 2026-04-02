import { useState } from "react";
import { predictPatientRisk } from "@/api/mlApi";

export default function PatientForm() {
  const [age, setAge] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [heartRate, setHeartRate] = useState("");

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await predictPatientRisk({
        age: Number(age),
        oxygen_level: Number(oxygen),
        heart_rate: Number(heartRate),
      });

      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Patient Risk Analysis</h2>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Oxygen Level"
          value={oxygen}
          onChange={(e) => setOxygen(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Heart Rate"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Risk"}
      </button>

      {/* Loading */}
      {loading && (
        <p className="text-sm mt-2 text-muted-foreground">
          Analyzing patient data...
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-4 bg-muted rounded-xl">
          <h3 className="font-semibold">Prediction Result</h3>
          <p>Risk Score: {result.risk_score}</p>
        </div>
      )}
    </div>
  );
}