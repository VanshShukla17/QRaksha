import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

export default function CustomerCheckPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <h1 className="text-lg font-bold text-text">Customer Pre-Pay Check</h1>
      </div>

      <div className="p-4 rounded-xl bg-tier-info-bg border border-tier-info/20 mb-6">
        <p className="text-xs text-text leading-relaxed">
          Verify a merchant's physical QR sticker before making a payment. No account or login
          required.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-2xl bg-background text-center">
        <ScanLine className="w-12 h-12 text-primary mb-3 animate-pulse" />
        <h2 className="text-base font-semibold text-text">Scan Merchant QR</h2>
        <p className="text-xs text-muted mt-1 max-w-[240px]">
          Point your camera at the merchant's physical UPI sticker to verify authenticity.
        </p>
        <button
          disabled
          className="mt-6 py-2.5 px-6 rounded-xl bg-primary text-white text-xs font-semibold opacity-75 cursor-not-allowed"
        >
          Camera Active (Ready in Phase 2)
        </button>
      </div>
    </main>
  );
}
