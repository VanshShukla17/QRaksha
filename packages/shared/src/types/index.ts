export type IdentityTier = "gst_verified" | "baseline";

export type CredentialStatus =
  "pending_activation" | "recently_registered" | "active" | "suspended";

export type TrustTier = "verified" | "unverified" | "warning";

export type AuditVerdict = "VERIFIED" | "RECENTLY_REGISTERED" | "WARNING";

export type VerdictReason = "OK" | "UNKNOWN_QR" | "LOCATION_MISMATCH" | "MISBINDING";

export type AnchorStatus = "pending" | "confirmed" | "failed";

export type DisputeStatus = "open" | "resolved_upheld" | "resolved_rejected";

export interface AgentOutput {
  status: "pass" | "warn" | "fail" | "error";
  score?: number;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface PipelineAgentOutputs {
  qrDecode?: AgentOutput;
  identity?: AgentOutput;
  vision?: AgentOutput;
  context?: AgentOutput;
  attestation?: AgentOutput;
  misbinding?: AgentOutput;
  trust?: AgentOutput;
}
