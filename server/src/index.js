import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { validateContact } from "./validate.js";

const prisma = new PrismaClient();
const app = express();

// Only Vite's dev/preview origins may call the API from a browser.
const ALLOWED_ORIGINS = ["http://localhost:5173", "http://localhost:4173"];

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json()); // parses JSON bodies (only when Content-Type is application/json)

// Sanity check for Step 15 testing.
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

// Unknown routes → JSON 404 (this API is JSON-only, never HTML).
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Not found." });
});

// Error middleware (bad JSON from express.json, unexpected errors) → JSON.
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
  console.log(`API ready on http://localhost:${PORT}`);
});