import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "../data/site.js";
import { fadeRiseChild, staggerParent } from "../lib/motion.js";
import useScrollLock from "../hooks/useScrollLock.js";
import useScrolled from "../hooks/useScrolled.js";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import Logo from "../components/Logo.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx"; // NEW

// Wired to the AuthModal in Step 14 — intentionally inert until then.
const handleSignIn = () => {};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  useScrollLock(menuOpen);

  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  // Drawer a11y: Escape closes, focus moves into the drawer on open
  // and returns to the toggle on close.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Drawer links: close first (releases the scroll lock), then scroll
  // after the lock has been removed — double rAF = after the next paint.
  const goToSection = (event, href) => {
    event.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-base/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between md:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="group relative text-sm text-muted transition-colors hover:text-paper"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <button
              type="button"
              onClick={handleSignIn}
              className="cursor-pointer text-sm text-muted transition-colors hover:text-paper"
            >
              Sign in
            </button>
            {/* NEW */}
            <ThemeToggle />
            <Button as="a" href="#contact">
              Start a project
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="cursor-pointer rounded-btn p-2 text-paper md:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-60 flex flex-col bg-base md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Container className="flex h-16 items-center justify-between">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="cursor-pointer rounded-btn p-2 text-paper"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </Container>

            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
              variants={staggerParent}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map(({ label, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(event) => goToSection(event, href)}
                  variants={fadeRiseChild}
                  className="border-b border-line py-4 font-display text-3xl tracking-tight text-paper transition-colors hover:text-accent"
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              className="flex flex-col gap-4 px-6 pb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <Button as="a" href="#contact" size="lg" onClick={closeMenu}>
                Start a project <ArrowRight size={18} aria-hidden="true" />
              </Button>
              {/* NEW: toggle + sign-in share a row under the CTA */}
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="cursor-pointer text-sm text-muted transition-colors hover:text-paper"
                >
                  Sign in
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}