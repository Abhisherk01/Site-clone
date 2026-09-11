import { MotionConfig } from "framer-motion";
import { ArrowRight, Code2, Layers, PenTool } from "lucide-react";
import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";
import Container from "./components/Container.jsx";
import Reveal from "./components/Reveal.jsx";
import SectionHeading from "./components/SectionHeading.jsx";

const demoCards = [
  { icon: PenTool, title: "Design", text: "Interfaces with hierarchy, restraint and intent." },
  { icon: Code2, title: "Engineering", text: "Fast, accessible, maintainable products." },
  { icon: Layers, title: "Strategy", text: "Decisions grounded in real user journeys." },
];

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Step 4 complete"
            title="Dark theme is live"
            description="Charcoal base, crisp white type, electric green accents — 60/30/10."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg">Start a project</Button>
            <Button variant="secondary" size="lg">
              See our work <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button variant="secondary" size="lg" disabled>
              Disabled
            </Button>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoCards.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <Card interactive className="h-full">
                  <Icon className="size-8 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-display-md">{title}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>

      {/* 30% rhythm — the inverted white band */}
      <section className="bg-paper py-16 text-center text-ink">
        <p>Inverted paper band — reserved for section rhythm in later steps</p>
      </section>
    </MotionConfig>
  );
}