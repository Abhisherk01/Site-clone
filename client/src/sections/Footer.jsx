import { ArrowUp, ArrowUpRight } from "lucide-react";
import Container from "../components/Container.jsx";
import Logo from "../components/Logo.jsx";
import { navLinks } from "../data/site.js";
import { footerData } from "../data/footer.js";
import { contactIntro } from "../data/contact.js";

const linkBase =
  "transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-base">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              {footerData.tagline}
            </p>
          </div>

          {/* Site nav — same data as the header nav (single source) */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper">
              Site
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={`text-sm text-muted ${linkBase}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper">
              Elsewhere
            </h2>
            <ul className="mt-5 space-y-3">
              {footerData.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`inline-flex items-center gap-1.5 text-sm text-muted ${linkBase}`}
                  >
                    {social.label}
                    <ArrowUpRight size={14} aria-hidden="true" className="text-muted" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contactIntro.email}`}
              className={`mt-6 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline ${linkBase}`}
            >
              {contactIntro.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} Meridian Studio. All rights reserved.
          </p>
          <a
            href="#top"
            className={`inline-flex items-center gap-1.5 text-sm font-medium text-paper ${linkBase}`}
          >
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}