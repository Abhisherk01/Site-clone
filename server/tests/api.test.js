import { describe, it, expect, afterEach, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/app.js'; // exists after the split in Step 3

const prisma = new PrismaClient();
const MODEL = prisma.contactSubmission;      // schema: model ContactSubmission
const HEALTH_PATH  = '/api/health';
const CONTACT_PATH = '/api/contact';
const INVALID_STATUS = 422;                  // validateContact errors → 422

// VERIFY against validate.js (Step 1 output): these must be the required
// fields. If they differ, edit ONLY this constant.
const VALID = { name: 'Smoke Test', email: 'smoke@example.com', message: 'Hello from the API smoke test.' };

describe('API smoke', () => {
  it('GET /api/health → 200', async () => {
    const res = await request(app).get(HEALTH_PATH);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('POST /api/contact (valid) → 201 + row persisted', async () => {
    const res = await request(app).post(CONTACT_PATH).send(VALID);
    expect(res.status).toBe(201);
    const row = await MODEL.findFirst({ where: { email: VALID.email } });
    expect(row).not.toBeNull();
  });

  it('POST /api/contact (invalid) → 422 + nothing persisted', async () => {
    const before = await MODEL.count();
    const res = await request(app).post(CONTACT_PATH).send({ ...VALID, email: 'not-an-email' });
    expect(res.status).toBe(INVALID_STATUS);
    expect(res.body.ok).toBe(false);
    expect(await MODEL.count()).toBe(before);
  });

  afterEach(async () => { await MODEL.deleteMany(); });
  afterAll(async () => { await prisma.$disconnect(); });
});