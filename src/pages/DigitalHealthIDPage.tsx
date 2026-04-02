import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { patientRecords } from '@/lib/mock-data';
import { Fingerprint, ArrowLeft, Shield, QrCode, Share2, Download } from 'lucide-react';

export default function DigitalHealthIDPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const record = patientRecords.find(r => r.patientId === user?.patientId);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center">
          <Fingerprint className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('digital_health_id')}</h1>
          <p className="text-sm text-muted-foreground">Your unique digital health identity card</p>
        </div>
      </div>

      {/* Health ID Card */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-8 text-primary-foreground mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-medium opacity-80">GOVERNMENT OF INDIA · DIGITAL HEALTH</span>
          </div>
          <span className="text-xs bg-primary-foreground/20 px-3 py-1 rounded-full">VERIFIED</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <QrCode className="w-14 h-14 opacity-80" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold mb-1">{user?.name || 'Patient Name'}</div>
            <div className="text-lg font-mono tracking-wider mb-2">{record?.patientId || user?.patientId || 'P-XXXX-XXX'}</div>
            <div className="grid grid-cols-3 gap-4 text-xs opacity-80">
              <div><span className="block opacity-60">Age</span>{record?.age || '--'}</div>
              <div><span className="block opacity-60">Gender</span>{record?.gender || '--'}</div>
              <div><span className="block opacity-60">Blood</span>{record?.bloodGroup || '--'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl py-3 text-sm font-medium hover:bg-accent transition-colors">
          <Share2 className="w-4 h-4 text-primary" /> Share Health ID
        </button>
        <button className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl py-3 text-sm font-medium hover:bg-accent transition-colors">
          <Download className="w-4 h-4 text-primary" /> Download Card
        </button>
      </div>

      {/* Info */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">About Digital Health ID</h3>
        <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          <p>Your Digital Health ID is a unique identifier assigned under the National Digital Health Mission.</p>
          <p>Share this ID with hospitals and doctors for instant access to your medical records, prescriptions, and lab reports across the healthcare network.</p>
          <p>Your data is encrypted and accessible only to authorized healthcare providers with your consent.</p>
        </div>
      </div>
    </div>
  );
}
