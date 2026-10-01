import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../motion/gsap";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        defaults: { ease: "power3.out" },
      })
        .from(".final-eyebrow", { opacity: 0, y: 16, duration: 0.55 })
        .from(".final-line-inner", { yPercent: 110, duration: 0.9, stagger: 0.11 }, 0.12)
        .from(".final-description", { opacity: 0, y: 22, duration: 0.65 }, 0.62)
        .from(".final-button", { opacity: 0, y: 20, duration: 0.65 }, 0.72);

      gsap.fromTo(".final-image", { scale: 1.13 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="final-section" aria-labelledby="final-heading">
      <img className="final-image" src="/images/final-sculpture.jpg" alt="Sculptural violet ribbon folding through a dark space" loading="lazy" />
      <div className="final-shade" aria-hidden="true" />
      <div className="page-container final-content">
        <p className="eyebrow final-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 id="final-heading" aria-label="What will you make next?">
          <span className="final-line"><span className="final-line-inner">What will you</span></span>
          <span className="final-line"><span className="final-line-inner">make next<span className="purple-period">?</span></span></span>
        </h2>
        <p className="final-description">There's room for your ideas here. Let's see where they go.</p>
        <a className="button button-primary final-button" href="#classes">Find your class <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
    </section>
  );
}