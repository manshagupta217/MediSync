import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { hospitals, emergencyTypes } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Siren, MapPin, Bed, Wind, Stethoscope, Navigation, CheckCircle2, Phone, Video } from 'lucide-react';

type Phase = 'input' | 'scanning' | 'result';

export default function EmergencyPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>('input');
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('NH-44, Km 23');

  const handleSubmit = () => {
    if (!selectedType) return;
    setPhase('scanning');
    setTimeout(() => setPhase('result'), 2500);
  };

  // For hospital admin, exclude their own hospital
  const availableHospitals = user?.hospitalId
    ? hospitals.filter(h => h.id !== user.hospitalId)
    : hospitals;

  // AI recommendation: sort by score (distance + availability)
  const scored = [...availableHospitals].map(h => ({
    ...h,
    score: (h.icuBeds.available * 3) + (h.ventilators.available * 2) - (h.distance || 0) * 2 - h.emergencyLoad / 10,
  })).sort((a, b) => b.score - a.score);

  const recommended = scored[0];
  const alternatives = scored.slice(1, 4);

  return (
    <div className={`animate-fade-in ${phase === 'scanning' ? 'heartbeat-active rounded-2xl' : ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('emergency_coordination')}</h1>
        <p className="text-sm text-muted-foreground">AI-Powered Emergency Decision Engine</p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Siren className="w-4 h-4 text-destructive" />
                </div>
                <h2 className="font-display text-base font-semibold">New Emergency</h2>
              </div>

              <label className="text-xs text-muted-foreground font-medium block mb-2">Emergency Type</label>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {emergencyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2.5 text-xs rounded-xl border transition-all font-medium ${
                      selectedType === type
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-accent/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <label className="text-xs text-muted-foreground font-medium block mb-2">Patient Location</label>
              <div className="flex gap-2 mb-6">
                <div className="flex-1 flex items-center bg-muted border border-border rounded-xl px-4">
                  <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="bg-transparent py-3 text-sm text-foreground outline-none flex-1"
                    placeholder="Enter location or coordinates"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedType}
                className="w-full bg-destructive text-destructive-foreground py-3 rounded-xl font-semibold text-sm hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                INITIATE EMERGENCY SCAN
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
              <Siren className="w-10 h-10 text-destructive status-pulse" />
            </div>
            <h2 className="font-display text-xl font-bold mb-2">Scanning Hospitals...</h2>
            <p className="text-sm text-muted-foreground mb-8">Analyzing {selectedType} emergency near {location}</p>
            <div className="flex gap-3">
              {availableHospitals.slice(0, 4).map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.3 }}
                  className="bg-card border border-border rounded-xl px-4 py-2 text-xs text-muted-foreground shadow-sm"
                >
                  {h.name.split(' ').slice(0, 2).join(' ')}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* AI Decision */}
            <div className="glass-success rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <div>
                  <h2 className="font-display text-base font-semibold">AI Recommendation</h2>
                  <p className="text-xs text-muted-foreground">Decision: TREAT AT RECOMMENDED HOSPITAL</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{recommended.name}</h3>
                    <span className="text-xs text-muted-foreground">{recommended.distance} km away — {recommended.type}</span>
                  </div>
                  <StatusBadge status={recommended.status} />
                </div>
                <div className="grid grid-cols-4 gap-4 mb-5">
                  {[
                    { icon: Bed, value: recommended.icuBeds.available, label: t('icu_beds') },
                    { icon: Wind, value: recommended.ventilators.available, label: t('ventilators') },
                    { icon: Stethoscope, value: 3, label: 'Specialists' },
                    { icon: MapPin, value: `${recommended.distance} km`, label: 'Distance' },
                  ].map((item, i) => (
                    <div key={i} className="text-center bg-muted/50 rounded-xl p-3">
                      <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-base font-bold text-foreground">{item.value}</div>
                      <div className="text-[10px] text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <Navigation className="w-4 h-4" /> Navigate
                  </button>
                  <button className="px-4 py-3 border border-border rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <button className="px-4 py-3 border border-border rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
                    <Video className="w-4 h-4" /> Video
                  </button>
                </div>
              </div>
            </div>

            {/* Alternatives */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">ALTERNATIVE HOSPITALS (Top 3)</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {alternatives.map(h => (
                <div key={h.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-foreground truncate pr-2">{h.name}</h4>
                    <StatusBadge status={h.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                    <div><span className="font-bold text-foreground">{h.icuBeds.available}</span><br/><span className="text-muted-foreground">ICU</span></div>
                    <div><span className="font-bold text-foreground">{h.ventilators.available}</span><br/><span className="text-muted-foreground">Vent</span></div>
                    <div><span className="font-bold text-foreground">{h.distance} km</span><br/><span className="text-muted-foreground">Dist</span></div>
                  </div>
                  <button className="w-full border border-border text-foreground py-2 rounded-xl text-xs font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                    Select
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase('input')} className="text-sm text-primary font-medium hover:underline">
              ← New Emergency
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
