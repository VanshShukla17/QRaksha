import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const correlationId = crypto.randomUUID();
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";

  // Structured log with correlation ID, never logging PII or raw secrets
  console.error(
    JSON.stringify({
      level: "error",
      correlationId,
      code,
      message: err.message,
      statusCode,
      timestamp: new Date().toISOString(),
    }),
  );

  if (statusCode === 500) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred. Please try again later.",
        correlationId,
      },
    });
    return;
  }

  res.status(statusCode).json({
    error: {
      code,
      message: err.message,
      details: err.details,
      correlationId,
    },
  });
}
