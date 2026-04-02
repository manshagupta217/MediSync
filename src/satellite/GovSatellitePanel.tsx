import { useEffect, useState } from "react";
import {
  getSatelliteStatus,
  getRiskZones,
  getAmbulance
} from "./SatelliteService";

export default function GovSatellitePanel() {
  const [status, setStatus] = useState("");
  const [zones, setZones] = useState<any[]>([]);
  const [ambulance, setAmbulance] = useState<any>(null);

  useEffect(() => {
    getSatelliteStatus().then((d) => setStatus(d?.mode));

    getRiskZones().then((d) => setZones(d));

    const interval = setInterval(() => {
      getAmbulance().then((d) => setAmbulance(d));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm mt-6">

      <h2 className="text-lg font-semibold mb-4">🛰️ Government Satellite Monitoring</h2>

      <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-sm">
        {status}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium mb-2">📍 Rural Risk Zones</p>

        {zones.length === 0 ? (
          <p className="text-xs text-muted-foreground">No data</p>
        ) : (
          zones.map((z, i) => (
            <div key={i} className="flex justify-between text-xs py-1">
              <span>{z.name}</span>
              <span className={
                z.risk === "High"
                  ? "text-red-500"
                  : z.risk === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }>
                {z.risk}
              </span>
            </div>
          ))
        )}
      </div>

      {ambulance && (
        <div className="text-xs border-t pt-3">
          <p className="font-medium mb-1">🚑 Live Emergency Monitoring</p>
          <p>{ambulance.status}</p>
          <p>ETA: {ambulance.eta}</p>
        </div>
      )}
    </div>
  );
}