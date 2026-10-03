import { Router } from "express";
import { healthRouter } from "./health.js";
import { merchantRouter } from "./merchants.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/merchants", merchantRouter);

// Remaining placeholders for routes to be implemented in Phase 2 & 3:
// /credentials, /audit, /check, /verify, /disputes, /admin
