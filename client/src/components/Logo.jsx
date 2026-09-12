import { site } from "../data/site.js";

// Inline SVG mark (same as the favicon) + wordmark. "#top" is a native
// browser fragment — always scrolls to page top.
export default function Logo() {
  return (
    <a href="#top" aria-label={`${site.name} — back to top`} className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="var(--color-accent)" />
        <path
          d="M8 24V8l8 10 8-10v16"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
    </a>
  );
}