import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { MerchantService, maskVpa } from "../services/merchant.service.js";
import { ConflictError } from "../middleware/error.middleware.js";

function createMockDb(initialState?: {
  merchants?: Array<{ id: string; display_name: string; contact_phone: string }>;
  identities?: Array<{
    id: string;
    merchant_id: string;
    identity_tier: "gst_verified" | "baseline";
    gst_udyam_number: string | null;
    bank_vpa_masked: string | null;
    kyc_address: string;
    otp_confirmed: boolean;
  }>;
}) {
  const merchants = [...(initialState?.merchants || [])];
  const identities = [...(initialState?.identities || [])];

  const db = {
    from: (table: string) => {
      if (table === "merchant") {
        return {
          select: () => ({
            eq: (_col: string, val: string) => ({
              maybeSingle: async () => {
                const found = merchants.find((m) => m.contact_phone === val);
                return { data: found || null, error: null };
              },
            }),
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          insert: (record: any) => ({
            select: () => ({
              single: async () => {
                const newRecord = { id: `m-${Date.now()}`, ...record };
                merchants.push(newRecord);
                return { data: newRecord, error: null };
              },
            }),
          }),
        };
      }
      throw new Error(`Unexpected table ${table}`);
    },
    schema: (schemaName: string) => {
      if (schemaName === "identity") {
        return {
          from: (table: string) => {
            if (table === "merchant_identity") {
              return {
                select: () => ({
                  eq: (col: string, val: string) => ({
                    maybeSingle: async () => {
                      if (col === "gst_udyam_number") {
                        const found = identities.find((i) => i.gst_udyam_number === val);
                        return { data: found || null, error: null };
                      }
                      if (col === "merchant_id") {
                        const found = identities.find((i) => i.merchant_id === val);
                        return { data: found || null, error: null };
                      }
                      return { data: null, error: null };
                    },
                  }),
                }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                insert: (record: any) => ({
                  select: () => ({
                    single: async () => {
                      if (
                        record.gst_udyam_number &&
                        identities.some((i) => i.gst_udyam_number === record.gst_udyam_number)
                      ) {
                        return {
                          data: null,
                          error: {
                            code: "23505",
                            message: "duplicate key value violates unique constraint gst_udyam",
                          },
                        };
                      }
                      const newRecord = { id: `id-${Date.now()}`, ...record };
                      identities.push(newRecord);
                      return { data: newRecord, error: null };
                    },
                  }),
                }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                update: (updates: any) => ({
                  eq: (_col: string, val: string) => ({
                    select: () => ({
                      single: async () => {
                        const idx = identities.findIndex((i) => i.id === val);
                        if (idx !== -1) {
                          identities[idx] = { ...identities[idx], ...updates };
                          return { data: identities[idx], error: null };
                        }
                        return { data: null, error: new Error("Not found") };
                      },
                    }),
                  }),
                }),
              };
            }
            throw new Error(`Unexpected identity table ${table}`);
          },
        };
      }
      throw new Error(`Unexpected schema ${schemaName}`);
    },
  };

  return { db, merchants, identities };
}

describe("MerchantService (Unit Tests)", () => {
  it("masks bank VPA correctly without revealing full handle", () => {
    expect(maskVpa("sharma@okaxis")).toBe("sh***@okaxis");
    expect(maskVpa("ab@upi")).toBe("ab***@upi");
    expect(maskVpa("a@paytm")).toBe("a***@paytm");
  });

  it("successfully registers GST/Udyam path with gst_verified tier", async () => {
    const { db, merchants, identities } = createMockDb();
    const service = new MerchantService(db);

    const result = await service.registerIdentity({
      type: "gst_udyam",
      displayName: "Sharma Canteen",
      contactPhone: "+919876543210",
      gstUdyamNumber: "27AAAPL1234C1ZV",
      kycAddress: "Shop 12, Main Market, Delhi",
      otp: "123456",
    });

    expect(result.identityTier).toBe("gst_verified");
    expect(result.displayName).toBe("Sharma Canteen");
    expect(result.contactPhone).toBe("+919876543210");
    expect(result.otpConfirmed).toBe(true);
    expect(merchants).toHaveLength(1);
    expect(identities).toHaveLength(1);
    expect(identities[0].identity_tier).toBe("gst_verified");
    expect(identities[0].gst_udyam_number).toBe("27AAAPL1234C1ZV");
  });

  it("successfully registers penny-drop path with baseline tier and masked VPA", async () => {
    const { db, merchants, identities } = createMockDb();
    const service = new MerchantService(db);

    const result = await service.registerIdentity({
      type: "penny_drop",
      displayName: "Chai Tapri",
      contactPhone: "+919876543211",
      bankVpa: "chaitapri@upi",
      kycAddress: "Stall 4, University Road, Pune",
    });

    expect(result.identityTier).toBe("baseline");
    expect(result.displayName).toBe("Chai Tapri");
    expect(result.contactPhone).toBe("+919876543211");
    expect(result.otpConfirmed).toBe(true);
    expect(merchants).toHaveLength(1);
    expect(identities).toHaveLength(1);
    expect(identities[0].identity_tier).toBe("baseline");
    expect(identities[0].gst_udyam_number).toBeNull();
    expect(identities[0].bank_vpa_masked).toBe("ch***@upi");
  });

  it("throws ConflictError 409 on duplicate GST number", async () => {
    const { db } = createMockDb({
      merchants: [{ id: "m-1", display_name: "Original Shop", contact_phone: "+919876543210" }],
      identities: [
        {
          id: "id-1",
          merchant_id: "m-1",
          identity_tier: "gst_verified",
          gst_udyam_number: "27AAAPL1234C1ZV",
          bank_vpa_masked: null,
          kyc_address: "Shop 1, Delhi",
          otp_confirmed: true,
        },
      ],
    });
    const service = new MerchantService(db);

    await expect(
      service.registerIdentity({
        type: "gst_udyam",
        displayName: "Fraudulent Shop",
        contactPhone: "+919999999999",
        gstUdyamNumber: "27AAAPL1234C1ZV",
        kycAddress: "Somewhere Else",
        otp: "123456",
      }),
    ).rejects.toThrow(ConflictError);
  });
});

describe("POST /api/v1/merchants/register/identity (API Route)", () => {
  it("returns 400 VALIDATION_ERROR when payload is invalid", async () => {
    const res = await request(app).post("/api/v1/merchants/register/identity").send({
      type: "gst_udyam",
      displayName: "S", // too short (min 2)
      contactPhone: "invalid-phone",
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.details).toBeDefined();
  });

  it("handles duplicate GST with 409 CONFLICT and dispute pointer", async () => {
    const { merchantService } = await import("../services/merchant.service.js");
    const spy = vi
      .spyOn(merchantService, "registerIdentity")
      .mockRejectedValueOnce(
        new ConflictError(
          "This GST/Udyam number is already registered to an existing merchant credential.",
          { disputePointer: "/credential/dispute/new" },
        ),
      );

    const res = await request(app).post("/api/v1/merchants/register/identity").send({
      type: "gst_udyam",
      displayName: "Duplicate Shop",
      contactPhone: "+919876543210",
      gstUdyamNumber: "27AAAPL1234C1ZV",
      kycAddress: "Market Square",
      otp: "123456",
    });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe("CONFLICT");
    expect(res.body.error.details.disputePointer).toBe("/credential/dispute/new");
    expect(res.body.error.correlationId).toBeDefined();

    spy.mockRestore();
  });

  it("returns 201 on successful registration", async () => {
    const { merchantService } = await import("../services/merchant.service.js");
    const spy = vi.spyOn(merchantService, "registerIdentity").mockResolvedValueOnce({
      merchantId: "m-123",
      displayName: "Valid Shop",
      identityTier: "gst_verified",
      contactPhone: "+919876543210",
      kycAddress: "123 Main St",
      identityId: "id-123",
      otpConfirmed: true,
    });

    const res = await request(app).post("/api/v1/merchants/register/identity").send({
      type: "gst_udyam",
      displayName: "Valid Shop",
      contactPhone: "+919876543210",
      gstUdyamNumber: "27AAAPL1234C1ZV",
      kycAddress: "123 Main St",
      otp: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.identityTier).toBe("gst_verified");
    expect(res.body.data.merchantId).toBe("m-123");

    spy.mockRestore();
  });
});
