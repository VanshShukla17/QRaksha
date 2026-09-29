import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AuditHistoryPage() {
  const auditLogs = [
    {
      id: "run-101",
      date: "Today, 9:30 AM",
      verdict: "VERIFIED",
      tier: "verified",
      reason: "OK - QR & Location Match",
      qr: "Counter 1 (Main Billing)",
    },
    {
      id: "run-100",
      date: "Yesterday, 10:15 AM",
      verdict: "VERIFIED",
      tier: "verified",
      reason: "OK - All agent checks passed",
      qr: "Counter 1 (Main Billing)",
    },
  ];

  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-text">Audit History</h1>
          <p className="text-xs text-muted">Immutable log of past self-audits</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-surface border border-border shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-muted">{log.date}</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-tier-verified-bg text-tier-verified border border-tier-verified/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {log.verdict}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{log.qr}</p>
              <p className="text-xs text-muted">{log.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
