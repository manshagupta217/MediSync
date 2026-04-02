import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { patientRecords } from '@/lib/mock-data';
import { FileText, ArrowLeft, Activity, Pill, FlaskConical, Weight, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function HealthRecordsPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const record = patientRecords.find(r => r.patientId === user?.patientId);

  if (!record) return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="text-center py-20 text-muted-foreground">No health records found.</div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('health_records')}</h1>
          <p className="text-sm text-muted-foreground">Complete medical history, reports & consultations</p>
        </div>
      </div>

      {/* Patient info */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{record.patientName}</span></div>
          <div><span className="text-muted-foreground">Age:</span> <span className="font-medium">{record.age}</span></div>
          <div><span className="text-muted-foreground">Blood:</span> <span className="font-medium">{record.bloodGroup}</span></div>
          <div><span className="text-muted-foreground">Conditions:</span> <span className="font-medium">{record.conditions.join(', ')}</span></div>
        </div>
      </div>

      {/* Trends */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Weight className="w-4 h-4 text-primary" /> Weight Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={record.weightRecords}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Droplets className="w-4 h-4 text-destructive" /> Hemoglobin Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={record.hemoglobinRecords}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="value" stroke="hsl(var(--destructive))" strokeWidth={2} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visits */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Hospital Visits</h3>
        {record.hospitalVisits.map((v, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Activity className="w-4 h-4 text-primary" /></div>
            <div className="flex-1"><div className="text-sm font-medium">{v.hospital}</div><div className="text-xs text-muted-foreground">{v.doctor} · {v.diagnosis}</div></div>
            <span className="text-xs text-muted-foreground">{v.date}</span>
          </div>
        ))}
      </div>

      {/* Prescriptions & Lab */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Pill className="w-4 h-4 text-success" /> Prescriptions</h3>
          {record.prescriptions.map((p, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
              <div><span className="text-sm font-medium">{p.medicine}</span><br/><span className="text-xs text-muted-foreground">{p.dosage}</span></div>
              <span className="text-xs text-muted-foreground">{p.date}</span>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><FlaskConical className="w-4 h-4 text-blue-500" /> Lab Reports</h3>
          {record.labReports.map((l, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
              <div><span className="text-sm font-medium">{l.test}</span><br/><span className="text-xs text-muted-foreground">{l.result}</span></div>
              <span className="text-xs text-muted-foreground">{l.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
