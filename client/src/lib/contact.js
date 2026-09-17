
// Submits the contact form to the API. UI in Contact.jsx only knows this
// contract: resolves on success, throws an Error with `.fieldErrors` set
// when the server rejected values (422), plain Error otherwise.

export async function submitContact(payload) {
  let response;
  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Network-level failure (server down, offline) — fetch throws TypeError.
    throw new Error("Network request failed.");
  }

  // Server always answers JSON; guard anyway (e.g. an HTML error page).
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      response.status === 422 ? "Validation failed." : `Request failed (${response.status}).`
    );
    if (response.status === 422 && body?.ok === false && body.errors) {
      error.fieldErrors = body.errors; // { name?, email?, budget?, ... } — same keys as the client
    }
    throw error;
  }

  return body; // { ok: true, id }
}