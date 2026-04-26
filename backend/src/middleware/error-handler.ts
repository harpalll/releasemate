import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = err instanceof Error ? err.stack : String(err);
  console.error(message);
  res.status(500).json({ error: "Internal server error" });
}
