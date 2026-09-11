// The single card treatment: charcoal surface, hairline border, one radius.
// interactive adds hover lift + green border tint — only for clickable cards.
export default function Card({ as: Tag = "div", interactive = false, className = "", children }) {
    return (
      <Tag
        className={`rounded-card border border-line bg-surface p-6 sm:p-8 ${
          interactive
            ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-black/30"
            : ""
        } ${className}`}
      >
        {children}
      </Tag>
    );
  }