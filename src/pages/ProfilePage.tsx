import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { User, Camera, Shield, FileText, HelpCircle, Lock, Info, ChevronRight } from 'lucide-react';

const settingsItems = [
  { icon: Info, labelKey: 'about' },
  { icon: Shield, labelKey: 'privacy_policy' },
  { icon: FileText, labelKey: 'terms' },
  { icon: Lock, labelKey: 'security' },
  { icon: HelpCircle, labelKey: 'faq' },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('profile')}</h1>

      {/* Profile card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-accent transition-colors">
              <Camera className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="text-lg font-bold bg-muted border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary/30 w-full mb-1"
              />
            ) : (
              <h2 className="text-lg font-bold text-foreground">{user?.name}</h2>
            )}
            <p className="text-sm text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
            {user?.hospital && <p className="text-xs text-primary mt-1">{user.hospital}</p>}
            {user?.patientId && <p className="text-xs text-primary mt-1">ID: {user.patientId}</p>}
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            {editing ? 'Save' : t('edit_profile')}
          </button>
        </div>
      </div>

      {/* Personal details */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-base mb-4">{t('personal_details')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Full Name</label>
            <div className="bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground">{user?.name}</div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Role</label>
            <div className="bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground capitalize">{user?.role?.replace('_', ' ')}</div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Email</label>
            <div className="bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground">demo@medisync.gov.in</div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Phone</label>
            <div className="bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground">+91 98765 43210</div>
          </div>
        </div>
      </div>

      {/* Settings links */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <h3 className="font-semibold text-base px-6 pt-5 pb-3">{t('settings')}</h3>
        {settingsItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(activeSection === item.labelKey ? null : item.labelKey)}
            className="w-full flex items-center gap-3 px-6 py-4 border-t border-border hover:bg-accent/30 transition-colors text-left"
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium text-foreground">{t(item.labelKey)}</span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === item.labelKey ? 'rotate-90' : ''}`} />
          </button>
        ))}
      </div>

      {activeSection && (
        <div className="mt-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-base mb-3">{t(activeSection)}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {activeSection === 'about' && 'MediSync is a Government Healthcare Coordination Platform connecting hospitals, doctors, patients and emergency services for efficient healthcare delivery across the national network.'}
            {activeSection === 'privacy_policy' && 'Your data is protected under the Digital Personal Data Protection Act, 2023. We collect only essential health data and share it exclusively within the registered healthcare network with your explicit consent.'}
            {activeSection === 'terms' && 'By using MediSync, you agree to provide accurate health information, maintain the confidentiality of your credentials, and use the platform for legitimate healthcare purposes only.'}
            {activeSection === 'security' && 'MediSync uses end-to-end encryption, role-based access control, and regular security audits. All health records are stored in compliance with national health data standards.'}
            {activeSection === 'faq' && 'Q: How do I share my records with a doctor?\nA: Share your Patient ID and the doctor can access your records instantly.\n\nQ: Is my data safe?\nA: Yes, all data is encrypted and DPDPA compliant.'}
          </p>
        </div>
      )}
    </div>
  );
}
