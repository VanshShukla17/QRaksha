import { describe, expect, it } from "vitest";
import { calculateTrustScore } from "../services/trust-ramp.service.js";

describe("Trust Ramp Scoring", () => {
  it("never grants VERIFIED on day 0", () => {
    const result = calculateTrustScore({
      identityTier: "gst_verified",
      daysSinceActivation: 0,
      cleanAuditCount: 1,
      attestationDiversityScore: 0.5,
      hasUnresolvedWarning: false,
    });

    expect(result.tier).toBe("unverified");
  });

  it("grants VERIFIED for GST tier after >= 3 days and >= 60 score", () => {
    // 4 days * 4 = 16
    // 10 audits * 3 = 30
    // 0.8 diversity * 30 = 24
    // total = 70 >= 60, days = 4 >= 3
    const result = calculateTrustScore({
      identityTier: "gst_verified",
      daysSinceActivation: 4,
      cleanAuditCount: 10,
      attestationDiversityScore: 0.8,
      hasUnresolvedWarning: false,
    });

    expect(result.score).toBe(70);
    expect(result.tier).toBe("verified");
  });

  it("requires >= 7 days for baseline tier even with score >= 60", () => {
    const result = calculateTrustScore({
      identityTier: "baseline",
      daysSinceActivation: 5,
      cleanAuditCount: 10,
      attestationDiversityScore: 1.0,
      hasUnresolvedWarning: false,
    });

    // Score is 20 + 30 + 30 = 80, but days = 5 < 7
    expect(result.score).toBe(80);
    expect(result.tier).toBe("unverified");
  });

  it("immediately overrides tier to WARNING if unresolved warning exists", () => {
    const result = calculateTrustScore({
      identityTier: "gst_verified",
      daysSinceActivation: 20,
      cleanAuditCount: 20,
      attestationDiversityScore: 1.0,
      hasUnresolvedWarning: true,
    });

    expect(result.tier).toBe("warning");
  });
});
