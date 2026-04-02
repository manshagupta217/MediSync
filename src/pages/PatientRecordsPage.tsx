import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { patientRecords } from '@/lib/mock-data';
import PatientRisk from "../components/PatientRisk"; 
import { Search, FileText, Activity, Pill, FlaskConical, Weight, Droplets } from 'lucide-react';

export default function PatientRecordsPage() {
  const { t } = useI18n();
  const [searchId, setSearchId] = useState('');
  const [foundRecord, setFoundRecord] = useState<typeof patientRecords[0] | null>(null);

  const handleSearch = () => {
    const record = patientRecords.find(r => r.patientId === searchId);
    setFoundRecord(record || null);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{t('patient_records')}</h1>
      <p className="text-sm text-muted-foreground mb-6">Access patient records using Patient ID</p>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 flex items-center bg-card border border-border rounded-xl px-4">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Enter Patient ID (e.g., P-2024-001)"
            className="bg-transparent py-3 text-sm text-foreground outline-none flex-1"
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          {t('search')}
        </button>
      </div>

      {/* Quick access demo IDs */}
      <div className="flex gap-2 mb-6">
        <span className="text-xs text-muted-foreground">Try:</span>
        {patientRecords.map(r => (
          <button
            key={r.patientId}
            onClick={() => { setSearchId(r.patientId); setFoundRecord(r); }}
            className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            {r.patientId}
          </button>
        ))}
      </div>

      {foundRecord && (
        <div className="space-y-6">
          {/* Patient info */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">{foundRecord.patientName}</h2>
                <p className="text-sm text-primary">ID: {foundRecord.patientId}</p>
              </div>
              <div className="text-right text-sm">
                <div><span className="text-muted-foreground">Age:</span> {foundRecord.age} · {foundRecord.gender}</div>
                <div><span className="text-muted-foreground">Blood:</span> {foundRecord.bloodGroup}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {foundRecord.conditions.map(c => (
                <span key={c} className="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>

          
          <PatientRisk
  patientData={{
    age: foundRecord.age,
    gender: foundRecord.gender,
    bmi: 22,
    blood_pressure: 120,
    heart_rate: 80,
    oxygen_level: 98,
    body_temperature: 98.6,
    respiratory_rate: 16,
    diabetes: foundRecord.conditions.includes("Type 2 Diabetes") ? 1 : 0,
    hypertension: foundRecord.conditions.includes("Hypertension") ? 1 : 0,
    heart_disease: 0,
    smoking: 0,
    alcohol_use: 0,
    previous_hospitalizations: foundRecord.hospitalVisits.length,
    symptoms_severity: "Mild"
  }}
/>

          {/* Hospital visits */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-primary" /> Hospital Visits</h3>
            {foundRecord.hospitalVisits.map((v, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{v.hospital}</div>
                  <div className="text-xs text-muted-foreground">{v.doctor} — {v.diagnosis}</div>
                </div>
                <span className="text-xs text-muted-foreground">{v.date}</span>
              </div>
            ))}
          </div>

          {/* Prescriptions & Labs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-4"><Pill className="w-4 h-4 text-success" /> Prescriptions</h3>
              {foundRecord.prescriptions.map((p, i) => (
                <div key={i} className="py-2 border-b border-border/50 last:border-0">
                  <div className="text-sm font-medium">{p.medicine}</div>
                  <div className="text-xs text-muted-foreground">{p.dosage} · {p.date}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-4"><FlaskConical className="w-4 h-4 text-primary" /> Lab Reports</h3>
              {foundRecord.labReports.map((l, i) => (
                <div key={i} className="py-2 border-b border-border/50 last:border-0">
                  <div className="text-sm font-medium">{l.test}: {l.result}</div>
                  <div className="text-xs text-muted-foreground">{l.hospital} · {l.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weight & Hemoglobin */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-4"><Weight className="w-4 h-4 text-warning" /> Weight Records</h3>
              <div className="space-y-2">
                {foundRecord.weightRecords.map((w, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{w.weight} kg</span>
                    <span className="text-muted-foreground">{w.date}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2 mb-4"><Droplets className="w-4 h-4 text-destructive" /> Hemoglobin Records</h3>
              <div className="space-y-2">
                {foundRecord.hemoglobinRecords.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{h.value} g/dL</span>
                    <span className="text-muted-foreground">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {searchId && !foundRecord && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No patient record found for ID: {searchId}</p>
        </div>
      )}
    </div>
  );
}
