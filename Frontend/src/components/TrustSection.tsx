import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "../motion/gsap";

// Concept social proof should be replaced with verified launch data.
const stats = [
  { value: 12, suffix: "k+", label: "curious makers" },
  { value: 46, suffix: "", label: "countries connected" },
  { value: 200, suffix: "+", label: "hands-on lessons" },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");
      const timeline = gsap.timeline({ scrollTrigger: { trigger: ".trust-stats", start: "top 84%", once: true } });

      counters.forEach((element, index) => {
        const count = { value: 0 };
        element.textContent = `0${element.dataset.suffix ?? ""}`;
        timeline.to(count, {
          value: Number(element.dataset.counter),
          duration: 1.45,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = `${Math.round(count.value)}${element.dataset.suffix ?? ""}`;
          },
        }, index * 0.12);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="trust-section" aria-labelledby="trust-heading">
      <div className="page-container">
        <div className="trust-partners" data-reveal>
          <span className="eyebrow">IN GOOD COMPANY</span>
          <div className="partner-names" aria-label="Independent creative studios in our community">
            <span className="partner-north">north<span className="partner-dot">.</span></span>
            <span className="partner-offgrid">OFFGRID</span>
            <span className="partner-margin">margins</span>
            <span className="partner-studio">STUDIO / O3</span>
          </div>
        </div>
        <div className="trust-main">
          <div className="trust-copy" data-reveal>
            <p className="eyebrow eyebrow-purple">THE WORK IS THE PROOF</p>
            <h2 id="trust-heading">A community<br />with momentum<span className="purple-period">.</span></h2>
            <p>Different disciplines. Shared curiosity. One place to keep moving forward.</p>
          </div>
          <div className="trust-stats" aria-label="unfold. community at a glance">
            {stats.map((stat, index) => (
              <div className="trust-stat" key={stat.label} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="stat-value" data-counter={stat.value} data-suffix={stat.suffix}>{stat.value}{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}