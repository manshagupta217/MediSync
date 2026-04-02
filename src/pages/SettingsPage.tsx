import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("9876543210");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-6">User Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-xl p-2 mt-1"
          />
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-xl mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}