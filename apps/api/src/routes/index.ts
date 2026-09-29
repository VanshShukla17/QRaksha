import { Router } from "express";
import { healthRouter } from "./health.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);

// Placeholders for routes to be implemented in Phase 2 & 3
// /merchants, /credentials, /audit, /check, /verify, /disputes, /admin
