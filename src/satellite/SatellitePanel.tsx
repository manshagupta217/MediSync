import { useEffect, useState } from "react";
import {
  getSatelliteStatus,
  getAmbulance,
  getRiskZones,
  sendSOS,
  getRemoteDoctor,
} from "./SatelliteService";

export default function SatellitePanel() {
  const [status, setStatus] = useState("");
  const [ambulance, setAmbulance] = useState<any>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    getSatelliteStatus().then((d) => setStatus(d?.mode));

    getRiskZones().then((d) => setZones(d));

    const interval = setInterval(() => {
      getAmbulance().then((d) => setAmbulance(d));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSOS = async () => {
    const res = await sendSOS();
    alert(
      res?.message +
      "\n🏥 " + res?.hospital +
      "\n🚑 " + res?.status
    );
  };

  const handleDoctor = async () => {
    const res = await getRemoteDoctor();
    setDoctor(res);
  };

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm mt-6">

      <h2 className="text-lg font-semibold mb-4">🛰️ Satellite Health System</h2>

      <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-sm">
        {status}
      </div>

      {ambulance && (
        <div className="mb-4 text-sm">
          <p>{ambulance.status}</p>
          <p>ETA: {ambulance.eta}</p>
        </div>
      )}

      {doctor && (
        <div className="mb-4 text-xs bg-primary/5 border rounded-xl p-3">
          <p>{doctor.message}</p>
          <p>{doctor.doctor.name}</p>
          <p>{doctor.doctor.specialty}</p>
          <p>{doctor.doctor.status}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleSOS}
          className="bg-red-600 text-white py-2 rounded-xl"
        >
          🚨 SOS
        </button>

        <button
          onClick={handleDoctor}
          className="bg-primary text-white py-2 rounded-xl"
        >
          🧑‍⚕️ Doctor
        </button>
      </div>
    </div>
  );
}