import Link from "next/link";
import { ArrowLeft, Building2, Smartphone } from "lucide-react";

export default function RegisterWizardPage() {
  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-text">Register Credential</h1>
          <p className="text-xs text-muted">Step 1: Choose Identity Proof</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Tier 1 - GST/Udyam */}
        <div className="p-5 rounded-2xl border-2 border-primary/20 bg-surface hover:border-primary transition-colors cursor-pointer flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-tier-info-bg text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-tier-verified-bg text-tier-verified border border-tier-verified/30">
              Fast Trust Ramp
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-text">GST / Udyam Certificate</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Verify your business registration with OTP to get faster ramp to 🟢 VERIFIED status
              (minimum 3 days).
            </p>
          </div>
        </div>

        {/* Tier 2 - Penny Drop / Baseline */}
        <div className="p-5 rounded-2xl border border-border bg-surface hover:border-muted transition-colors cursor-pointer flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-background text-muted">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-tier-unverified-bg text-tier-unverified border border-tier-unverified/30">
              Baseline Ramp
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-text">UPI VPA Penny-Drop</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              No formal paperwork needed. Verified via bank account name-match with standard ramp
              (minimum 7 days).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
