import { useState } from "react";
import { QrCode, Send, History, User } from "lucide-react";

export default function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-xl font-bold mb-6">UPI Payments</h1>

      {/* Balance */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-5 mb-6">
        <p className="text-sm opacity-80">Available Balance</p>
        <h2 className="text-2xl font-bold">₹5,240</h2>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div
          onClick={() => setActiveTab("scan")}
          className={`p-4 rounded-xl cursor-pointer ${activeTab==="scan" ? "bg-primary text-white" : "bg-card border"}`}
        >
          <QrCode className="mx-auto mb-2" />
          <p className="text-xs">Scan</p>
        </div>

        <div
          onClick={() => setActiveTab("pay")}
          className={`p-4 rounded-xl cursor-pointer ${activeTab==="pay" ? "bg-primary text-white" : "bg-card border"}`}
        >
          <Send className="mx-auto mb-2" />
          <p className="text-xs">Pay</p>
        </div>

        <div
          onClick={() => setActiveTab("history")}
          className={`p-4 rounded-xl cursor-pointer ${activeTab==="history" ? "bg-primary text-white" : "bg-card border"}`}
        >
          <History className="mx-auto mb-2" />
          <p className="text-xs">History</p>
        </div>
      </div>

      {/* SCAN TAB */}
      {activeTab === "scan" && (
        <div className="text-center">
          <div className="border-2 border-dashed rounded-2xl h-48 flex items-center justify-center mb-4">
            <QrCode className="w-16 h-16 opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            QR Scanned → Ready to Pay
          </p>

          <button
            onClick={() => setActiveTab("pay")}
            className="mt-4 w-full bg-primary text-white py-3 rounded-xl"
          >
            Continue to Pay
          </button>
        </div>
      )}

      {/* PAY TAB */}
      {activeTab === "pay" && !paid && (
        <div className="bg-card border rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8" />
            <div>
              <p className="text-sm font-medium">City Hospital</p>
              <p className="text-xs text-muted-foreground">hospital@upi</p>
            </div>
          </div>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-xl p-2 mb-4"
          />

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            Pay ₹{amount || 0}
          </button>
        </div>
      )}

      {/* CONFIRM POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-80 text-center">
            <h2 className="font-bold mb-2">Confirm Payment</h2>
            <p className="text-sm mb-4">
              Pay ₹{amount || 0} to City Hospital?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border rounded-xl py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPaid(true);
                  setShowConfirm(false);
                }}
                className="flex-1 bg-green-600 text-white rounded-xl py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {paid && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful ✅
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            ₹{amount} paid to City Hospital
          </p>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === "history" && (
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-sm mb-3 font-medium">Recent Transactions</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>City Hospital</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between">
              <span>Pharmacy</span>
              <span>₹220</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}