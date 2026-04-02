import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import {
  LayoutDashboard, Ambulance, Users, Package, ArrowLeftRight,
  BarChart3, Map, AlertTriangle, LogOut, Stethoscope, Activity,
  Heart, FileText, User, Shield
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, labelKey: 'dashboard', path: '/dashboard', roles: ['hospital_admin', 'ambulance_coordinator', 'doctor', 'patient', 'gov_authority'] },
  { icon: Ambulance, labelKey: 'emergency', path: '/emergency', roles: ['ambulance_coordinator', 'hospital_admin'] },
  { icon: Package, labelKey: 'resources', path: '/resources', roles: ['hospital_admin'] },
  { icon: ArrowLeftRight, labelKey: 'sharing', path: '/sharing', roles: ['hospital_admin'] },
  { icon: AlertTriangle, labelKey: 'equipment', path: '/equipment', roles: ['hospital_admin'] },
  { icon: Stethoscope, labelKey: 'doctors', path: '/doctors', roles: ['hospital_admin', 'doctor', 'ambulance_coordinator'] },
  { icon: FileText, labelKey: 'patient_records', path: '/patient-records', roles: ['hospital_admin', 'doctor'] },
  { icon: Map, labelKey: 'map', path: '/map', roles: ['hospital_admin', 'ambulance_coordinator', 'patient'] },
  { icon: BarChart3, labelKey: 'analytics', path: '/analytics', roles: ['hospital_admin', 'doctor', 'gov_authority'] },
  { icon: Shield, labelKey: 'gov_dashboard', path: '/gov-dashboard', roles: ['gov_authority'] },
  { icon: User, labelKey: 'profile', path: '/profile', roles: ['hospital_admin', 'ambulance_coordinator', 'doctor', 'patient', 'gov_authority'] },
];

export default function NavRail() {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredItems = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <motion.nav
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-50 flex flex-col shadow-sm"
      animate={{ width: expanded ? 240 : 72 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="font-display text-base font-bold text-foreground">MediSync</span>
            <span className="block text-[9px] text-muted-foreground">Healthcare Platform</span>
          </motion.div>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap text-sm">
                  {t(item.labelKey)}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-border p-2">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t('logout')}</motion.span>}
        </button>
      </div>
    </motion.nav>
  );
}
