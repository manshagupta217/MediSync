export const API_BASE_URL = "https://mediconnect-backend-auqx.onrender.com";

// 🧠 Patient Risk
export async function predictPatientRisk(data: any) {
  const res = await fetch(`${API_BASE_URL}/predict-patient-risk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("PATIENT RAW:", text);

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid Patient API response");
  }
}

// 🏥 Hospital Recommendation (🔥 FIXED)
export async function predictHospital(data: any) {
  const res = await fetch(`${API_BASE_URL}/predict-hospital`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  console.log("HOSPITAL STATUS:", res.status);
  console.log("HOSPITAL RAW:", text);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON PARSE ERROR:", err);
    throw new Error("Invalid JSON from backend");
  }
}

// 🚑 Ambulance
export async function predictAmbulance(data: any) {
  const res = await fetch(`${API_BASE_URL}/predict-ambulance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("AMBULANCE RAW:", text);

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid Ambulance API response");
  }
}