import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Heart, ArrowLeft, Apple, Droplets, Moon, Dumbbell, Brain, Salad } from 'lucide-react';

const tips = [
  { icon: Apple, title: 'Balanced Diet', desc: 'Include fruits, vegetables, whole grains, and lean protein in every meal for optimal nutrition.', color: 'from-green-500 to-emerald-400' },
  { icon: Droplets, title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily. Increase intake during exercise or hot weather.', color: 'from-blue-500 to-cyan-400' },
  { icon: Moon, title: 'Quality Sleep', desc: 'Aim for 7-9 hours of sleep. Maintain a consistent sleep schedule for better health.', color: 'from-indigo-500 to-purple-400' },
  { icon: Dumbbell, title: 'Regular Exercise', desc: '30 minutes of moderate exercise daily reduces heart disease risk by 40%.', color: 'from-orange-500 to-amber-400' },
  { icon: Brain, title: 'Mental Wellness', desc: 'Practice meditation and mindfulness. Take breaks to reduce stress and improve focus.', color: 'from-pink-500 to-rose-400' },
  { icon: Salad, title: 'Healthy Snacking', desc: 'Replace processed snacks with nuts, fruits, and yogurt for sustained energy.', color: 'from-teal-500 to-cyan-400' },
];

export default function HealthyBytesPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('healthy_bytes')}</h1>
          <p className="text-sm text-muted-foreground">Health tips, articles & wellness recommendations</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tips.map((tip, i) => (
          <div key={i} className="service-card">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-3`}>
              <tip.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{tip.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
