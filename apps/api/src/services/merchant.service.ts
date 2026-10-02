import { RegisterIdentityInput } from "@qraksha/shared";

import { supabaseAdmin } from "../db/client.js";
import { ConflictError } from "../middleware/error.middleware.js";

export interface RegisterIdentityResult {
  merchantId: string;
  displayName: string;
  identityTier: "gst_verified" | "baseline";
  contactPhone: string;
  kycAddress: string;
  identityId: string;
  otpConfirmed: boolean;
}

export function maskVpa(vpa: string): string {
  const parts = vpa.split("@");
  if (parts.length !== 2) {
    return vpa.slice(0, 2) + "***";
  }
  const [handle, domain] = parts;
  const visible = handle.slice(0, 2);
  return `${visible}***@${domain}`;
}

export class MerchantService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private db: any = supabaseAdmin) {}

  async registerIdentity(input: RegisterIdentityInput): Promise<RegisterIdentityResult> {
    if (input.type === "gst_udyam") {
      await this.checkGstConflict(input.gstUdyamNumber);
    }

    const merchant = await this.findOrCreateMerchant(input.displayName, input.contactPhone);
    const identity = await this.upsertIdentity(merchant.id, input);

    return {
      merchantId: merchant.id,
      displayName: merchant.display_name,
      identityTier: identity.identity_tier,
      contactPhone: merchant.contact_phone,
      kycAddress: identity.kyc_address,
      identityId: identity.id,
      otpConfirmed: identity.otp_confirmed,
    };
  }

  private async checkGstConflict(gstUdyamNumber: string): Promise<void> {
    const { data: existingGst, error } = await this.db
      .schema("identity")
      .from("merchant_identity")
      .select("id, merchant_id")
      .eq("gst_udyam_number", gstUdyamNumber)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (existingGst) {
      throw new ConflictError(
        "This GST/Udyam number is already registered to an existing merchant credential.",
        { disputePointer: "/credential/dispute/new" },
      );
    }
  }

  private async findOrCreateMerchant(
    displayName: string,
    contactPhone: string,
  ): Promise<{ id: string; display_name: string; contact_phone: string }> {
    const { data: existingMerchant, error: findError } = await this.db
      .from("merchant")
      .select("id, display_name, contact_phone")
      .eq("contact_phone", contactPhone)
      .maybeSingle();

    if (findError) {
      throw findError;
    }

    if (existingMerchant) {
      return existingMerchant;
    }

    const { data: newMerchant, error: insertError } = await this.db
      .from("merchant")
      .insert({
        display_name: displayName,
        contact_phone: contactPhone,
      })
      .select("id, display_name, contact_phone")
      .single();

    if (insertError || !newMerchant) {
      throw insertError || new Error("Failed to create merchant");
    }

    return newMerchant;
  }

  private async upsertIdentity(
    merchantId: string,
    input: RegisterIdentityInput,
  ): Promise<{
    id: string;
    identity_tier: "gst_verified" | "baseline";
    kyc_address: string;
    otp_confirmed: boolean;
  }> {
    const identityTier: "gst_verified" | "baseline" =
      input.type === "gst_udyam" ? "gst_verified" : "baseline";
    const gstUdyamNumber = input.type === "gst_udyam" ? input.gstUdyamNumber : null;
    const bankVpaMasked = input.type === "penny_drop" ? maskVpa(input.bankVpa) : null;

    const { data: existingIdentity, error: findError } = await this.db
      .schema("identity")
      .from("merchant_identity")
      .select("id")
      .eq("merchant_id", merchantId)
      .maybeSingle();

    if (findError) {
      throw findError;
    }

    if (existingIdentity) {
      const { data: updatedIdentity, error: updateError } = await this.db
        .schema("identity")
        .from("merchant_identity")
        .update({
          identity_tier: identityTier,
          gst_udyam_number: gstUdyamNumber,
          bank_vpa_masked: bankVpaMasked,
          kyc_address: input.kycAddress,
          otp_confirmed: true,
        })
        .eq("id", existingIdentity.id)
        .select("id, identity_tier, kyc_address, otp_confirmed")
        .single();

      if (updateError || !updatedIdentity) {
        throw updateError || new Error("Failed to update merchant identity");
      }
      return updatedIdentity as {
        id: string;
        identity_tier: "gst_verified" | "baseline";
        kyc_address: string;
        otp_confirmed: boolean;
      };
    }

    const { data: newIdentity, error: insertError } = await this.db
      .schema("identity")
      .from("merchant_identity")
      .insert({
        merchant_id: merchantId,
        identity_tier: identityTier,
        gst_udyam_number: gstUdyamNumber,
        bank_vpa_masked: bankVpaMasked,
        kyc_address: input.kycAddress,
        otp_confirmed: true,
      })
      .select("id, identity_tier, kyc_address, otp_confirmed")
      .single();

    if (insertError || !newIdentity) {
      if (insertError.code === "23505" && insertError.message?.includes("gst_udyam")) {
        throw new ConflictError(
          "This GST/Udyam number is already registered to an existing merchant credential.",
          { disputePointer: "/credential/dispute/new" },
        );
      }
      throw insertError || new Error("Failed to create merchant identity");
    }

    return newIdentity as {
      id: string;
      identity_tier: "gst_verified" | "baseline";
      kyc_address: string;
      otp_confirmed: boolean;
    };
  }
}

export const merchantService = new MerchantService();
