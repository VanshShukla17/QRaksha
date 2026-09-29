import Link from "next/link";
import { ArrowLeft, Camera, ShieldCheck } from "lucide-react";

export default function AuditRunPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-text">Self-Audit Verification</h1>
          <p className="text-xs text-muted">Point camera at your physical UPI sticker</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-2xl bg-background text-center">
        <Camera className="w-12 h-12 text-primary mb-3" />
        <h2 className="text-base font-semibold text-text">Camera Scan Viewfinder</h2>
        <p className="text-xs text-muted mt-1 max-w-[260px]">
          Position the QR sticker within the frame. Location and vision will be checked
          synchronously.
        </p>

        <div className="mt-8 flex flex-col gap-2 w-full max-w-[280px]">
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck className="w-4 h-4 text-tier-verified" />
            <span>GPS Geolocation Ready</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck className="w-4 h-4 text-tier-verified" />
            <span>AI Multi-Agent Pipeline Ready</span>
          </div>
        </div>
      </div>
    </main>
  );
}
