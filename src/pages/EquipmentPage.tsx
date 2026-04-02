import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { hospitals } from '@/lib/mock-data';
import { AlertTriangle, TrendingUp, TrendingDown, Send, Package } from 'lucide-react';

interface Alert {
  hospital: string;
  type: 'understock' | 'overstock';
  resource: string;
  count: number;
  message: string;
}

const alerts: Alert[] = [
  { hospital: 'District Public Hospital', type: 'understock', resource: 'Ventilators', count: 0, message: 'CRITICAL — 0 ventilators available. Request resources immediately.' },
  { hospital: 'District Public Hospital', type: 'understock', resource: 'ICU Beds', count: 0, message: 'CRITICAL — 0 ICU beds available. Divert incoming patients.' },
  { hospital: 'Metro Private Medical Center', type: 'understock', resource: 'Ventilators', count: 1, message: 'WARNING — Only 1 ventilator available. Pre-emptive sharing recommended.' },
  { hospital: 'Sunrise Multispecialty Hospital', type: 'overstock', resource: 'Ventilators', count: 12, message: 'SURPLUS — 12 idle ventilators. Available for redistribution.' },
  { hospital: 'Sunrise Multispecialty Hospital', type: 'overstock', resource: 'General Beds', count: 80, message: 'SURPLUS — 80 general beds available. Capacity for patient transfers.' },
  { hospital: 'City General Hospital', type: 'overstock', resource: 'Ambulances', count: 4, message: 'SURPLUS — 4 ambulances idle. Can support nearby emergencies.' },
];

export default function EquipmentPage() {
  const { t } = useI18n();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const understockAlerts = alerts.filter(a => a.type === 'understock');
  const overstockAlerts = alerts.filter(a => a.type === 'overstock');

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('equipment_monitoring')}</h1>
          <p className="text-sm text-muted-foreground">Automated understock and overstock alerts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowRequestForm(!showRequestForm); setShowOfferForm(false); }}
            className="px-4 py-2.5 bg-destructive/10 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/20 transition-colors flex items-center gap-2"
          >
            <Package className="w-4 h-4" /> {t('request_resources')}
          </button>
          <button
            onClick={() => { setShowOfferForm(!showOfferForm); setShowRequestForm(false); }}
            className="px-4 py-2.5 bg-success/10 text-success rounded-xl text-sm font-medium hover:bg-success/20 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> {t('offer_resources')}
          </button>
        </div>
      </div>

      {/* Request/Offer forms */}
      {(showRequestForm || showOfferForm) && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold mb-4">{showRequestForm ? t('request_resources') : t('offer_resources')}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Resource Type</label>
              <select className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
                <option>Ventilators</option>
                <option>ICU Beds</option>
                <option>Ambulances</option>
                <option>Operation Theatre</option>
                <option>Specialist Doctor</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">{t('quantity')}</label>
              <input type="number" defaultValue={1} min={1} className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">{showRequestForm ? t('from_hospital') : t('to_hospital')}</label>
              <select className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
                {hospitals.map(h => <option key={h.id}>{h.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Notes</label>
              <input type="text" placeholder="Additional details..." className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none" />
            </div>
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
            Submit Request
          </button>
        </div>
      )}

      {/* Understock */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
          <TrendingDown className="w-4 h-4 text-destructive" />
        </div>
        <h2 className="font-display text-base font-semibold">Understock Alerts</h2>
        <span className="text-xs bg-destructive/10 text-destructive px-2.5 py-1 rounded-full font-semibold">{understockAlerts.length}</span>
      </div>
      <div className="space-y-3 mb-8">
        {understockAlerts.map((a, i) => (
          <div key={i} className="glass-alert rounded-2xl p-5 flex items-center gap-4">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">{a.hospital} — {a.resource}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.message}</div>
            </div>
            <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-xs font-medium hover:bg-destructive/20 transition-colors">
              {t('request_resources')}
            </button>
          </div>
        ))}
      </div>

      {/* Overstock */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-success" />
        </div>
        <h2 className="font-display text-base font-semibold">Surplus Alerts</h2>
        <span className="text-xs bg-success/10 text-success px-2.5 py-1 rounded-full font-semibold">{overstockAlerts.length}</span>
      </div>
      <div className="space-y-3">
        {overstockAlerts.map((a, i) => (
          <div key={i} className="glass-success rounded-2xl p-5 flex items-center gap-4">
            <TrendingUp className="w-5 h-5 text-success shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">{a.hospital} — {a.resource}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.message}</div>
            </div>
            <button className="px-4 py-2 bg-success/10 text-success rounded-xl text-xs font-medium hover:bg-success/20 transition-colors">
              {t('offer_resources')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
