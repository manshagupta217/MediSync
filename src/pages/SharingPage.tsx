import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { resourceRequests } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { ArrowLeftRight, Check, X } from 'lucide-react';

export default function SharingPage() {
  const { t } = useI18n();
  const [requests, setRequests] = useState(resourceRequests);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('sharing')}</h1>
        <p className="text-sm text-muted-foreground">Inter-hospital resource requests and approvals</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-xs text-muted-foreground font-medium">
              <th className="text-left px-5 py-3">{t('resource_name')}</th>
              <th className="text-left px-5 py-3">{t('from_hospital')}</th>
              <th className="text-left px-5 py-3">{t('to_hospital')}</th>
              <th className="text-center px-5 py-3">{t('quantity')}</th>
              <th className="text-center px-5 py-3">{t('status')}</th>
              <th className="text-center px-5 py-3">{t('time')}</th>
              <th className="text-center px-5 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-t border-border hover:bg-accent/30 transition-colors">
                <td className="px-5 py-4 font-medium text-foreground">{r.resourceType}</td>
                <td className="px-5 py-4 text-foreground">{r.fromHospital}</td>
                <td className="px-5 py-4 text-foreground">{r.toHospital}</td>
                <td className="px-5 py-4 text-center text-foreground">{r.quantity}</td>
                <td className="px-5 py-4 text-center"><StatusBadge status={r.status} /></td>
                <td className="px-5 py-4 text-center text-xs text-muted-foreground">{r.timestamp}</td>
                <td className="px-5 py-4 text-center">
                  {r.status === 'pending' && (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => updateStatus(r.id, 'approved')} className="w-8 h-8 rounded-xl bg-success/10 text-success hover:bg-success/20 transition-colors flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(r.id, 'rejected')} className="w-8 h-8 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center justify-center">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
