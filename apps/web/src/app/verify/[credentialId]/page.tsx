import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ credentialId: string }>;
}

export default async function VerifyCredentialPage({ params }: Props) {
  const { credentialId } = await params;

  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2 rounded-lg bg-background border border-border">
          <ArrowLeft className="w-5 h-5 text-text" />
        </Link>
        <h1 className="text-lg font-bold text-text">Public Credential Audit</h1>
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm mb-6">
        <div className="flex items-center gap-2 text-tier-verified mb-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Public Verification</span>
        </div>
        <h2 className="text-xl font-bold text-text mb-1">Credential Record</h2>
        <p className="text-xs font-mono text-muted break-all mb-4">{credentialId}</p>

        <div className="border-t border-border pt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted">Testnet Anchor:</span>
            <span className="font-semibold text-text">Polygon Amoy</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted">Explorer Proof:</span>
            <span className="font-mono text-primary flex items-center gap-1">
              View on AmoyScan <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
