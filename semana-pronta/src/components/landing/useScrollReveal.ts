import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll("main > section:not(:first-child) > *, main article, main .page-preview");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    targets.forEach((target) => { target.classList.add("reveal-pending"); observer.observe(target); });
    return () => { observer.disconnect(); targets.forEach((target) => target.classList.remove("reveal-pending", "reveal-visible")); };
  }, []);
}