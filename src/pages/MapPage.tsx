import { useI18n } from '@/lib/i18n';
import { hospitals } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Navigation } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapPage() {
  const { t } = useI18n();

  const handleDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('network_map')}</h1>
        <p className="text-sm text-muted-foreground">
          Hospital network visualization and capacity overview
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl mb-6 overflow-hidden shadow-sm relative">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "420px" }}
            center={{ lat: 28.6139, lng: 77.2090 }}
            zoom={10}
          >
            {hospitals.map((h) => (
              <Marker
                key={h.id}
                position={{ lat: h.lat, lng: h.lng }}
                onClick={() => handleDirections(h.lat, h.lng)}
                icon={{
                  url:
                    h.status === "available"
                      ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                      : h.status === "limited"
                      ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                      : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>

        <div className="absolute bottom-4 right-4 glass rounded-xl px-4 py-2.5 text-xs flex gap-4 z-10">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success" /> {t('available')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" /> Limited
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Overloaded
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {hospitals.map(h => (
          <div
            key={h.id}
            className={`bg-card border rounded-2xl p-4 shadow-sm ${
              h.status === 'overloaded'
                ? 'border-destructive/30'
                : h.status === 'limited'
                ? 'border-warning/30'
                : 'border-border'
            }`}
          >
            <div className="text-sm font-semibold text-foreground truncate mb-2">
              {h.name}
            </div>

            <StatusBadge status={h.status} />

            <div className="mt-3 text-xs text-muted-foreground">
              Load:{' '}
              <span
                className={`font-bold ${
                  h.emergencyLoad >= 90
                    ? 'text-destructive'
                    : h.emergencyLoad >= 70
                    ? 'text-warning'
                    : 'text-success'
                }`}
              >
                {h.emergencyLoad}%
              </span>
            </div>

            <button
              onClick={() => handleDirections(h.lat, h.lng)}
              className="mt-2 w-full flex items-center justify-center gap-1 bg-primary/10 text-primary rounded-lg py-1.5 text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              <Navigation className="w-3 h-3" /> Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}