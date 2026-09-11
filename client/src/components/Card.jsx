// The single card treatment: hairline border, one radius, generous padding.
// interactive adds hover lift + accent border — only for clickable cards.
export default function Card({ as: Tag = "div", interactive = false, className = "", children }) {
    return (
      <Tag
        className={`rounded-card border border-line bg-white p-6 sm:p-8 ${
          interactive
            ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-ink/5"
            : ""
        } ${className}`}
      >
        {children}
      </Tag>
    );
  }