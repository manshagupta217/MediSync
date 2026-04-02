import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { analyticsData } from '@/lib/mock-data';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(0, 0%, 100%)',
  border: '1px solid hsl(214, 20%, 88%)',
  borderRadius: '12px',
  color: 'hsl(215, 25%, 15%)',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const isDoctor = user?.role === 'doctor';

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('analytics')}</h1>
        <p className="text-sm text-muted-foreground">
          {isDoctor ? `${user?.name} — Personal Analytics` : `${user?.hospital || 'Network'} performance metrics`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* ICU Utilization / Doctor Schedule */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            {isDoctor ? 'DAILY SCHEDULE (Patients per Hour)' : 'ICU UTILIZATION BY HOSPITAL'}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={isDoctor ? analyticsData.doctorSchedule : analyticsData.icuUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
              <XAxis dataKey={isDoctor ? 'hour' : 'name'} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey={isDoctor ? 'patients' : 'utilization'} radius={[6, 6, 0, 0]}>
                {(isDoctor ? analyticsData.doctorSchedule : analyticsData.icuUtilization).map((entry: any, i: number) => {
                  const val = isDoctor ? entry.patients : entry.utilization;
                  return <Cell key={i} fill={val >= 5 ? 'hsl(0, 72%, 51%)' : val >= 3 ? 'hsl(38, 92%, 50%)' : 'hsl(174, 62%, 40%)'} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Load / Weekly Graph */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            {isDoctor ? 'WEEKLY PATIENT LOAD' : 'NETWORK LOAD (24H)'}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            {isDoctor ? (
              <BarChart data={analyticsData.appointmentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="hsl(174, 62%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={analyticsData.hourlyLoad}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
                <XAxis dataKey="hour" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="load" stroke="hsl(174, 62%, 40%)" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Appointment Stats */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            {isDoctor ? 'CONSULTATION TYPES' : 'APPOINTMENT STATISTICS (WEEKLY)'}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analyticsData.appointmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
              <XAxis dataKey="day" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" fill="hsl(38, 92%, 50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Usage */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            {isDoctor ? 'RESPONSE TIME TREND' : 'MOST USED EQUIPMENT'}
          </h3>
          {isDoctor ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={analyticsData.responseTimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10 }} axisLine={false} tickLine={false} unit=" min" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="avgMinutes" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ fill: 'hsl(0, 72%, 51%)' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="space-y-4 mt-2">
              {analyticsData.equipmentUsage.map(eq => {
                const pct = (eq.used / eq.total) * 100;
                return (
                  <div key={eq.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-foreground">{eq.name}</span>
                      <span className="text-muted-foreground">{eq.used}/{eq.total} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-destructive' : pct >= 70 ? 'bg-warning' : 'bg-success'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
