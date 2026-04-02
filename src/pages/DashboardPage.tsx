import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { hospitals, doctors } from '@/lib/mock-data';
import ResourceCard from '@/components/ResourceCard';
import StatusBadge from '@/components/StatusBadge';
import {
  Bed, Wind, Ambulance, Scissors, Building2,
  Activity, Users, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import SatellitePanel from "@/satellite/SatellitePanel";

const BASE_URL = "https://mediconnect-backend-auqx.onrender.com";
const myHospital = hospitals[0];

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useI18n();

  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [dynamicHospitals, setDynamicHospitals] = useState(hospitals);

  const hospitalDoctors = selectedHospital
    ? doctors.filter(d => d.hospitalId === selectedHospital)
    : [];

  const selectedH = dynamicHospitals.find(h => h.id === selectedHospital);

  // 🚨 Emergency
  const handleEmergency = () => {
    alert("🚨 Emergency received\n🚑 Dispatch ambulance");
  };

  // 👨‍⚕️ Remote Doctor
  const handleDoctor = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8001/remote-doctor");
      const data = await res.json();
      setDoctor(data);
    } catch {
      setDoctor(null);
    }
  };

  // 🧠 HOSPITAL ML
  const handleHospitalPrediction = async () => {
    try {
      console.log("CLICK WORKING ✅");

      const res = await fetch(`${BASE_URL}/predict-hospital`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          icu_beds: 10,
          ventilators: 5,
          doctors_total: 20,
          distance_km: 3.5,
          ambulance_count: 4,
          total_beds: 50,
          hospital_type: 1,
          specialization_available: 1,
          emergency_services: 1
        })
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      console.log("API RESPONSE:", data);

      const updated = dynamicHospitals.map((h, index) => {
        if (index === 0) {
          const predictedStatus: 'available' | 'limited' | 'overloaded' =
            data.load > 70 ? 'overloaded' : data.load > 40 ? 'limited' : 'available';

          return {
            ...h,
            icuBeds: {
              ...h.icuBeds,
              available: data.available_icu
            },
            emergencyLoad: data.load === 0 ? 65 : data.load, // 👈 visibility fix
            status: predictedStatus
          };
        }
        return h;
      });

      setDynamicHospitals(updated);

    } catch (err) {
      console.error("ERROR:", err);
      alert("Backend not reachable — use Swagger");
    }
  };

  // 🧠 PATIENT RISK (NEW)
  const handlePatientRisk = async () => {
    try {
      console.log("PATIENT CLICKED ✅");

      const res = await fetch(`${BASE_URL}/predict-patient-risk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: 45,
          oxygen_level: 92,
          heart_rate: 110
        })
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      console.log("PATIENT RESPONSE:", data);

      alert(`🧠 Patient Risk Level: ${data.risk_level}`);

    } catch (err) {
      console.error(err);
      alert("Risk analysis failed");
    }
  };

  return (
    <div className="animate-fade-in">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {t('welcome')}, {user?.name} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          {user?.role === 'hospital_admin' ? myHospital.name : t('dashboard')}
        </p>
      </div>

      {/* Resource Cards */}
      {user?.role === 'hospital_admin' && (
        <div className="grid grid-cols-5 gap-4 mb-8">
          <ResourceCard icon={Bed} label="ICU" available={myHospital.icuBeds.available} total={myHospital.icuBeds.total} />
          <ResourceCard icon={Bed} label="Beds" available={myHospital.generalBeds.available} total={myHospital.generalBeds.total} />
          <ResourceCard icon={Wind} label="Vent" available={myHospital.ventilators.available} total={myHospital.ventilators.total} />
          <ResourceCard icon={Scissors} label="OT" available={myHospital.operationTheatres.available} total={myHospital.operationTheatres.total} />
          <ResourceCard icon={Ambulance} label="Ambulance" available={myHospital.ambulances.available} total={myHospital.ambulances.total} />
        </div>
      )}

      {/* Table */}
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Hospital Network</h2>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <tbody>
            {dynamicHospitals.map((h) => (
              <tr key={h.id} className="border-t">
                <td className="px-5 py-4">{h.name}</td>
                <td className="px-5 py-4">{h.type}</td>
                <td className="px-5 py-4 text-center">{h.icuBeds.available}/{h.icuBeds.total}</td>
                <td className="px-5 py-4 text-center">{h.generalBeds.available}/{h.generalBeds.total}</td>
                <td className="px-5 py-4 text-center">{h.ventilators.available}/{h.ventilators.total}</td>
                <td className="px-5 py-4 text-center">{h.emergencyLoad}%</td>
                <td className="px-5 py-4 text-center">
                  <StatusBadge status={h.status} />
                </td>
                <td>
                  <button onClick={() => setSelectedHospital(h.id)}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Network Capacity */}
      <div className="bg-card border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-3">Network Capacity</h3>
        <div className="grid grid-cols-5 gap-4">
          {dynamicHospitals.map(h => (
            <div key={h.id} className="text-center">
              <div className="text-xs">{h.name}</div>
              <div className="text-xl font-bold">{100 - h.emergencyLoad}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 HOSPITAL BUTTON */}
      <div className="mb-4">
        <button
          onClick={handleHospitalPrediction}
          className="w-full py-3 bg-primary text-white rounded-xl cursor-pointer"
        >
          🚀 Get Smart Hospital Recommendation
        </button>
      </div>

      {/* 🧠 PATIENT BUTTON */}
      <div className="mb-6">
        <button
          onClick={handlePatientRisk}
          className="w-full py-3 bg-primary text-white rounded-xl cursor-pointer"
        >
          🧠 Analyze Patient Risk
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={handleEmergency} className="bg-red-600 text-white p-3 rounded-xl">
          Emergency
        </button>
        <button onClick={handleDoctor} className="bg-primary text-white p-3 rounded-xl">
          Connect Doctor
        </button>
      </div>

      <div className="mt-6">
        <SatellitePanel />
      </div>

    </div>
  );
}