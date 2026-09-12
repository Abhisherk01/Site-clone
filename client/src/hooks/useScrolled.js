import { useEffect, useState } from "react";

// True once the page is scrolled past `threshold` — drives the header's
// transparent → solid transition. Passive listener, no layout reads per frame.
export default function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}