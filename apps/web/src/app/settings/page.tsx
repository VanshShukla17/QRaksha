import Link from "next/link";
import { ArrowLeft, User, Shield, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <h1 className="text-lg font-bold text-text">Account Settings</h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-primary/10 text-primary">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text">Sharma Canteen</h2>
            <p className="text-xs text-muted">+91 98765 43210</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-tier-verified" />
            <div>
              <p className="text-sm font-semibold text-text">Verification Level</p>
              <p className="text-xs text-muted">GST / Udyam Verified</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-tier-verified-bg text-tier-verified">
            Tier 1
          </span>
        </div>

        <button className="mt-8 p-3.5 rounded-xl border border-tier-warning/30 bg-tier-warning-bg text-tier-warning font-semibold text-sm flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </main>
  );
}
