import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { patientRecords } from '@/lib/mock-data';
import { FlaskConical, ArrowLeft, Search, Calendar, FileText } from 'lucide-react';

const availableTests = [
  { name: 'Complete Blood Count (CBC)', price: '₹350', turnaround: '6 hrs' },
  { name: 'Lipid Profile', price: '₹500', turnaround: '12 hrs' },
  { name: 'Thyroid Profile (T3, T4, TSH)', price: '₹650', turnaround: '24 hrs' },
  { name: 'HbA1c (Diabetes)', price: '₹450', turnaround: '12 hrs' },
  { name: 'Liver Function Test (LFT)', price: '₹600', turnaround: '24 hrs' },
  { name: 'Kidney Function Test (KFT)', price: '₹550', turnaround: '24 hrs' },
];

export default function LabTestsPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const record = patientRecords.find(r => r.patientId === user?.patientId);
  const filtered = availableTests.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('lab_tests')}</h1>
          <p className="text-sm text-muted-foreground">Search, book lab tests & view previous reports</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3 mb-6">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lab tests..." className="bg-transparent text-sm text-foreground outline-none flex-1" />
      </div>

      {/* Available tests */}
      <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Book a Test</h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {filtered.map((test, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">{test.name}</div>
              <div className="text-xs text-muted-foreground">Results in {test.turnaround}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">{test.price}</div>
              <button className="text-xs text-primary font-medium hover:underline mt-1">Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Previous reports */}
      {record && (
        <>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Previous Reports</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-xs text-muted-foreground"><th className="text-left px-4 py-3">Test</th><th className="text-left px-4 py-3">Result</th><th className="text-left px-4 py-3">Date</th><th className="text-left px-4 py-3">Hospital</th></tr>
              </thead>
              <tbody>
                {record.labReports.map((r, i) => (
                  <tr key={i} className="border-t border-border"><td className="px-4 py-3 font-medium">{r.test}</td><td className="px-4 py-3">{r.result}</td><td className="px-4 py-3 text-muted-foreground">{r.date}</td><td className="px-4 py-3 text-muted-foreground">{r.hospital}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
