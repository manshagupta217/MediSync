import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { doctors } from '@/lib/mock-data';
import { Video, ArrowLeft, Phone, Calendar, Clock } from 'lucide-react';

export default function TeleconsultationPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const teleconsultDoctors = doctors.filter(d => d.consultationMode === 'telemedicine' || d.consultationMode === 'both');

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center">
          <Video className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('teleconsultation')}</h1>
          <p className="text-sm text-muted-foreground">Connect with doctors via video consultation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {teleconsultDoctors.map(doc => (
          <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${doc.available ? 'bg-success/10' : 'bg-muted'}`}>
                <Video className={`w-5 h-5 ${doc.available ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{doc.name}</div>
                <div className="text-xs text-primary">{doc.specialty}</div>
                <div className="text-xs text-muted-foreground">{doc.degree} · {doc.experience} yrs</div>
              </div>
              <span className={`w-3 h-3 rounded-full ${doc.available ? 'bg-success' : 'bg-muted-foreground'}`} />
            </div>
            <div className="text-xs text-muted-foreground mb-3">{doc.hospital}</div>
            {doc.freeSlots.length > 0 && (
              <div className="flex items-center gap-1 mb-3 flex-wrap">
                <Clock className="w-3 h-3 text-muted-foreground" />
                {doc.freeSlots.map((slot, i) => (
                  <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{slot}</span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button disabled={!doc.available} className="flex-1 flex items-center justify-center gap-1 bg-primary text-primary-foreground py-2 rounded-xl text-xs font-medium disabled:opacity-50">
                <Video className="w-3 h-3" /> Video Call
              </button>
              <button disabled={!doc.available} className="flex items-center justify-center gap-1 border border-border px-3 py-2 rounded-xl text-xs font-medium hover:bg-accent disabled:opacity-50">
                <Phone className="w-3 h-3" /> Call
              </button>
              <button disabled={!doc.available} className="flex items-center justify-center gap-1 border border-border px-3 py-2 rounded-xl text-xs font-medium hover:bg-accent disabled:opacity-50">
                <Calendar className="w-3 h-3" /> Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
