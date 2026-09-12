import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "../data/hero.js";
import { EASE, fadeRiseChild, staggerParent } from "../lib/motion.js";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";

// Hero-only variant: masked line reveal (slides up from behind its own line).
const lineMask = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

// Concentric arcs from a shared horizon point — outer radii intentionally
// exit the frame so the horizon reads as curvature, not a diagram.
const ARC_RADII = [220, 340, 470, 610, 760];
const arcPath = (r) => `M ${720 - r} 360 A ${r} ${r} 0 0 1 ${720 + r} 360`;
const ACCENT_ARC = arcPath(340);

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* atmosphere — soft green wash behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-25%] h-480px w-820px max-w-none -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center pb-10 pt-36 text-center md:pt-40">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeRiseChild}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 font-display text-display-xl">
            {hero.headline.map((line) => (
              <span key={line} className=" -mb-0.12em block overflow-hidden pb-[0.12em]">
                <motion.span variants={lineMask} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="-mb-0.12em block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineMask} className="block text-accent">
                {hero.headlineAccent}
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeRiseChild} className="mt-6 max-w-xl text-lg text-muted">
            {hero.description}
          </motion.p>

          <motion.div
            variants={fadeRiseChild}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button as="a" href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button as="a" href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* signature visual — the meridian horizon */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
      >
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="xMidYMax slice"
          className="h-48 w-full sm:h-64 md:h-80"
        >
          <defs>
            <radialGradient id="hero-glow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="720" cy="360" rx="620" ry="180" fill="url(#hero-glow)" />

          {ARC_RADII.map((r) => (
            <path key={r} d={arcPath(r)} fill="none" stroke="var(--color-line)" strokeWidth="1" />
          ))}

          <path
            d={ACCENT_ARC}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />

          {/* travelling dot + halo — rendered only when motion is allowed */}
          {!reduceMotion && (
            <>
              <circle r="10" fill="var(--color-accent)" opacity="0.18">
                <animateMotion dur="9s" repeatCount="indefinite" path={ACCENT_ARC} />
              </circle>
              <circle r="4" fill="var(--color-accent)">
                <animateMotion dur="9s" repeatCount="indefinite" path={ACCENT_ARC} />
              </circle>
            </>
          )}
        </svg>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted"
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}