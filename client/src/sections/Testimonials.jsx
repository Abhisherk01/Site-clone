import { Quote, Star } from "lucide-react";
import Container from "../components/Container.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import { testimonials } from "../data/testimonials.js";

function Stars() {
  return (
    <span aria-hidden="true" className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Client testimonials" className="scroll-mt-24">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Teams we've shipped with"
            description="A few words from the founders and product leads who trusted us with their roadmap."
          />
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal as="li" key={t.id} delay={index * 0.08}>
              <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Quote size={28} aria-hidden="true" className="text-accent" />
                  <Stars />
                </div>

                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-paper/90">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-paper">{t.name}</span>
                      <span className="block text-sm text-muted">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </footer>
                </blockquote>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}