import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { Bell, Globe, User, Search, ChevronDown } from 'lucide-react';
import { notifications } from '@/lib/mock-data';
import type { Language } from '@/lib/i18n';

export default function AppHeader() {
  const { user } = useAuth();
  const { t, lang, setLang, languages } = useI18n();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2 w-96">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            placeholder={`${t('search')}...`}
            className="bg-transparent text-sm text-foreground outline-none flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={lang}
              onChange={e => setLang(e.target.value as Language)}
              className="bg-transparent text-sm text-foreground outline-none cursor-pointer"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-muted hover:bg-accent transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 glass rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-display text-sm font-semibold">{t('notifications')}</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-border/50 ${!n.read ? 'bg-accent/30' : ''}`}>
                      <p className="text-xs text-foreground leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-muted-foreground mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center">
                  <button className="text-xs text-primary font-medium hover:underline">{t('view_all')}</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 hover:bg-accent transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-foreground">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
