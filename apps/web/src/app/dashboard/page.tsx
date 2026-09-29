import Link from "next/link";
import { QrCode, ShieldAlert, History, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <header className="flex justify-between items-center pb-4 border-b border-border mb-6">
        <div>
          <h1 className="text-xl font-bold text-text">Merchant Dashboard</h1>
          <p className="text-xs text-muted">Sharma Canteen &bull; Tier: 🟢 VERIFIED</p>
        </div>
        <Link
          href="/settings"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-background border border-border text-text"
        >
          Account
        </Link>
      </header>

      {/* Main Action Banner */}
      <div className="p-5 rounded-2xl bg-primary text-white shadow-sm flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
            Daily Verification
          </span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
            Last audit: Today, 9:30 AM
          </span>
        </div>
        <h2 className="text-lg font-bold">Audit Physical QR Sticker</h2>
        <p className="text-xs opacity-80 leading-relaxed">
          Point your phone camera at your billing counter QR to confirm it hasn’t been tampered with
          or relocated.
        </p>
        <Link
          href="/audit/run"
          className="w-full py-2.5 px-4 rounded-xl bg-white text-primary font-semibold text-center text-xs shadow-sm hover:bg-slate-100 transition-colors"
        >
          Run Self-Audit Now
        </Link>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link
          href="/credential/qrs"
          className="p-4 rounded-xl bg-background border border-border hover:border-primary transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <QrCode className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-muted">Active QRs</span>
          </div>
          <span className="text-xl font-extrabold text-text">2 Stickers</span>
        </Link>
        <Link
          href="/audit/history"
          className="p-4 rounded-xl bg-background border border-border hover:border-primary transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <History className="w-4 h-4 text-muted" />
            <span className="text-xs font-semibold text-muted">Clean Audits</span>
          </div>
          <span className="text-xl font-extrabold text-tier-verified">14 Runs</span>
        </Link>
      </div>

      {/* Auxiliary links */}
      <div className="flex flex-col gap-2">
        <Link
          href="/credential/qrs"
          className="p-3.5 rounded-xl bg-surface border border-border flex justify-between items-center text-xs font-semibold text-text hover:bg-background"
        >
          <span>Manage Registered QR Stickers</span>
          <PlusCircle className="w-4 h-4 text-muted" />
        </Link>
        <Link
          href="/credential/dispute/new"
          className="p-3.5 rounded-xl bg-surface border border-border flex justify-between items-center text-xs font-semibold text-tier-warning hover:bg-background"
        >
          <span>Report Impersonation / File Dispute</span>
          <ShieldAlert className="w-4 h-4 text-tier-warning" />
        </Link>
      </div>
    </main>
  );
}
