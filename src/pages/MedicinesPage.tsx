import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import { patientRecords } from '@/lib/mock-data';
import { Pill, ArrowLeft, Search, Upload, ShoppingCart } from 'lucide-react';

const medicines = [
  { name: 'Paracetamol 500mg', category: 'Pain Relief', price: '₹25', inStock: true },
  { name: 'Amoxicillin 250mg', category: 'Antibiotic', price: '₹85', inStock: true },
  { name: 'Metformin 500mg', category: 'Diabetes', price: '₹45', inStock: true },
  { name: 'Amlodipine 5mg', category: 'Blood Pressure', price: '₹55', inStock: true },
  { name: 'Omeprazole 20mg', category: 'Gastric', price: '₹40', inStock: false },
  { name: 'Cetirizine 10mg', category: 'Allergy', price: '₹15', inStock: true },
];

export default function MedicinesPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const record = patientRecords.find(r => r.patientId === user?.patientId);
  const filtered = medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
          <Pill className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('medicines')}</h1>
          <p className="text-sm text-muted-foreground">Search medicines, upload prescriptions & place orders</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="bg-transparent text-sm text-foreground outline-none flex-1" />
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors">
          <Upload className="w-4 h-4" /> Upload Prescription
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {filtered.map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-foreground">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.category}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.inStock ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                {m.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-bold text-primary">{m.price}</span>
              <button disabled={!m.inStock} className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium disabled:opacity-50">
                <ShoppingCart className="w-3 h-3" /> Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {record && (
        <>
          <h2 className="text-sm font-semibold mb-3">Current Prescriptions</h2>
          <div className="bg-card border border-border rounded-xl p-4">
            {record.prescriptions.map((p, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                <div><span className="text-sm font-medium">{p.medicine}</span> <span className="text-xs text-muted-foreground">— {p.dosage}</span></div>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
