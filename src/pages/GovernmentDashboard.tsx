import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { hospitals, doctors } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import {
  Shield, Building2, Users, Bed, Activity
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';
import GovSatellitePanel from "@/satellite/GovSatellitePanel";

const PIE_COLORS = ['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export default function GovernmentDashboard() {
  const { t } = useI18n();
  const [activeTab] = useState<'overview'>('overview');

  const totalICU = hospitals.reduce((a, h) => a + h.icuBeds.total, 0);
  const availICU = hospitals.reduce((a, h) => a + h.icuBeds.available, 0);
  const totalDocs = doctors.length;
  const availDocs = doctors.filter(d => d.available).length;
  const totalAmb = hospitals.reduce((a, h) => a + h.ambulances.total, 0);
  const activeAmb = hospitals.reduce((a, h) => a + (h.ambulances.total - h.ambulances.available), 0);

  const statusDist = [
    { name: 'Available', value: hospitals.filter(h => h.status === 'available').length },
    { name: 'Limited', value: hospitals.filter(h => h.status === 'limited').length },
    { name: 'Overloaded', value: hospitals.filter(h => h.status === 'overloaded').length },
  ];

  return (
    <div className="animate-fade-in">

      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Government Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          National Healthcare Monitoring System
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: Building2, label: 'Hospitals', value: hospitals.length },
          { icon: Users, label: 'Doctors', value: `${availDocs}/${totalDocs}` },
          { icon: Bed, label: 'ICU Beds', value: `${availICU}/${totalICU}` },
          { icon: Activity, label: 'Ambulances', value: `${activeAmb}/${totalAmb}` },
        ].map((s, i) => (
          <div key={i} className="bg-card border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="text-xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-card border rounded-2xl p-5">
          <h3 className="text-sm font-semibold mb-3">Hospital Load</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hospitals.map(h => ({
              name: h.name.split(' ')[0],
              load: h.emergencyLoad
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="load" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border rounded-2xl p-5">
          <h3 className="text-sm font-semibold mb-3">Hospital Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusDist} dataKey="value" outerRadius={80}>
                {statusDist.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3">Hospital</th>
              <th className="text-center px-4 py-3">ICU</th>
              <th className="text-center px-4 py-3">Ventilators</th>
              <th className="text-center px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(h => (
              <tr key={h.id} className="border-t">
                <td className="px-4 py-3">{h.name}</td>
                <td className="px-4 py-3 text-center">
                  {h.icuBeds.available}/{h.icuBeds.total}
                </td>
                <td className="px-4 py-3 text-center">
                  {h.ventilators.available}/{h.ventilators.total}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={h.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <GovSatellitePanel />
      </div>

    </div>
  );
}