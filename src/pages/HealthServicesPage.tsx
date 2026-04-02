import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Stethoscope, ArrowLeft, Baby, Eye, Bone, Brain, HeartPulse, Syringe, Microscope, Ear } from 'lucide-react';

const services = [
  { icon: HeartPulse, title: 'Cardiology', desc: 'Heart health screenings, ECG, and consultations', color: 'from-red-500 to-pink-400' },
  { icon: Brain, title: 'Neurology', desc: 'Brain and nerve disorder diagnosis and treatment', color: 'from-purple-500 to-violet-400' },
  { icon: Bone, title: 'Orthopedics', desc: 'Bone, joint, and muscle care services', color: 'from-orange-500 to-amber-400' },
  { icon: Eye, title: 'Ophthalmology', desc: 'Eye exams, vision tests, and surgical care', color: 'from-blue-500 to-cyan-400' },
  { icon: Baby, title: 'Pediatrics', desc: 'Child healthcare, vaccinations, and growth monitoring', color: 'from-green-500 to-emerald-400' },
  { icon: Syringe, title: 'Vaccination', desc: 'Immunization programs and booster doses', color: 'from-teal-500 to-cyan-400' },
  { icon: Microscope, title: 'Pathology', desc: 'Advanced diagnostic testing and biopsy services', color: 'from-indigo-500 to-blue-400' },
  { icon: Ear, title: 'ENT', desc: 'Ear, nose, and throat specialist consultations', color: 'from-pink-500 to-rose-400' },
];

export default function HealthServicesPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-400 flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('health_services')}</h1>
          <p className="text-sm text-muted-foreground">Additional healthcare services offered on the platform</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <div key={i} className="service-card text-center">
            <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
