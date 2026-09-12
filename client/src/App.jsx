import { MotionConfig } from "framer-motion";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import Container from "./components/Container.jsx";

// Temporary anchor targets — each is replaced by a real section in later steps.
const placeholderSections = [
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Services />
        {placeholderSections.map(({ id, label }) => (
          <section key={id} id={id} className="border-t border-line/60">
            <Container className="flex min-h-[60vh] items-center justify-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">{label} — placeholder</p>
            </Container>
          </section>
        ))}
      </main>
    </MotionConfig>
  );
}