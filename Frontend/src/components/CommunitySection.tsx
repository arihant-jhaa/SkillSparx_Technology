import { ArrowUpRight, GraduationCap } from "lucide-react";
import { communityFaces } from "../data/site";
import DottedGlobe from "./DottedGlobe";

const leftWing = communityFaces.slice(0, 6);
const rightWing = communityFaces.slice(6, 12);

export default function CommunitySection() {
  return (
    <section id="community" className="community-section" aria-labelledby="community-heading">
      <DottedGlobe className="community-globe" color="26, 22, 34" />

      <div className="community-faces community-faces-left" aria-hidden="true">
        {leftWing.map((face, index) => (
          <figure key={face.image + index} className={`community-face face-l-${index + 1}`}>
            <img src={face.image} alt="" loading="lazy" />
          </figure>
        ))}
      </div>
      <div className="community-faces community-faces-right" aria-hidden="true">
        {rightWing.map((face, index) => (
          <figure key={face.image + index} className={`community-face face-r-${index + 1}`}>
            <img src={face.image} alt="" loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="community-mobile-faces" aria-hidden="true">
        {communityFaces.slice(0, 8).map((face, index) => (
          <img key={face.image + index} src={face.image} alt="" loading="lazy" />
        ))}
      </div>

      <div className="page-container community-content">
        <p className="eyebrow community-chip" data-reveal><GraduationCap size={15} strokeWidth={1.8} aria-hidden="true" /> Community</p>
        <h2 id="community-heading" data-reveal>Join our community<br />where creativity thrives<span className="purple-period">.</span></h2>
        <p className="community-description" data-reveal>Unlock the benefits of a global network of makers, growing your skills and building real connections.</p>
        <a className="button button-primary community-cta" href="#membership" data-reveal>View courses <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
