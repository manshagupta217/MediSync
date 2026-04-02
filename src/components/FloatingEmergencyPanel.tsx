import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Siren, Ambulance, MapPin, Stethoscope, Phone, X } from 'lucide-react';

const actions = [
  { icon: Ambulance, label: 'Request Ambulance', path: '/emergency', color: 'bg-destructive text-destructive-foreground' },
  { icon: MapPin, label: 'Find Nearest Hospital', path: '/map', color: 'bg-primary text-primary-foreground' },
  { icon: Stethoscope, label: 'Emergency Consult', path: '/teleconsultation', color: 'bg-warning text-warning-foreground' },
  { icon: Phone, label: 'Emergency Call', path: null, color: 'bg-success text-success-foreground' },
];

export default function FloatingEmergencyPanel() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass rounded-2xl p-4 mb-3 shadow-2xl w-64"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Emergency Actions</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              {actions.map((a, i) => (
                <button
                  key={i}
                  onClick={() => { if (a.path) { navigate(a.path); setOpen(false); } }}
                  className={`w-full flex items-center gap-3 ${a.color} px-4 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}
                >
                  <a.icon className="w-4 h-4" /> {a.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-destructive text-destructive-foreground shadow-lg flex items-center justify-center hover:bg-destructive/90 transition-colors"
      >
        <Siren className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
