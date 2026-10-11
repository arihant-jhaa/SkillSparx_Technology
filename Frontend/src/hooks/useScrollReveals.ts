import { useEffect } from "react";

export function useScrollReveals(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
    );

    const revealInViewport = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("is-visible");
          }
        }
      });
    };

    revealInViewport();
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);
}