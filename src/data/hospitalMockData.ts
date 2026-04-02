// src/lib/mock-data.ts

export const hospitals = Array.from({ length: 50 }, (_, i) => {
  const statuses = ['available', 'limited', 'overloaded'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const baseLat = 28.6139;
  const baseLng = 77.2090;

  return {
    id: `H${(i + 1).toString().padStart(3, '0')}`,
    name: `Hospital ${i + 1}`,
    type: i % 2 === 0 ? 'Government' : 'Private',
    distance: +(Math.random() * 10).toFixed(1),
    status,
    emergencyLoad: Math.floor(Math.random() * 100),

    lat: baseLat + (Math.random() - 0.5) * 0.3,
    lng: baseLng + (Math.random() - 0.5) * 0.3,

    icuBeds: { available: Math.floor(Math.random() * 20) },
    ventilators: { available: Math.floor(Math.random() * 15) },
    ambulances: { available: Math.floor(Math.random() * 5) }
  };
});