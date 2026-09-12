import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "../components/Container.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { EASE } from "../lib/motion.js";
import { faqItems } from "../data/faq.js";

export default function Faq() {
  // Single-open accordion; first item open by default (affordance cue).
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-24">
      <Container className="py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial heading column — sticky on desktop while the list scrolls */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  align="left"
                  eyebrow="FAQ"
                  title="Answers, before you ask"
                  description="The questions every client asks in week one. Anything missing? The contact form is right below."
                />
              </div>
            </Reveal>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ul className="divide-y divide-line border-y border-line">
                {faqItems.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <li key={item.id}>
                      <h3>
                        <button
                          type="button"
                          id={`faq-button-${item.id}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${item.id}`}
                          onClick={() => toggle(item.id)}
                          className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-paper transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                        >
                          {item.question}
                          <Plus
                            size={20}
                            aria-hidden="true"
                            className={`shrink-0 text-accent transition-transform duration-300 motion-reduce:transition-none ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          />
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="panel"
                            id={`faq-panel-${item.id}`}
                            role="region"
                            aria-labelledby={`faq-button-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-prose pb-6 text-base leading-relaxed text-muted">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}