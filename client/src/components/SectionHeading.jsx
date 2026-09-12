// Eyebrow + title + description with consistent rhythm.
// align="left" for editorial sections, "center" (default) for grids.
// tone="inverted" → for the Process band only: the eyebrow uses accent-inverted
// (the green that passes AA on the band in BOTH themes) and the description uses
// ink/70 (text-muted is tuned for the page surface, which the band inverts).
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  tone = "default",
  className = "",
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  // Title inherits color on purpose (sections set their own, e.g. Process sets
  // text-ink on the band). Default tone = exactly the previous look.
  const tones = {
    default: { eyebrow: "text-accent", title: "", description: "text-muted" },
    inverted: { eyebrow: "text-accent-inverted", title: "text-ink", description: "text-ink/70" },
  };
  const t = tones[tone] ?? tones.default;

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${t.eyebrow}`}>
          {eyebrow}
        </span>
      )}
      <Heading className={`mt-4 max-w-3xl font-display text-display-lg ${t.title}`}>{title}</Heading>
      {description && <p className={`mt-4 max-w-2xl text-lg ${t.description}`}>{description}</p>}
    </div>
  );
}