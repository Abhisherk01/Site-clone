// Server-side validation — mirrors the client's rules (Contact.jsx + data/contact.js).
// Duplicated ON PURPOSE: the server never trusts the client. Anything can POST here.
// Keep both sides in sync when rules change.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// MUST match budgetOptions in client/src/data/contact.js — copy-paste, don't retype
// (note the en dashes).
const BUDGET_OPTIONS = new Set([
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
]);

const LIMITS = { name: 100, email: 200, company: 100, message: 1000 };

const str = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export function validateContact(body) {
  const b = typeof body === "object" && body !== null ? body : {};
  const errors = {};
  const data = {};

  const name = str(b.name, LIMITS.name);
  if (name.length < 2) errors.name = "Please enter your name.";
  else data.name = name;

  const email = str(b.email, LIMITS.email);
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else data.email = email;

  const company = str(b.company, LIMITS.company);
  if (company) data.company = company; // optional

  const budget = str(b.budget, 20);
  if (budget) {
    if (!BUDGET_OPTIONS.has(budget)) errors.budget = "Please choose a valid budget range.";
    else data.budget = budget;
  } // optional

  const message = str(b.message, LIMITS.message);
  if (message.length < 10)
    errors.message = "Tell us a little more — a sentence or two helps us reply properly.";
  else data.message = message;

  return { data, errors: Object.keys(errors).length > 0 ? errors : null };
}