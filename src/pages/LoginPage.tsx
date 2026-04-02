import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, User, Stethoscope, Building2, Ambulance, Shield,
  Mail, Lock, Phone, Globe, Chrome
} from 'lucide-react';
import type { UserRole } from '@/lib/mock-data';

type LoginType = 'email' | 'phone';

const roles: { role: UserRole; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { role: 'patient', label: 'Patient', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { role: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-100' },
  { role: 'hospital_admin', label: 'Hospital Admin', icon: Building2, color: 'text-teal-600', bg: 'bg-teal-100' },
  { role: 'ambulance_coordinator', label: 'Emergency Coordinator', icon: Ambulance, color: 'text-orange-500', bg: 'bg-orange-100' },
  { role: 'gov_authority', label: 'Gov Authority', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const roleRoutes: Record<UserRole, string> = {
  patient: '/dashboard',
  doctor: '/dashboard',
  hospital_admin: '/dashboard',
  ambulance_coordinator: '/emergency',
  gov_authority: '/dashboard',
};

export default function LoginPage() {
  const { login } = useAuth();
  const { t, lang, setLang, languages } = useI18n();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [loginType, setLoginType] = useState<LoginType>('email');

  const handleLogin = () => {
    login(selectedRole);
    navigate(roleRoutes[selectedRole]);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f3f6f9' }}>
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-border/60 shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #47adaa, #3992ce)' }}>
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold text-foreground leading-tight">MediConnect Hub</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">{t('login_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <select
            value={lang}
            onChange={e => setLang(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          {/* Gradient Header */}
          <div
            className="px-6 py-6 text-center"
            style={{ background: 'linear-gradient(135deg, #47adaa, #3992ce)' }}
          >
            <h2 className="text-white text-xl font-bold font-display">{t('login')}</h2>
            <p className="text-white/70 text-xs mt-1">{t('login_subtitle')}</p>
          </div>

          {/* Body */}
          <div className="px-5 py-5 space-y-5">
            {/* Role Selection */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3">{t('select_role')}</p>
              <div className="flex justify-between gap-1">
                {roles.map(r => {
                  const isActive = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => setSelectedRole(r.role)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl text-center transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-50 border-2 border-emerald-400 shadow-sm'
                          : 'bg-muted/40 border-2 border-transparent hover:bg-muted'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-100' : r.bg} transition-colors`}>
                        <r.icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : r.color}`} />
                      </div>
                      <span className={`text-[10px] font-medium leading-tight ${isActive ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Type Toggle */}
            <div className="relative bg-muted rounded-xl p-1 flex">
              <motion.div
                className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm"
                style={{ width: 'calc(50% - 4px)' }}
                animate={{ left: loginType === 'email' ? 4 : 'calc(50% + 0px)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
              {[
                { key: 'email' as LoginType, icon: Mail, label: t('email_password') },
                { key: 'phone' as LoginType, icon: Phone, label: t('phone_otp') },
              ].map(m => (
                <button
                  key={m.key}
                  onClick={() => setLoginType(m.key)}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    loginType === m.key ? 'text-blue-600' : 'text-muted-foreground'
                  }`}
                >
                  <m.icon className="w-3.5 h-3.5" />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <AnimatePresence mode="wait">
              {loginType === 'email' ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">{t('email_password').split('&')[0].trim()}</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="user@mediconnect.in"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white outline-none transition-all group-hover:border-emerald-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white outline-none transition-all group-hover:border-emerald-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">{t('phone_otp').split('+')[0].trim()}</label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white outline-none transition-all group-hover:border-emerald-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">OTP</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t('enter_otp')}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white outline-none transition-all group-hover:border-emerald-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #47adaa, #3992ce)' }}
            >
              {t('login')}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">{t('or').toUpperCase()}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Login */}
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:shadow-md transition-all duration-200"
            >
              <Chrome className="w-4 h-4" />
              {t('google_login')}
            </button>

            {/* Demo Note */}
            <p className="text-center text-[10px] text-muted-foreground">
              Demo: Select any role and click Sign In
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
