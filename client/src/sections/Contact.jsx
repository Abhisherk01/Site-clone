import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
} from "lucide-react";
import Container from "../components/Container.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Field, { inputClass } from "../components/Field.jsx";
import { isValidEmail } from "../lib/validators.js";
import { contactIntro, budgetOptions } from "../data/contact.js";
import { submitContact } from "../lib/contact.js";

const FIELD_ORDER = ["name", "email", "company", "budget", "message"];
const EMPTY_VALUES = { name: "", email: "", company: "", budget: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message =
      "Tell us a little more — a sentence or two helps us reply properly.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const successRef = useRef(null);

  // Move focus to the success heading so screen readers and keyboard users land there.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const setField = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitAttempted) setErrors(validate(next)); // live validation after first submit
  };

  const resetForm = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitAttempted(false);
    setStatus("idle");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        budget: values.budget,
        message: values.message.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-label="Contact us" className="scroll-mt-24">
      <Container className="py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial column */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow={contactIntro.eyebrow}
                title={contactIntro.title}
                description={contactIntro.description}
              />
              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-3">
                  <Mail size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <a
                    href={`mailto:${contactIntro.email}`}
                    className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                  >
                    {contactIntro.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-muted">{contactIntro.responseNote}</p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-muted">{contactIntro.locationNote}</p>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form / success column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {status === "success" ? (
                <Card role="status" className="flex h-full flex-col items-start justify-center">
                  <CheckCircle2 size={32} aria-hidden="true" className="text-accent" />
                  <h3
                    ref={successRef}
                    tabIndex={-1}
                    className="mt-4 font-display text-2xl font-semibold text-paper focus-visible:outline-none"
                  >
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-muted">
                    Thanks, {values.name.trim().split(/\s+/)[0] || "there"} — your message is
                    in. We&apos;ll reply to {values.email.trim()} within two business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      requestAnimationFrame(() => document.getElementById("name")?.focus());
                    }}
                    className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                  >
                    Send another message
                  </button>
                </Card>
              ) : (
                <Card>
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field id="name" label="Name" error={errors.name}>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Cooper"
                          aria-required="true"
                          aria-invalid={errors.name ? "true" : undefined}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          value={values.name}
                          onChange={(e) => setField("name", e.target.value)}
                          className={inputClass(!!errors.name)}
                        />
                      </Field>

                      <Field id="email" label="Email" error={errors.email}>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          aria-required="true"
                          aria-invalid={errors.email ? "true" : undefined}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          value={values.email}
                          onChange={(e) => setField("email", e.target.value)}
                          className={inputClass(!!errors.email)}
                        />
                      </Field>

                      <Field id="company" label="Company" optional>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Acme Inc."
                          value={values.company}
                          onChange={(e) => setField("company", e.target.value)}
                          className={inputClass(false)}
                        />
                      </Field>

                      <Field id="budget" label="Budget" optional>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={values.budget}
                            onChange={(e) => setField("budget", e.target.value)}
                            className={`${inputClass(false)} appearance-none pr-10 ${
                              values.budget ? "text-paper" : "text-muted"
                            }`}
                          >
                            <option value="">Select a range</option>
                            {budgetOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={18}
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                          />
                        </div>
                      </Field>

                      <div className="sm:col-span-2">
                        <Field id="message" label="Project details" error={errors.message}>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            maxLength={1000}
                            placeholder="What are you building, and what does success look like?"
                            aria-required="true"
                            aria-invalid={errors.message ? "true" : undefined}
                            aria-describedby={errors.message ? "message-error" : undefined}
                            value={values.message}
                            onChange={(e) => setField("message", e.target.value)}
                            className={`${inputClass(!!errors.message)} resize-y`}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="submit" size="lg" disabled={status === "submitting"}>
                        {status === "submitting" ? (
                          <>
                            <Loader2
                              size={18}
                              aria-hidden="true"
                              className="animate-spin motion-reduce:animate-none"
                            />{" "}
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message <ArrowRight size={18} aria-hidden="true" />
                          </>
                        )}
                      </Button>
                      {/* Persistent live region — announces sending/error without stealing focus */}
                      <p aria-live="polite" className="min-h-5 text-sm text-muted">
                        {status === "submitting" && "Sending your message…"}
                        {status === "error" && (
                          <span className="text-danger">
                            Something went wrong — please try again.
                          </span>
                        )}
                        {status === "idle" && contactIntro.responseNote}
                      </p>
                    </div>
                  </form>
                </Card>
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}