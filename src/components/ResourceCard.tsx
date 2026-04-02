import { cn } from '@/lib/utils';

interface ResourceCardProps {
  icon: React.ElementType;
  label: string;
  available: number;
  total: number;
  compact?: boolean;
}

export default function ResourceCard({ icon: Icon, label, available, total, compact }: ResourceCardProps) {
  const pct = total > 0 ? ((total - available) / total) * 100 : 100;
  const status = pct >= 90 ? 'critical' : pct >= 70 ? 'warning' : 'success';

  const barColor = {
    critical: 'bg-destructive',
    warning: 'bg-warning',
    success: 'bg-success',
  }[status];

  const iconColor = {
    critical: 'text-destructive',
    warning: 'text-warning',
    success: 'text-success',
  }[status];

  return (
    <div className={cn('bg-card border border-border rounded-xl shadow-sm', compact ? 'p-3' : 'p-5')}>
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', status === 'critical' ? 'bg-destructive/10' : status === 'warning' ? 'bg-warning/10' : 'bg-success/10')}>
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-foreground">{available}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground mt-1.5 block">{pct.toFixed(0)}% utilized</span>
    </div>
  );
}
