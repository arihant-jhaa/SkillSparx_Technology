import { ArrowUpRight, BookOpenText } from "lucide-react";
import DottedGlobe from "./DottedGlobe";

export default function CommunitySection() {
  return (
    <section id="community" className="community-section" aria-labelledby="community-heading">
      <DottedGlobe className="community-globe" color="26, 22, 34" />

      <div className="page-container community-content">
        <p className="eyebrow community-chip" data-reveal><BookOpenText size={15} strokeWidth={1.8} aria-hidden="true" /> Course catalogue</p>
        <h2 id="community-heading" data-reveal>Find a subject.<br />Explore its syllabus<span className="purple-period">.</span></h2>
        <p className="community-description" data-reveal>Browse the available classes and review the topics included in each supplied course outline.</p>
        <a className="button button-primary community-cta" href="#classes" data-reveal>Browse all classes <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
