import { useEffect } from "react";

// Locks background scrolling while `isLocked` is true (mobile drawer, modals).
// Restores the previous value on cleanup.
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isLocked]);
}