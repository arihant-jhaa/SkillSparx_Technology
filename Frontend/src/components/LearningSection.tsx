import { useState } from "react";
import { ArrowUpRight, BookOpen, Grid2X2, Layers3, Play, UsersRound } from "lucide-react";
import { features } from "../data/site";

export default function LearningSection() {
  const [selected, setSelected] = useState(0);
  const feature = features[selected];

  return (
    <section id="approach" className="learning-section" aria-labelledby="learning-heading">
      <div className="page-container">
        <div className="chapter-topline"><span className="eyebrow eyebrow-purple">02 / THE APPROACH</span><span className="chapter-rule" /></div>
        <div className="section-intro learning-intro">
          <h2 id="learning-heading" data-reveal>A little less theory.<br />A lot more making<span className="purple-period">.</span></h2>
          <p data-reveal>Good learning changes what you can do next. This is a space to find your people, build your skills, and make your ideas real.</p>
        </div>

        <div className="learning-layout">
          <div className="feature-list" role="group" aria-label="Explore the SkillSparx Technology approach" data-reveal>
            {features.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`feature-option ${selected === index ? "is-selected" : ""}`}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                aria-controls="learning-preview"
              >
                <span className="feature-option-number">{item.number}</span>
                <span className="feature-option-copy"><strong>{item.title}</strong><span>{item.description}</span></span>
                <ArrowUpRight size={22} strokeWidth={1.55} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div id="learning-preview" className="studio-shell" aria-live="polite" data-reveal="scale">
            <div className="studio-topbar">
              <div className="studio-topbrand"><span className="studio-mini-mark">S<span>.</span></span><span className="studio-top-divider" /> <span>YOUR STUDIO</span></div>
              <div className="studio-top-actions"><span>MY LEARNING</span><span className="studio-avatar">M</span></div>
            </div>
            <div className="studio-layout">
              <div className="studio-rail" aria-hidden="true">
                <span className="studio-rail-active"><Grid2X2 size={17} strokeWidth={1.8} /></span>
                <span><BookOpen size={17} strokeWidth={1.7} /></span>
                <span><Layers3 size={17} strokeWidth={1.7} /></span>
                <span><UsersRound size={17} strokeWidth={1.7} /></span>
              </div>
              <div key={selected} className="studio-main preview-enter">
                <div className="studio-heading-row">
                  <div>
                    <p className="studio-eyebrow">{feature.label}</p>
                    <h3>{feature.previewTitle}</h3>
                    <p className="studio-description">{feature.previewDescription}</p>
                  </div>
                  <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="studio-art">
                  <img src={feature.previewImage} alt={feature.previewAlt} loading="lazy" />
                  <span className="studio-art-play" aria-hidden="true"><Play size={15} fill="currentColor" strokeWidth={1.5} /></span>
                  <span className="studio-art-caption">MAKE SPACE FOR THE PROCESS</span>
                </div>
                <div className="studio-bottom-row">
                  <div><span className="studio-bottom-label">YOUR JOURNEY</span><strong>{feature.progressLabel}</strong></div>
                  <span className="studio-percent">{feature.progress}%</span>
                </div>
                <div className="studio-progress"><span style={{ width: `${feature.progress}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}