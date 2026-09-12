import { MotionConfig } from "framer-motion";
import Header from "./sections/Header.jsx";
import Container from "./components/Container.jsx";

// Temporary anchor targets — each is replaced by a real section in later steps.
const placeholderSections = [
  { id: "services", label: "Services" },
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
        <Container className="pb-24 pt-40 text-center">
          <h1 className="font-display text-display-md">Step 5 — Header is live</h1>
          <p className="mt-3 text-muted">
            Placeholder sections below are the nav&apos;s anchor targets.
          </p>
        </Container>

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