// The single card treatment: charcoal surface, hairline border, one radius.
// interactive adds hover lift + green border tint — only for clickable cards.
// padded={false} opts out of default padding — for cards with full-bleed
// content (e.g. artwork). Never fight padding by stacking conflicting classes:
// Tailwind can't know which "p-*" wins, so the component owns the decision.
export default function Card({
  as: Tag = "div",
  interactive = false,
  padded = true,
  className = "",
  children,
}) {
  return (
    <Tag
      className={`rounded-card border border-line bg-surface ${padded ? "p-6 sm:p-8" : ""} ${
        interactive
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-black/30"
          : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}