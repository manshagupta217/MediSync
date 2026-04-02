import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { hospitals } from '@/lib/mock-data';
import ResourceCard from '@/components/ResourceCard';
import { Bed, Wind, Ambulance, Scissors, Package, Minus, Plus } from 'lucide-react';

const myHospital = hospitals[0];

export default function ResourcesPage() {
  const { t } = useI18n();
  const [resources, setResources] = useState({
    icuBeds: { ...myHospital.icuBeds },
    generalBeds: { ...myHospital.generalBeds },
    ventilators: { ...myHospital.ventilators },
    operationTheatres: { ...myHospital.operationTheatres },
    ambulances: { ...myHospital.ambulances },
  });

  const resourceList = [
    { key: 'icuBeds' as const, icon: Bed, label: t('icu_beds') },
    { key: 'generalBeds' as const, icon: Bed, label: t('general_beds') },
    { key: 'ventilators' as const, icon: Wind, label: t('ventilators') },
    { key: 'operationTheatres' as const, icon: Scissors, label: t('op_theatres') },
    { key: 'ambulances' as const, icon: Ambulance, label: t('ambulances') },
  ];

  const updateAvailable = (key: keyof typeof resources, delta: number) => {
    setResources(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        available: Math.max(0, Math.min(prev[key].total, prev[key].available + delta)),
      },
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('resource_management')}</h1>
        <p className="text-sm text-muted-foreground">{myHospital.name} — Update real-time availability</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {resourceList.map(r => (
          <ResourceCard key={r.key} icon={r.icon} label={r.label} available={resources[r.key].available} total={resources[r.key].total} />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-primary" />
        <h2 className="font-display text-base font-semibold">Update Availability</h2>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-xs text-muted-foreground font-medium">
              <th className="text-left px-5 py-3">Resource</th>
              <th className="text-center px-5 py-3">Total</th>
              <th className="text-center px-5 py-3">{t('available')}</th>
              <th className="text-center px-5 py-3">Occupied</th>
              <th className="text-center px-5 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {resourceList.map(r => {
              const data = resources[r.key];
              return (
                <tr key={r.key} className="border-t border-border">
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <r.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{r.label}</span>
                  </td>
                  <td className="px-5 py-4 text-center text-foreground">{data.total}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={data.available <= 2 ? 'text-destructive font-bold' : 'text-success font-bold'}>
                      {data.available}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-foreground">{data.total - data.available}</td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateAvailable(r.key, -1)}
                        className="w-8 h-8 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateAvailable(r.key, 1)}
                        className="w-8 h-8 rounded-xl bg-success/10 text-success hover:bg-success/20 transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
