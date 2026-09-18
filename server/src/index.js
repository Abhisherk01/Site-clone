import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import compression from "compression";
import { PrismaClient } from "@prisma/client";
import { validateContact } from "./validate.js";

const prisma = new PrismaClient();
const app = express();

// Built client (client/dist) when present — i.e., in production deployments.
// Locally without a build, the API runs alone and Vite's dev server fronts the UI.
const clientDist = fileURLToPath(new URL("../../client/dist", import.meta.url));
const hasClientBuild = existsSync(path.join(clientDist, "index.html"));

// Only Vite's dev/preview origins may call the API cross-origin during development.
// In production the client is served from THIS service (same origin, no CORS involved);
// CORS_ORIGIN exists for optional external callers / split deployments later.
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(compression()); // gzip static + JSON (fixes Lighthouse "text compression")
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json()); // parses JSON bodies (only when Content-Type is application/json)

// Sanity check.
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { data, errors } = validateContact(req.body);
    if (errors) return res.status(422).json({ ok: false, errors });

    const submission = await prisma.contactSubmission.create({ data });
    return res.status(201).json({ ok: true, id: submission.id });
  } catch (error) {
    console.error("POST /api/contact failed:", error);
    return res.status(500).json({ ok: false, message: "Something went wrong." });
  }
});

if (hasClientBuild) {
  // Vite emits content-hashed filenames → cache hard.
  app.use(
    "/assets",
    express.static(path.join(clientDist, "assets"), { immutable: true, maxAge: "1y" })
  );
  // index.html, favicon.svg, robots.txt — modest caching so deploys propagate fast.
  app.use(express.static(clientDist, { maxAge: "1h" }));

  // SPA fallback: GET page navigations that aren't files or API calls get the app.
  // Middleware (not app.get("*")) — works identically on Express 4 and 5.
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// Unknown routes → JSON 404 (the API is JSON-only, never HTML).
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Not found." });
});

// Error middleware (bad JSON from express.json, sendFile failures, unexpected errors).
app.use((error, _req, res, _next) => {
  console.error(error);
  const badRequest = Boolean(error.status && error.status < 500);
  res.status(error.status || 500).json({
    ok: false,
    message: badRequest ? "Invalid request." : "Something went wrong.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}${hasClientBuild ? " (serving client build)" : ""}`);
});