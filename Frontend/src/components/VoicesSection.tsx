import { ArrowUpRight } from "lucide-react";
import { testimonials } from "../data/site";

export default function VoicesSection() {
  return (
    <section id="stories" className="voices-section" aria-labelledby="voices-heading">
      <div className="page-container">
        <div className="chapter-topline"><span className="eyebrow eyebrow-purple">05 / THE PEOPLE</span><span className="chapter-rule" /></div>
        <div className="voices-heading-row">
          <h2 id="voices-heading" data-reveal>The work speaks.<br />So do the people<br />behind it<span className="purple-period">.</span></h2>
          <p data-reveal>Every path looks different. That's what makes this place interesting.</p>
        </div>
        <div className="voices-grid">
          {testimonials.map((person, index) => (
            <figure className="voice-quote" key={person.name} data-reveal style={{ transitionDelay: `${index * 100}ms` }}>
              <span className="voice-mark" aria-hidden="true">&ldquo;</span>
              <blockquote>{person.quote}</blockquote>
              <figcaption>
                <img src={person.image} alt={person.imageAlt} loading="lazy" />
                <span><strong>{person.name}</strong><span>{person.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a className="inline-arrow-link" href="#community">Meet the community <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" /></a>
      </div>
    </section>
  );
}