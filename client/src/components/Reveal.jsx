import { motion } from "framer-motion";
import { EASE, REVEAL_VIEWPORT } from "../lib/motion.js";

// The site's ONE scroll-reveal pattern: fade + rise, plays once,
// triggers slightly after the element enters the viewport.
export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  className = "",
  children,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}