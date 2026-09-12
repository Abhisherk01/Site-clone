import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/work.js";
import { EASE, REVEAL_VIEWPORT } from "../lib/motion.js";
import Card from "../components/Card.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const FILTERS = ["All", ...new Set(projects.map((project) => project.category))];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Outcomes, not just outputs"
            description="A few recent engagements. Every project shipped against measurable goals — and met them."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer rounded-btn border px-4 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? "border-accent bg-accent font-medium text-ink"
                      : "border-line text-muted hover:border-paper/25 hover:text-paper"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map(({ title, category, year, description, result, art }) => (
              <motion.li
                key={title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.45, ease: EASE }}
                className="h-full"
              >
                <Card interactive padded={false} className="group h-full">
                  {/* framed gradient artwork — no image assets */}
                  <div className="relative m-3 aspect-[16/9] overflow-hidden rounded-btn">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `linear-gradient(135deg, ${art.from}, ${art.to})` }}
                    >
                      <div className="absolute -top-10 -right-10 size-48 rounded-full bg-accent/15 blur-3xl" />
                      <span className="absolute right-4 bottom-2 font-display text-8xl font-semibold text-paper/5 select-none">
                        {title.charAt(0)}
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 rounded-btn bg-base/70 px-2.5 py-1 text-xs text-paper backdrop-blur-sm">
                      {category}
                    </span>
                  </div>

                  <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-display-md">{title}</h3>
                      <span className="text-sm text-muted">{year}</span>
                    </div>
                    <p className="mt-2 text-muted">{description}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent">
                      <ArrowUpRight size={16} aria-hidden="true" />
                      {result}
                    </p>
                  </div>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  );
}