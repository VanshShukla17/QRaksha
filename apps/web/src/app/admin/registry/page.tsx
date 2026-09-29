import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export default function AdminRegistryPage() {
  return (
    <main className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-text">Merchant Credential Registry</h1>
          <p className="text-xs text-muted">Pilot merchant accounts and status</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-text">Registered Merchants</h2>
          </div>
          <span className="text-xs text-muted font-medium">Demo Cohort</span>
        </div>
        <p className="text-xs text-muted">Pilot registry seeding endpoint available in Phase 3.</p>
      </div>
    </main>
  );
}
