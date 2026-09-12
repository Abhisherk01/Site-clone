import { ArrowRight } from "lucide-react";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import { ctaBanner } from "../data/contact.js";

export default function CtaBanner() {
  return (
    <section aria-label="Call to action" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="rounded-card bg-accent-soft px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* Eyebrow as a chip: green bg + ink text passes AA on this surface
                in BOTH themes (plain green text fails light theme at 4.4:1). */}
            <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
              {ctaBanner.eyebrow}
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-display-lg text-paper">
              {ctaBanner.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper/85">{ctaBanner.description}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as="a" href={ctaBanner.primaryCta.href} size="lg">
                {ctaBanner.primaryCta.label} <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button as="a" href={ctaBanner.secondaryCta.href} variant="secondary" size="lg">
                {ctaBanner.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}