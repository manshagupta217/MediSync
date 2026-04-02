import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { hospitals, doctors } from '@/lib/mock-data';
import { Calendar, ArrowLeft, Clock, MapPin, Stethoscope } from 'lucide-react';

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [...new Set(doctors.map(d => d.specialty))];
  const filteredDoctors = doctors.filter(d =>
    (selectedHospital ? d.hospitalId === selectedHospital : true) &&
    (selectedSpecialty ? d.specialty === selectedSpecialty : true) &&
    d.available
  );

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('appointments')}</h1>
          <p className="text-sm text-muted-foreground">Book appointments with hospitals and doctors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select value={selectedHospital} onChange={e => setSelectedHospital(e.target.value)} className="bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none flex-1">
          <option value="">All Hospitals</option>
          {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
        </select>
        <select value={selectedSpecialty} onChange={e => setSelectedSpecialty(e.target.value)} className="bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none flex-1">
          <option value="">All Specializations</option>
          {specialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Doctor slots */}
      <div className="grid grid-cols-2 gap-4">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-sm font-semibold">{doc.name}</div>
                <div className="text-xs text-primary">{doc.specialty}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" /> {doc.hospital}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {doc.freeSlots.map((slot, i) => (
                <button key={i} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                  <Clock className="w-3 h-3" /> {slot}
                </button>
              ))}
            </div>
            <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              Book Appointment
            </button>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">No available doctors for selected filters.</div>
        )}
      </div>
    </div>
  );
}
