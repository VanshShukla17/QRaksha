import { Router, Request, Response } from "express";

export const healthRouter = Router();

healthRouter.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      api: "ok",
      gemini: process.env.GEMINI_API_KEY ? "configured" : "unconfigured",
      chain: process.env.CHAIN_RPC_URL ? "configured" : "unconfigured",
      db: process.env.SUPABASE_URL ? "configured" : "unconfigured",
    },
  });
});
