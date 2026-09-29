import Link from "next/link";
import { ArrowLeft, Plus, QrCode } from "lucide-react";

export default function CredentialQrsPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-text">Registered QR Stickers</h1>
          <p className="text-xs text-muted">Manage stickers bound to this credential</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="p-4 rounded-xl bg-surface border border-border flex items-start justify-between">
          <div className="flex gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text">Counter 1 (Main Billing)</h2>
              <p className="text-xs font-mono text-muted">upi://pay?pa=sharma@sbi...</p>
              <p className="text-xs text-muted mt-1">Bound to: Shop 12 (100m radius)</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-tier-verified-bg text-tier-verified">
            Active
          </span>
        </div>
      </div>

      <button className="py-3 px-4 rounded-xl border border-dashed border-primary text-primary font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
        <Plus className="w-4 h-4" />
        <span>Register Additional QR Sticker</span>
      </button>
    </main>
  );
}
