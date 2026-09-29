import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NewDisputePage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-text">Report Impersonation</h1>
          <p className="text-xs text-muted">File a formal dispute against a credential</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-tier-warning-bg border border-tier-warning/20 mb-6 flex gap-3 items-start">
        <ShieldAlert className="w-5 h-5 text-tier-warning shrink-0 mt-0.5" />
        <p className="text-xs text-text leading-relaxed">
          Disputing a credential immediately flags it with 🔴 WARNING status pending administrative
          review. Frivolous filings may affect your standing.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-text mb-1 block">
            Target Credential ID or QR VPA
          </label>
          <input
            type="text"
            placeholder="e.g. fraudulent-merchant@upi"
            className="w-full p-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text mb-1 block">Evidence Summary</label>
          <textarea
            rows={4}
            placeholder="Describe why this credential infringes on your business..."
            className="w-full p-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="button"
          className="mt-4 py-3.5 px-4 rounded-xl bg-tier-warning text-white font-semibold text-sm shadow-sm hover:opacity-95 transition-opacity"
        >
          Submit Dispute for Admin Review
        </button>
      </form>
    </main>
  );
}
