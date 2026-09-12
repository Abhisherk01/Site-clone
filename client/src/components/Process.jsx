import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { processSteps, stats } from "../data/process";

export default function Process() {
  return (
    <section id="process" aria-label="Our process" className="scroll-mt-24 bg-paper text-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
        <SectionHeading
  tone="inverted"
  eyebrow="Process"
  title="From first call to first release"
  description="One tight, transparent loop. You always know what we're doing, why, and what ships next."
  align="center"
/>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Connector line — desktop only, sits behind the number chips */}
          <div
            aria-hidden="true"
            className="absolute left-5 right-1/4 top-5 hidden border-t border-ink/15 lg:block"
          />

          <ol className="relative grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <Reveal delay={index * 0.08}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-accent font-display text-sm font-semibold text-ink">
                      {step.number}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-widest text-ink/60">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Stats */}
        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-24 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <li key={stat.id} className="border-l-2 border-accent pl-4">
              <Reveal delay={index * 0.08}>
                <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-ink/60">
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}