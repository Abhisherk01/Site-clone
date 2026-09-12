// Mocked auth — same seam pattern as lib/contact.js: components never know
// it's fake. A real provider can replace these internals without UI changes.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function signIn({ email }) {
  await delay(900);
  return { ok: true, email };
}

export async function signUp({ email }) {
  await delay(900);
  return { ok: true, email };
}