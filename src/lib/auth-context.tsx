import { createContext, useContext, useState, ReactNode } from 'react';
import type { UserRole } from './mock-data';

interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  hospital?: string;
  hospitalId?: string;
  patientId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, AuthUser> = {
  hospital_admin: { id: 'u1', name: 'Admin Sharma', role: 'hospital_admin', hospital: 'City General Hospital', hospitalId: 'h1' },
  ambulance_coordinator: { id: 'u2', name: 'Coord. Patel', role: 'ambulance_coordinator' },
  doctor: { id: 'u3', name: 'Dr. Priya Menon', role: 'doctor', hospital: 'National Trauma Center', hospitalId: 'h5' },
  patient: { id: 'u4', name: 'Rahul Kumar', role: 'patient', patientId: 'P-2024-001' },
  gov_authority: { id: 'u5', name: 'Dir. Verma', role: 'gov_authority' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
