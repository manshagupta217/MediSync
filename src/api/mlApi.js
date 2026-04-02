const BASE_URL = "https://mediconnect-backend-auqx.onrender.com";

const safeFetch = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { error: true, message: "Server error" };
    }

    const result = await res.json();

    if (!result) {
      return { error: true, message: "No data returned" };
    }

    return result;
  } catch (error) {
    return { error: true, message: "Network error" };
  }
};

export const predictHospital = async (data) => {
  return await safeFetch(`${BASE_URL}/predict-hospital`, data);
};

export const predictPatientRisk = async (data) => {
  return await safeFetch(`${BASE_URL}/predict-patient-risk`, data);
};