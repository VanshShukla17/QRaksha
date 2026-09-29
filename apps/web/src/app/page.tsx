import Link from "next/link";
import { ShieldCheck, QrCode, ShieldAlert, ArrowRight, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      {/* Brand Header */}
      <header className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-sm">
            Q
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-secondary leading-none">
              QRaksha
            </h1>
            <p className="text-xs text-muted">UPI QR Physical Tamper Defense</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-tier-info-bg text-tier-info border border-tier-info/20">
          Pilot MVP
        </span>
      </header>

      {/* Hero section */}
      <section className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-tier-verified-bg text-tier-verified border border-tier-verified/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NPCI verifies accounts. We verify physical stickers.</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-text leading-tight mb-2">
          Verify today’s UPI sticker is the one you placed yesterday.
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Prevent sticker-swap and QR relocation theft. Run an AI self-audit in 10 seconds, backed
          by a tamper-evident public blockchain anchor.
        </p>
      </section>

      {/* Primary Action Buttons */}
      <div className="flex flex-col gap-3 my-4">
        <Link
          href="/audit/run"
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-opacity"
        >
          <QrCode className="w-5 h-5" />
          <span>Run Merchant Self-Audit</span>
        </Link>
        <Link
          href="/register"
          className="w-full py-3 px-4 rounded-xl bg-surface border border-border text-text font-semibold flex items-center justify-center gap-2 hover:bg-background transition-colors"
        >
          <span>Register New Merchant Credential</span>
          <ArrowRight className="w-4 h-4 text-muted" />
        </Link>
        <Link
          href="/check"
          className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-medium text-primary hover:underline"
        >
          Are you a customer? Check any merchant QR before paying →
        </Link>
      </div>

      {/* Value pillars */}
      <section className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-background border border-border flex gap-3 items-start">
          <div className="p-2 rounded-lg bg-surface border border-border text-primary shrink-0">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Detect QR Swaps</h3>
            <p className="text-xs text-muted mt-0.5">
              Identifies counterfeit replacement stickers pasting unauthorized VPAs over genuine
              merchant boards.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-background border border-border flex gap-3 items-start">
          <div className="p-2 rounded-lg bg-surface border border-border text-tier-warning shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Flag QR Relocation</h3>
            <p className="text-xs text-muted mt-0.5">
              Binds QR stickers to GPS coordinates. If a genuine sticker is moved outside its shop
              radius, it immediately flags 🔴 WARNING.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-background border border-border flex gap-3 items-start">
          <div className="p-2 rounded-lg bg-surface border border-border text-text shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Public Testnet Anchor</h3>
            <p className="text-xs text-muted mt-0.5">
              Every credential hash is published on-chain. Auditability does not rely on trusting
              our database alone.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-xs text-muted">
        QRaksha Pilot &bull; Merchant Security Pipeline
      </footer>
    </main>
  );
}
