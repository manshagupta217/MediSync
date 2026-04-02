import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { doctors } from '@/lib/mock-data';
import { Stethoscope, Video, User, Search, Phone, Calendar, Clock } from 'lucide-react';

export default function DoctorsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [filter, setFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [requestMode, setRequestMode] = useState<string | null>(null);

  // Show only doctors from admin's hospital if logged in as admin
  const baseDoctors = user?.role === 'hospital_admin' && user.hospitalId
    ? doctors.filter(d => d.hospitalId === user.hospitalId)
    : doctors;

  const specialties = Array.from(new Set(baseDoctors.map(d => d.specialty)));
  const filtered = baseDoctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(filter.toLowerCase()) || d.specialty.toLowerCase().includes(filter.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('specialist_directory')}</h1>
        <p className="text-sm text-muted-foreground">
          {user?.role === 'hospital_admin' ? `${user.hospital} — Doctors` : 'Live availability across the hospital network'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-card border border-border rounded-xl px-4">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder={`${t('search')} by name or specialty...`}
            className="bg-transparent py-2.5 text-sm text-foreground outline-none flex-1"
          />
        </div>
        <select
          value={specialtyFilter}
          onChange={e => setSpecialtyFilter(e.target.value)}
          className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none"
        >
          <option value="all">All Specialties</option>
          {specialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Directory */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${doc.available ? 'bg-success/10' : 'bg-muted'}`}>
                <User className={`w-6 h-6 ${doc.available ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">{doc.name}</h3>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${doc.available ? 'bg-success' : 'bg-muted-foreground'}`} />
                </div>
                <div className="text-xs text-primary font-medium mb-0.5">{doc.specialty}</div>
                <div className="text-xs text-muted-foreground mb-1">{doc.degree} · {doc.experience} yrs exp</div>
                <div className="text-xs text-muted-foreground mb-2">{doc.hospital}</div>

                {/* Free slots */}
                {doc.freeSlots.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.freeSlots.map(slot => (
                      <span key={slot} className="px-2 py-0.5 bg-success/10 text-success text-[10px] rounded-full font-medium flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {slot}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    {doc.consultationMode === 'telemedicine' || doc.consultationMode === 'both' ? (
                      <><Video className="w-3 h-3" /> Telemedicine</>
                    ) : (
                      <><Stethoscope className="w-3 h-3" /> In-person</>
                    )}
                  </span>
                  {doc.available && user?.role !== 'doctor' && (
                    <div className="flex gap-1 ml-auto">
                      <button className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-medium hover:bg-primary/20 transition-colors flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Book
                      </button>
                      <button className="text-[10px] bg-accent text-accent-foreground px-2.5 py-1 rounded-lg font-medium hover:bg-accent/80 transition-colors flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Call
                      </button>
                      <button className="text-[10px] bg-accent text-accent-foreground px-2.5 py-1 rounded-lg font-medium hover:bg-accent/80 transition-colors flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
