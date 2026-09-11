// The only button/CTA component on the site.
// Renders a <button> by default; pass as="a" for link CTAs.
const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-btn font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  primary: "bg-accent text-white shadow-sm shadow-ink/10 hover:bg-accent-strong",
  secondary: "border border-line bg-white text-ink hover:border-ink/25 hover:bg-ink/[0.03]",
};

const SIZES = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}