const BASE_URL = "http://127.0.0.1:8001";

export const getSatelliteStatus = async () => {
  try {
    const res = await fetch(`${BASE_URL}/satellite/status`);
    return await res.json();
  } catch {
    return { mode: "⚠️ Offline Mode" };
  }
};

export const getAmbulance = async () => {
  try {
    const res = await fetch(`${BASE_URL}/ambulance`);
    return await res.json();
  } catch {
    return null;
  }
};

export const getRiskZones = async () => {
  try {
    const res = await fetch(`${BASE_URL}/risk-zones`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const sendSOS = async () => {
  try {
    const res = await fetch(`${BASE_URL}/sos`, {
      method: "POST",
    });
    return await res.json();
  } catch {
    return { message: "⚠️ Failed to send SOS" };
  }
};

export const getRemoteDoctor = async () => {
  try {
    const res = await fetch(`${BASE_URL}/remote-doctor`);
    return await res.json();
  } catch {
    return null;
  }
};