import { MotionConfig } from "framer-motion";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import Work from "./sections/Work.jsx";
import Container from "./components/Container.jsx";
import Process from "./sections/Process.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Testimonials from "./sections/Testimonials.jsx"; 
import Faq from "./sections/Faq.jsx";
import CtaBanner from "./sections/CtaBanner.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { AuthModalProvider } from "./context/AuthModalContext.jsx";
import AuthModal from "./components/AuthModal.jsx";


// Temporary anchor targets — each is replaced by a real section in later steps.
const placeholderSections = [
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  return (
    <ThemeProvider>
      <AuthModalProvider>
    <MotionConfig reducedMotion="user">
      <div id="top">
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Faq />
        <CtaBanner />
        <Contact />
        {placeholderSections.map(({ id, label }) => (
          <section key={id} id={id} className="border-t border-line/60">
            <Container className="flex min-h-[60vh] items-center justify-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">{label} — placeholder</p>
            </Container>
          </section>
        ))}
      </main>
      <Footer />
      </div>
      <AuthModal />
    </MotionConfig>
    </AuthModalProvider>
    </ThemeProvider>
  );
}