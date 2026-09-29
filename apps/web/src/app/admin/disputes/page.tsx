import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AdminDisputesPage() {
  return (
    <main className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-text">Admin Dispute Queue</h1>
          <p className="text-xs text-muted">Review reported credentials and impersonations</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-border text-center py-12">
        <ShieldAlert className="w-10 h-10 text-muted mx-auto mb-2 opacity-50" />
        <h2 className="text-sm font-semibold text-text">No Open Disputes</h2>
        <p className="text-xs text-muted mt-1">
          All merchant credentials in the pilot registry are in good standing.
        </p>
      </div>
    </main>
  );
}
