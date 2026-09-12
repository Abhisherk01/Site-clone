import { motion } from "framer-motion";
import { services } from "../data/services.js";
import { fadeRiseChild, REVEAL_VIEWPORT, staggerParent } from "../lib/motion.js";
import Card from "../components/Card.jsx";
import Container from "../components/Container.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Capabilities for the full journey"
          description="Six disciplines, one team. Engage us for a single project or as your long-term product partner."
        />

        {/* One parent orchestrates the whole grid — rows stagger naturally */}
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, description, tags }, index) => (
            <motion.li key={title} variants={fadeRiseChild} className="h-full">
              <Card interactive className="group relative h-full">
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 font-display text-sm text-muted/50 transition-colors duration-300 group-hover:text-accent sm:right-8 sm:top-8"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex size-12 items-center justify-center rounded-btn bg-accent-soft text-accent ring-1 ring-inset ring-accent/15 transition-all duration-300 group-hover:ring-accent/45">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-display text-display-md">{title}</h3>
                <p className="mt-3 text-muted">{description}</p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${title} capabilities`}>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-btn border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}