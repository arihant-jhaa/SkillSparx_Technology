import { useRef } from "react";
import { gsap, useGSAP } from "../motion/gsap";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 66%", end: "bottom 35%", scrub: 0.6 },
        });

        words.forEach((word, index) => {
          timeline.fromTo(word,
            { opacity: 0.18, y: 38, filter: "blur(5px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" },
            index * 0.72,
          );
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="manifesto" ref={sectionRef} className="manifesto-section" aria-labelledby="manifesto-heading">
      <div className="page-container">
        <div className="chapter-topline"><span className="eyebrow eyebrow-purple">01 / THE IDEA</span><span className="chapter-rule" /></div>
        <h2 id="manifesto-heading" className="manifesto-heading" aria-label="Learn. Make. Become.">
          <span className="manifesto-word">Learn<span className="purple-period">.</span></span>
          <span className="manifesto-word">Make<span className="purple-period">.</span></span>
          <span className="manifesto-word">Become<span className="purple-period">.</span></span>
        </h2>
        <div className="manifesto-bottom">
          <span className="manifesto-index">THE UNFOLD WAY&nbsp; / &nbsp;01-03</span>
          <p>Because the best way to find out what you're capable of is to make something you care about.</p>
        </div>
      </div>
    </section>
  );
}