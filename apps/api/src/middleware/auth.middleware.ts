import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../db/client.js";

export interface AuthenticatedUser {
  id: string;
  role: "merchant" | "admin";
  phone?: string;
  email?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: {
        code: "UNAUTHENTICATED",
        message: "Missing or invalid authorization header",
      },
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        error: {
          code: "UNAUTHENTICATED",
          message: "Invalid or expired token",
        },
      });
      return;
    }

    const role = (user.app_metadata?.role as "merchant" | "admin") || "merchant";

    req.user = {
      id: user.id,
      role,
      phone: user.phone,
      email: user.email,
    };

    next();
  } catch (_err) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to authenticate request",
      },
    });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "Admin privileges required",
        },
      });
      return;
    }
    next();
  });
}
