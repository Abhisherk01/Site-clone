import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useAuthModal } from "../context/AuthModalContext.jsx";
import useScrollLock from "../hooks/useScrollLock.js";
import Button from "./Button.jsx";
import Field, { inputClass } from "./Field.jsx";
import { isValidEmail } from "../lib/validators.js";
import { signIn, signUp } from "../lib/auth.js";
import { EASE } from "../lib/motion.js";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EMPTY_VALUES = { email: "", password: "" };

function validate(values) {
  const errors = {};
  if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  return errors;
}

const MODES = {
  signin: {
    eyebrow: "Sign in",
    title: "Welcome back",
    submit: "Sign in",
    submitting: "Signing in…",
    successTitle: "Signed in (demo)",
    switchPrompt: "New to Meridian?",
    switchLabel: "Create an account",
    switchTo: "signup",
  },
  signup: {
    eyebrow: "Sign up",
    title: "Create your account",
    submit: "Create account",
    submitting: "Creating account…",
    successTitle: "Account created (demo)",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
    switchTo: "signin",
  },
};

export default function AuthModal() {
  const { open, closeAuth } = useAuthModal();
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && <AuthPanel key="auth-panel" onClose={closeAuth} />}
    </AnimatePresence>
  );
}

/**
 * Rendered only while the modal is open, so its state initializes fresh on
 * every open. Focus choreography mirrors the Step 5 drawer: focus in on
 * mount, Escape closes, focus returns to the trigger on unmount.
 */
function AuthPanel({ onClose }) {
  const { mode, setMode } = useAuthModal();
  const t = MODES[mode] ?? MODES.signin;

  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const panelRef = useRef(null);
  const emailRef = useRef(null);
  const successRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const raf = requestAnimationFrame(() => emailRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap: cycle Tab/Shift+Tab within the dialog.
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      const previous = previouslyFocused.current;
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const setField = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitAttempted) setErrors(validate(next));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.password) {
      document.getElementById("auth-password")?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await (mode === "signup" ? signUp : signIn)({
        email: values.email.trim(),
        password: values.password,
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitAttempted(false);
      setErrors({ email: "Something went wrong — please try again." });
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-70 flex justify-center overflow-y-auto bg-scrim/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-md rounded-card border border-line bg-surface p-6 shadow-2xl sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-btn text-muted transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div>
            <CheckCircle2 size={32} aria-hidden="true" className="text-accent" />
            <h2
              id="auth-modal-title"
              ref={successRef}
              tabIndex={-1}
              className="mt-4 font-display text-2xl font-semibold text-paper focus-visible:outline-none"
            >
              {t.successTitle}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {values.email.trim()} — this is a front-end mock: no real session
              started and nothing left your browser.
            </p>
            <div className="mt-6">
              <Button type="button" onClick={onClose}>
                Back to site
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.eyebrow}
            </p>
            <h2
              id="auth-modal-title"
              className="mt-3 pr-8 font-display text-2xl font-semibold text-paper"
            >
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-muted">Demo only — nothing is sent anywhere.</p>

            <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Field id="auth-email" label="Email" error={errors.email}>
                <input
                  ref={emailRef}
                  id="auth-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "auth-email-error" : undefined}
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field id="auth-password" label="Password" error={errors.password}>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                  aria-invalid={errors.password ? "true" : undefined}
                  aria-describedby={errors.password ? "auth-password-error" : undefined}
                  value={values.password}
                  onChange={(e) => setField("password", e.target.value)}
                  className={inputClass(!!errors.password)}
                />
              </Field>

              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2
                      size={18}
                      aria-hidden="true"
                      className="animate-spin motion-reduce:animate-none"
                    />{" "}
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>

              <p aria-live="polite" className="sr-only">
                {status === "submitting" ? t.submitting : ""}
              </p>
            </form>

            <p className="mt-6 text-sm text-muted">
              {t.switchPrompt}{" "}
              <button
                type="button"
                onClick={() => setMode(t.switchTo)}
                className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                {t.switchLabel}
              </button>
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}