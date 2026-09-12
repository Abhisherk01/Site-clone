// Shared form field: label + control slot + error message, so every form
// declares fields the same way (Contact, AuthModal).
// Also owns the shared input styling via the named inputClass export.
export default function Field({ id, label, optional = false, error, children }) {
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium text-paper">
          {label}
          {optional && <span className="ml-1 font-normal text-muted">· optional</span>}
        </label>
        <div className="mt-2">{children}</div>
        {error && (
          <p id={`${id}-error`} className="mt-2 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
  
  const inputBase =
    "w-full rounded-btn border bg-base px-4 py-3 text-base text-paper placeholder:text-muted transition-colors focus:outline-none focus:ring-2";
  
  export const inputClass = (hasError) =>
    `${inputBase} ${
      hasError
        ? "border-danger focus:ring-danger/50"
        : "border-line focus:border-accent focus:ring-accent/40"
    }`;