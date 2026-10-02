import { useState } from "react";
import { ArrowUpRight, Check, Award, Compass, Sparkles, Target, Zap } from "lucide-react";
import Modal from "./Modal";

const advancedPrograms = [
  {
    id: "advanced-digital-marketing",
    anchor: "advanced-digital-marketing",
    number: "01",
    tag: "6-MONTH INTENSIVE",
    title: "Advanced Digital Marketing",
    subtitle: "Strategic Growth & Performance Marketing",
    description: "Master multi-channel growth systems, automated ad stacks, search engine mastery, and high-conversion data analytics for enterprise scale.",
    duration: "6 Months",
    commitment: "12-15 hrs/week",
    format: "Live Cohort + Mentorship",
    image: "/images/course-marketing.jpg",
    imageAlt: "Advanced Digital Marketing dashboard and analytics",
    highlights: [
      "Omni-channel performance marketing & attribution modeling",
      "Full-funnel conversion rate optimization (CRO) & A/B testing",
      "Enterprise SEO, programmatic advertising & dynamic retargeting",
      "AI-driven marketing workflows and automated analytics pipelines",
      "Live $10,000+ ad campaign budget simulations and execution",
    ],
    curriculum: [
      "Month 1: Brand Strategy, Consumer Psychology & Funnel Design",
      "Month 2: Advanced SEO Architecture & Content Systems",
      "Month 3: Programmatic Ads, Paid Search & Social Scale",
      "Month 4: Marketing Automation, CRM & Retention Engineering",
      "Month 5: Data Analytics, Attribution & Growth Experimentation",
      "Month 6: Capstone Project, Portfolio Defense & Career Launch",
    ],
    careerOutcomes: [
      "Growth Marketing Manager",
      "Head of Digital Performance",
      "Senior SEO/SEM Strategist",
      "Marketing Analytics Consultant",
    ],
  },
  {
    id: "advanced-data-science",
    anchor: "advanced-data-science",
    number: "02",
    tag: "6-MONTH INTENSIVE",
    title: "Advanced Data Science",
    subtitle: "Machine Learning, Deep Learning & MLOps",
    description: "Architect end-to-end machine learning pipelines, deep neural architectures, real-time analytics systems, and scalable AI infrastructure for production.",
    duration: "6 Months",
    commitment: "15-18 hrs/week",
    format: "Live Cohort + Mentorship",
    image: "/images/course-data-science.jpg",
    imageAlt: "Advanced Data Science data models and neural graphs",
    highlights: [
      "Advanced statistical learning, Bayesian methods & hypothesis testing",
      "Deep Learning with PyTorch, Transformer models & Generative AI",
      "Big data processing with Apache Spark, Kafka & distributed systems",
      "Production MLOps, CI/CD for models, containerization & deployment",
      "Real-world enterprise capstone evaluated by industry leaders",
    ],
    curriculum: [
      "Month 1: Advanced Mathematical Foundations & Exploratory Analytics",
      "Month 2: Applied Machine Learning & Ensemble Algorithms",
      "Month 3: Deep Neural Networks & Computer Vision Systems",
      "Month 4: Natural Language Processing & Large Language Models",
      "Month 5: Distributed Big Data & Production MLOps Engineering",
      "Month 6: Enterprise Capstone Solution & Placement Sprint",
    ],
    careerOutcomes: [
      "Lead Data Scientist",
      "Machine Learning Engineer",
      "AI Systems Architect",
      "Quantitative Research Analyst",
    ],
  },
];

export default function AdvancedProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<typeof advancedPrograms[0] | null>(null);

  return (
    <section id="advanced-programs" className="advanced-programs-section" aria-labelledby="advanced-heading">
      <div className="page-container">
        <div className="chapter-topline chapter-topline-dark">
          <span className="eyebrow eyebrow-purple">04 / ELITE SPECIALIZATIONS</span>
          <span className="chapter-rule" />
        </div>

        <div className="section-intro">
          <div>
            <h2 id="advanced-heading" data-reveal>
              Advanced Programs<span className="purple-period">.</span>
            </h2>
            <p data-reveal>
              Intensive 6-month career transformation tracks combining rigorous project mastery, executive mentorship, and verified placement support.
            </p>
          </div>
          <div className="advanced-header-pill" data-reveal>
            <Zap size={16} className="text-violet-400" />
            <span>6-Month Fast-Track &middot; Cohort-Based</span>
          </div>
        </div>

        {/* Anchors for navbar direct links */}
        <div id="advanced-digital-marketing" className="category-anchor" />
        <div id="advanced-data-science" className="category-anchor" />

        {/* Advanced Cards Grid */}
        <div className="advanced-grid">
          {advancedPrograms.map((prog) => (
            <article key={prog.id} className="advanced-card" data-reveal>
              <div className="advanced-card-glow" />

              <div className="advanced-top">
                <div className="advanced-badge-row">
                  <span className="advanced-tag">{prog.tag}</span>
                  <span className="advanced-number">{prog.number} / 02</span>
                </div>
                <h3 className="advanced-title">{prog.title}</h3>
                <p className="advanced-subtitle">{prog.subtitle}</p>
                <p className="advanced-desc">{prog.description}</p>
              </div>

              <div className="advanced-specs">
                <div className="spec-item">
                  <span className="spec-label">Duration</span>
                  <strong className="spec-val">{prog.duration}</strong>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Commitment</span>
                  <strong className="spec-val">{prog.commitment}</strong>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Structure</span>
                  <strong className="spec-val">{prog.format}</strong>
                </div>
              </div>

              <div className="advanced-highlights">
                <span className="highlights-title">KEY CURRICULUM HIGHLIGHTS</span>
                <ul>
                  {prog.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>
                      <Check size={16} strokeWidth={2} className="text-violet-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="advanced-actions">
                <button
                  type="button"
                  className="button button-primary w-full justify-center"
                  onClick={() => setSelectedProgram(prog)}
                >
                  View Full 6-Month Syllabus <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Advanced Perks Ribbon */}
        <div className="advanced-perks-bar" data-reveal>
          <div className="perk-col">
            <Award className="perk-icon" size={24} />
            <div>
              <strong>Industry-Grade Certification</strong>
              <p>Recognized credential verified by technology partners.</p>
            </div>
          </div>
          <div className="perk-col">
            <Compass className="perk-icon" size={24} />
            <div>
              <strong>1-on-1 Senior Mentorship</strong>
              <p>Weekly code reviews & strategy sessions with veterans.</p>
            </div>
          </div>
          <div className="perk-col">
            <Target className="perk-icon" size={24} />
            <div>
              <strong>Guaranteed Placement Sprints</strong>
              <p>Dedicated resume refactors and hiring partner interviews.</p>
            </div>
          </div>
          <div className="perk-col">
            <Sparkles className="perk-icon" size={24} />
            <div>
              <strong>Portfolio Capstone Defense</strong>
              <p>Present end-to-end production systems to tech leaders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      <Modal
        open={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
        labelledBy="advanced-modal-title"
        className="course-dialog"
      >
        {selectedProgram && (
          <div className="course-dialog-layout">
            <div className="course-dialog-art">
              <img src={selectedProgram.image} alt={selectedProgram.imageAlt} />
            </div>
            <div className="course-dialog-copy">
              <p className="eyebrow eyebrow-purple">{selectedProgram.tag}</p>
              <h2 id="advanced-modal-title">{selectedProgram.title}</h2>
              <p className="course-dialog-description">{selectedProgram.description}</p>

              <div className="course-dialog-meta">
                <span><strong>Duration:</strong> {selectedProgram.duration}</span>
                <span><strong>Pace:</strong> {selectedProgram.commitment}</span>
                <span><strong>Format:</strong> {selectedProgram.format}</span>
              </div>

              <p className="course-dialog-small-title">6-MONTH ROADMAP</p>
              <ul>
                {selectedProgram.curriculum.map((item, idx) => (
                  <li key={idx}>
                    <Check size={17} strokeWidth={1.8} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="course-dialog-small-title" style={{ marginTop: "24px" }}>
                TARGET CAREER ROLES
              </p>
              <div className="role-tags-flex">
                {selectedProgram.careerOutcomes.map((role) => (
                  <span key={role} className="role-tag">{role}</span>
                ))}
              </div>

              <a
                className="button button-primary"
                href={`mailto:hello@skillsparx.technology?subject=Application%20for%20${encodeURIComponent(selectedProgram.title)}`}
                onClick={() => setSelectedProgram(null)}
                style={{ marginTop: "32px" }}
              >
                Apply for Next Cohort <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
