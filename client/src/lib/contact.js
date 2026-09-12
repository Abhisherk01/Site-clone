// Submit seam for the contact form. Step 15 replaces ONLY this function's
// internals with fetch("/api/contact") — components stay untouched.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitContact(payload) {
  await delay(900);
  // Simulated success so the full UX is testable before the backend exists.
  return { ok: true, payload };
}