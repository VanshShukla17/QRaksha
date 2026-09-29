import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("GET /api/v1/health", () => {
  it("returns 200 and healthy status", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("healthy");
    expect(res.body.services.api).toBe("ok");
  });

  it("returns 404 for unknown route", async () => {
    const res = await request(app).get("/api/v1/unknown-endpoint");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});
