import { cn } from '@/lib/utils';

type Status = 'available' | 'limited' | 'overloaded' | 'critical' | 'pending' | 'approved' | 'rejected';

const statusStyles: Record<Status, string> = {
  available: 'bg-success/10 text-success border-success/20',
  limited: 'bg-warning/10 text-warning border-warning/20',
  overloaded: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  approved: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn('px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border', statusStyles[status], className)}>
      {status}
    </span>
  );
}
