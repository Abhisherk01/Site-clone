// Single source of truth for the site's motion grammar:
// fade + 24px rise, one ease curve, once-only reveals.
// Consumed by Reveal and by section-level stagger orchestration.

export const EASE = [0.22, 1, 0.36, 1]; // easeOutQuint feel

export const REVEAL_VIEWPORT = { once: true, margin: "-80px" };

// Parent orchestration (used in Hero, later sections)
export const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const fadeRiseChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};