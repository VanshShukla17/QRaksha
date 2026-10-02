import { Router, Request, Response, NextFunction } from "express";
import { RegisterIdentitySchema } from "@qraksha/shared";

import { validateBody } from "../middleware/validate.middleware.js";
import { merchantService } from "../services/merchant.service.js";

export const merchantRouter = Router();

/**
 * POST /api/v1/merchants/register/identity
 * Public endpoint to start merchant registration via GST/Udyam+OTP or VPA penny-drop.
 * Per ARCHITECTURE.md Section 6 and PRD.md Section 4 (Feature: Merchant Registration).
 */
merchantRouter.post(
  "/register/identity",
  validateBody(RegisterIdentitySchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await merchantService.registerIdentity(req.body);
      res.status(201).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);
