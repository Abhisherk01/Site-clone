// Eyebrow + title + description with consistent rhythm.
// align="left" for editorial sections, "center" (default) for grids.
export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
    as: Heading = "h2",
    className = "",
  }) {
    const alignment = align === "left" ? "items-start text-left" : "items-center text-center";
  
    return (
      <div className={`flex flex-col ${alignment} ${className}`}>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
        )}
        <Heading className="mt-4 max-w-3xl font-display text-display-lg">{title}</Heading>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
      </div>
    );
  }