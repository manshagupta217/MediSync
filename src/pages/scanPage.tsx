import { QrCode, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { patientRecords } from "@/lib/mock-data";

export default function ScanPage() {
  const { user } = useAuth();
  const record = patientRecords.find(r => r.patientId === user?.patientId);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      <h1 className="text-xl font-bold mb-6">ABHA Health ID</h1>

      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-6 text-primary-foreground shadow-xl">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-xs opacity-80">
              GOVERNMENT OF INDIA · ABHA HEALTH
            </span>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            VERIFIED
          </span>
        </div>

        <div className="flex items-center gap-6">
          
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
            <QrCode className="w-12 h-12 opacity-80" />
          </div>

          <div className="flex-1">
            <div className="text-xl font-bold mb-1">{user?.name}</div>

            <div className="text-md font-mono tracking-wider mb-2">
              {record?.patientId}
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs opacity-80">
              <div>
                <span className="block opacity-60">Age</span>
                {record?.age}
              </div>
              <div>
                <span className="block opacity-60">Gender</span>
                {record?.gender}
              </div>
              <div>
                <span className="block opacity-60">Blood</span>
                {record?.bloodGroup}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}