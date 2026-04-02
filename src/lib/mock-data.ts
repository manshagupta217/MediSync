export type UserRole = 'hospital_admin' | 'ambulance_coordinator' | 'doctor' | 'patient' | 'gov_authority';

export interface Hospital {
  id: string;
  name: string;
  type: 'government' | 'private';
  lat: number;
  lng: number;
  distance?: number;
  icuBeds: { total: number; available: number };
  generalBeds: { total: number; available: number };
  ventilators: { total: number; available: number };
  operationTheatres: { total: number; available: number };
  ambulances: { total: number; available: number };
  status: 'available' | 'limited' | 'overloaded';
  emergencyLoad: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  experience: number;
  hospital: string;
  hospitalId: string;
  available: boolean;
  consultationMode: 'in-person' | 'telemedicine' | 'both';
  avatar?: string;
  freeSlots: string[];
}

export interface ResourceRequest {
  id: string;
  fromHospital: string;
  toHospital: string;
  resourceType: string;
  quantity: number;
  urgency: 'critical' | 'high' | 'medium';
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'emergency' | 'request' | 'shortage' | 'approval' | 'surplus';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface EmergencyCase {
  id: string;
  type: string;
  patientCondition: string;
  location: string;
  timestamp: string;
  status: 'scanning' | 'assigned' | 'in_transit' | 'arrived';
  assignedHospital?: string;
  decision?: 'treat' | 'request_resources' | 'transfer';
}

export interface PatientRecord {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  conditions: string[];
  hospitalVisits: { hospital: string; date: string; doctor: string; diagnosis: string }[];
  prescriptions: { medicine: string; dosage: string; date: string }[];
  labReports: { test: string; result: string; date: string; hospital: string }[];
  weightRecords: { weight: number; date: string }[];
  hemoglobinRecords: { value: number; date: string }[];
}

export const hospitals: Hospital[] = [
  {
    id: 'h1', name: 'City General Hospital', type: 'government',
    lat: 28.6139, lng: 77.2090, distance: 2.3,
    icuBeds: { total: 40, available: 8 },
    generalBeds: { total: 200, available: 45 },
    ventilators: { total: 25, available: 6 },
    operationTheatres: { total: 8, available: 3 },
    ambulances: { total: 12, available: 4 },
    status: 'available', emergencyLoad: 62,
  },
  {
    id: 'h2', name: 'Metro Private Medical Center', type: 'private',
    lat: 28.6280, lng: 77.2200, distance: 4.1,
    icuBeds: { total: 30, available: 2 },
    generalBeds: { total: 150, available: 12 },
    ventilators: { total: 20, available: 1 },
    operationTheatres: { total: 6, available: 1 },
    ambulances: { total: 8, available: 2 },
    status: 'limited', emergencyLoad: 88,
  },
  {
    id: 'h3', name: 'District Public Hospital', type: 'government',
    lat: 28.5900, lng: 77.1900, distance: 5.8,
    icuBeds: { total: 20, available: 0 },
    generalBeds: { total: 100, available: 5 },
    ventilators: { total: 10, available: 0 },
    operationTheatres: { total: 4, available: 0 },
    ambulances: { total: 6, available: 1 },
    status: 'overloaded', emergencyLoad: 97,
  },
  {
    id: 'h4', name: 'Sunrise Multispecialty Hospital', type: 'private',
    lat: 28.6350, lng: 77.2400, distance: 6.2,
    icuBeds: { total: 50, available: 18 },
    generalBeds: { total: 250, available: 80 },
    ventilators: { total: 35, available: 12 },
    operationTheatres: { total: 10, available: 5 },
    ambulances: { total: 15, available: 7 },
    status: 'available', emergencyLoad: 35,
  },
  {
    id: 'h5', name: 'National Trauma Center', type: 'government',
    lat: 28.6000, lng: 77.2300, distance: 3.5,
    icuBeds: { total: 60, available: 5 },
    generalBeds: { total: 300, available: 22 },
    ventilators: { total: 40, available: 3 },
    operationTheatres: { total: 12, available: 2 },
    ambulances: { total: 20, available: 3 },
    status: 'limited', emergencyLoad: 78,
  },
];

export const doctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Aanya Sharma', specialty: 'Cardiologist', degree: 'MBBS, MD (Cardiology)', experience: 12, hospital: 'City General Hospital', hospitalId: 'h1', available: true, consultationMode: 'both', freeSlots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { id: 'd2', name: 'Dr. Rajesh Patel', specialty: 'Neurosurgeon', degree: 'MBBS, MS, MCh (Neuro)', experience: 18, hospital: 'Metro Private Medical Center', hospitalId: 'h2', available: false, consultationMode: 'in-person', freeSlots: [] },
  { id: 'd3', name: 'Dr. Priya Menon', specialty: 'Trauma Surgeon', degree: 'MBBS, MS (Surgery)', experience: 15, hospital: 'National Trauma Center', hospitalId: 'h5', available: true, consultationMode: 'both', freeSlots: ['9:00 AM', '11:30 AM'] },
  { id: 'd4', name: 'Dr. Vikram Singh', specialty: 'Pulmonologist', degree: 'MBBS, MD (Pulmonology)', experience: 10, hospital: 'Sunrise Multispecialty Hospital', hospitalId: 'h4', available: true, consultationMode: 'telemedicine', freeSlots: ['1:00 PM', '3:00 PM', '5:00 PM'] },
  { id: 'd5', name: 'Dr. Fatima Khan', specialty: 'Anesthesiologist', degree: 'MBBS, MD (Anesthesia)', experience: 8, hospital: 'City General Hospital', hospitalId: 'h1', available: true, consultationMode: 'in-person', freeSlots: ['8:00 AM', '12:00 PM'] },
  { id: 'd6', name: 'Dr. Arjun Reddy', specialty: 'Orthopedic Surgeon', degree: 'MBBS, MS (Ortho)', experience: 14, hospital: 'District Public Hospital', hospitalId: 'h3', available: false, consultationMode: 'both', freeSlots: [] },
  { id: 'd7', name: 'Dr. Sneha Iyer', specialty: 'Emergency Medicine', degree: 'MBBS, MD (EM)', experience: 7, hospital: 'National Trauma Center', hospitalId: 'h5', available: true, consultationMode: 'both', freeSlots: ['10:00 AM', '2:00 PM'] },
  { id: 'd8', name: 'Dr. Mohammed Ali', specialty: 'Cardiologist', degree: 'MBBS, DM (Cardiology)', experience: 20, hospital: 'Sunrise Multispecialty Hospital', hospitalId: 'h4', available: true, consultationMode: 'telemedicine', freeSlots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
];

export const resourceRequests: ResourceRequest[] = [
  { id: 'r1', fromHospital: 'District Public Hospital', toHospital: 'City General Hospital', resourceType: 'Ventilators', quantity: 3, urgency: 'critical', status: 'pending', timestamp: '2 min ago' },
  { id: 'r2', fromHospital: 'Metro Private Medical Center', toHospital: 'Sunrise Multispecialty Hospital', resourceType: 'ICU Beds', quantity: 5, urgency: 'high', status: 'pending', timestamp: '8 min ago' },
  { id: 'r3', fromHospital: 'National Trauma Center', toHospital: 'City General Hospital', resourceType: 'Trauma Surgeon', quantity: 1, urgency: 'critical', status: 'approved', timestamp: '15 min ago' },
  { id: 'r4', fromHospital: 'District Public Hospital', toHospital: 'Sunrise Multispecialty Hospital', resourceType: 'Ambulances', quantity: 2, urgency: 'medium', status: 'rejected', timestamp: '1 hr ago' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'emergency', message: 'CRITICAL: Multi-vehicle accident on NH-44. 12 casualties reported.', timestamp: '1 min ago', read: false },
  { id: 'n2', type: 'shortage', message: 'District Public Hospital: ICU beds at 0. Ventilators at 0.', timestamp: '3 min ago', read: false },
  { id: 'n3', type: 'request', message: 'Resource request: 3 ventilators from District Public Hospital.', timestamp: '5 min ago', read: false },
  { id: 'n4', type: 'approval', message: 'Trauma Surgeon deployment approved by City General Hospital.', timestamp: '15 min ago', read: true },
  { id: 'n5', type: 'surplus', message: 'Sunrise Multispecialty: 7 idle ventilators available for sharing.', timestamp: '22 min ago', read: true },
  { id: 'n6', type: 'emergency', message: 'Cardiac arrest patient en route to Metro Private Medical Center.', timestamp: '30 min ago', read: true },
];

export const emergencyTypes = [
  'Cardiac Arrest', 'Stroke', 'Trauma', 'Accident', 'Burns', 'Respiratory Failure', 'Poisoning', 'Obstetric Emergency',
];

export const patientRecords: PatientRecord[] = [
  {
    id: 'pr1',
    patientId: 'P-2024-001',
    patientName: 'Rahul Kumar',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    hospitalVisits: [
      { hospital: 'City General Hospital', date: '2024-01-15', doctor: 'Dr. Aanya Sharma', diagnosis: 'Chest pain evaluation' },
      { hospital: 'Metro Private Medical Center', date: '2023-11-20', doctor: 'Dr. Rajesh Patel', diagnosis: 'Migraine assessment' },
      { hospital: 'City General Hospital', date: '2023-08-05', doctor: 'Dr. Aanya Sharma', diagnosis: 'Routine cardiac checkup' },
    ],
    prescriptions: [
      { medicine: 'Metformin 500mg', dosage: 'Twice daily', date: '2024-01-15' },
      { medicine: 'Amlodipine 5mg', dosage: 'Once daily', date: '2024-01-15' },
      { medicine: 'Sumatriptan 50mg', dosage: 'As needed', date: '2023-11-20' },
    ],
    labReports: [
      { test: 'HbA1c', result: '7.2%', date: '2024-01-15', hospital: 'City General Hospital' },
      { test: 'Lipid Profile', result: 'LDL: 142 mg/dL', date: '2024-01-15', hospital: 'City General Hospital' },
      { test: 'ECG', result: 'Normal Sinus Rhythm', date: '2023-08-05', hospital: 'City General Hospital' },
    ],
    weightRecords: [
      { weight: 82, date: '2024-01-15' }, { weight: 80, date: '2023-11-20' }, { weight: 78, date: '2023-08-05' },
    ],
    hemoglobinRecords: [
      { value: 14.2, date: '2024-01-15' }, { value: 13.8, date: '2023-11-20' }, { value: 14.0, date: '2023-08-05' },
    ],
  },
  {
    id: 'pr2',
    patientId: 'P-2024-002',
    patientName: 'Sneha Gupta',
    age: 28,
    gender: 'Female',
    bloodGroup: 'O+',
    conditions: ['Asthma'],
    hospitalVisits: [
      { hospital: 'Sunrise Multispecialty Hospital', date: '2024-02-10', doctor: 'Dr. Vikram Singh', diagnosis: 'Acute asthma exacerbation' },
      { hospital: 'District Public Hospital', date: '2023-09-15', doctor: 'Dr. Arjun Reddy', diagnosis: 'Knee pain evaluation' },
    ],
    prescriptions: [
      { medicine: 'Salbutamol Inhaler', dosage: 'As needed', date: '2024-02-10' },
      { medicine: 'Fluticasone Inhaler', dosage: 'Twice daily', date: '2024-02-10' },
    ],
    labReports: [
      { test: 'Spirometry', result: 'FEV1: 72%', date: '2024-02-10', hospital: 'Sunrise Multispecialty Hospital' },
      { test: 'X-Ray Knee', result: 'No fracture', date: '2023-09-15', hospital: 'District Public Hospital' },
    ],
    weightRecords: [
      { weight: 58, date: '2024-02-10' }, { weight: 57, date: '2023-09-15' },
    ],
    hemoglobinRecords: [
      { value: 12.5, date: '2024-02-10' }, { value: 12.2, date: '2023-09-15' },
    ],
  },
];

export const analyticsData = {
  icuUtilization: [
    { name: 'City General', utilization: 80 },
    { name: 'Metro Private', utilization: 93 },
    { name: 'District Public', utilization: 100 },
    { name: 'Sunrise Multi', utilization: 64 },
    { name: 'National Trauma', utilization: 92 },
  ],
  hourlyLoad: [
    { hour: '00:00', load: 45 }, { hour: '02:00', load: 38 }, { hour: '04:00', load: 32 },
    { hour: '06:00', load: 48 }, { hour: '08:00', load: 65 }, { hour: '10:00', load: 78 },
    { hour: '12:00', load: 82 }, { hour: '14:00', load: 75 }, { hour: '16:00', load: 88 },
    { hour: '18:00', load: 92 }, { hour: '20:00', load: 85 }, { hour: '22:00', load: 60 },
  ],
  responseTimeTrend: [
    { day: 'Mon', avgMinutes: 8.2 }, { day: 'Tue', avgMinutes: 7.5 }, { day: 'Wed', avgMinutes: 9.1 },
    { day: 'Thu', avgMinutes: 6.8 }, { day: 'Fri', avgMinutes: 10.2 }, { day: 'Sat', avgMinutes: 11.5 },
    { day: 'Sun', avgMinutes: 7.8 },
  ],
  equipmentUsage: [
    { name: 'Ventilators', used: 78, total: 130 },
    { name: 'ICU Beds', used: 167, total: 200 },
    { name: 'General Beds', used: 836, total: 1000 },
    { name: 'Op. Theatres', used: 29, total: 40 },
    { name: 'Ambulances', used: 44, total: 61 },
  ],
  appointmentStats: [
    { day: 'Mon', count: 45 }, { day: 'Tue', count: 52 }, { day: 'Wed', count: 48 },
    { day: 'Thu', count: 61 }, { day: 'Fri', count: 55 }, { day: 'Sat', count: 38 },
    { day: 'Sun', count: 22 },
  ],
  doctorSchedule: [
    { hour: '8AM', patients: 3 }, { hour: '9AM', patients: 5 }, { hour: '10AM', patients: 4 },
    { hour: '11AM', patients: 6 }, { hour: '12PM', patients: 2 }, { hour: '1PM', patients: 0 },
    { hour: '2PM', patients: 4 }, { hour: '3PM', patients: 5 }, { hour: '4PM', patients: 3 },
    { hour: '5PM', patients: 2 },
  ],
};
