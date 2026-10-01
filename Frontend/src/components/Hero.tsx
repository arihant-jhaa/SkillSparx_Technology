import { useRef } from "react";
import { ArrowUpRight, Play, Sparkles, Star } from "lucide-react";
import { gsap, useGSAP } from "../motion/gsap";
import { mentors, type Mentor } from "../data/site";

const columns: Mentor[][] = [
  [mentors[0], mentors[4], mentors[8], mentors[1]],
  [mentors[2], mentors[6], mentors[10], mentors[3]],
  [mentors[5], mentors[9], mentors[7], mentors[11]],
  [mentors[8], mentors[1], mentors[4], mentors[6]],
];

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="mentor-card">
      <img src={mentor.image} alt="" loading="lazy" />
      <span className="mentor-card-shade" aria-hidden="true" />
      <span className="mentor-play" aria-hidden="true"><Play size={12} fill="currentColor" strokeWidth={0} /></span>
      <span className="mentor-meta">
        <span className="mentor-name">{mentor.name}</span>
        <span className="mentor-course">{mentor.course}</span>
      </span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0.1)
          .from(".hero-line-inner", { yPercent: 115, duration: 0.95, stagger: 0.1 }, 0.2)
          .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, 0.72)
          .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, 0.84)
          .from(".hero-proof", { y: 20, opacity: 0, duration: 0.6 }, 0.94)
          .from(".hero-stage", { opacity: 0, scale: 1.04, duration: 1.1, ease: "power2.out" }, 0.1);
      });
      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <section id="top" ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-stage">
          {columns.map((items, index) => (
            <div key={index} className={`marquee-col ${index % 2 === 1 ? "is-down" : ""}`}>
              <div className="marquee-col-inner" style={{ animationDuration: `${30 + index * 6}s` }}>
                {[...items, ...items].map((mentor, cardIndex) => (
                  <MentorCard key={`${mentor.name}-${cardIndex}`} mentor={mentor} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="page-container hero-content">
        <p className="eyebrow hero-eyebrow"><span className="hero-badge">New</span> Registrations are now open</p>
        <h1 id="hero-heading" className="hero-title" aria-label="Learn from top creative mentors worldwide.">
          <span className="hero-line"><span className="hero-line-inner">Learn from top</span></span>
          <span className="hero-line"><span className="hero-line-inner"><span className="hero-title-accent">creative</span> mentors</span></span>
          <span className="hero-line"><span className="hero-line-inner">worldwide<span className="purple-period">.</span></span></span>
        </h1>
        <p className="hero-description">Highly demanded skills, taught through practical courses built by the people doing the real work.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#classes">View courses <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
          <a className="button button-ghost-light" href="#approach">Watch preview <Play size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" /></a>
        </div>
        <div className="hero-proof">
          <div className="hero-avatars" aria-hidden="true">
            {mentors.slice(0, 4).map((mentor) => <img key={mentor.name} src={mentor.image} alt="" loading="lazy" />)}
          </div>
          <div className="hero-proof-text">
            <strong>Loved by 500+ founders</strong>
            <span className="hero-stars"><Star size={13} fill="currentColor" strokeWidth={0} /><Star size={13} fill="currentColor" strokeWidth={0} /><Star size={13} fill="currentColor" strokeWidth={0} /><Star size={13} fill="currentColor" strokeWidth={0} /><Star size={13} fill="currentColor" strokeWidth={0} /> 13 reviews</span>
          </div>
          <span className="hero-proof-chip"><Sparkles size={14} strokeWidth={1.7} aria-hidden="true" /> 12k+ makers</span>
        </div>
      </div>
    </section>
  );
}
