import { ArrowUpRight, Zap, Star, ShieldCheck, PlayCircle } from "lucide-react";

export default function ProPacksSection() {
  return (
    <section id="pro-packs" className="pro-packs-section" aria-labelledby="pro-packs-heading">
      <div className="page-container">
        <div className="chapter-topline">
          <span className="eyebrow eyebrow-purple">05 / PRO PACKS & SUPPORT</span>
          <span className="chapter-rule" />
        </div>

        <div className="section-intro">
          <div>
            <h2 id="pro-packs-heading" data-reveal>
              Accelerate your path<span className="purple-period">.</span>
            </h2>
            <p data-reveal>
              Curated strategic bundles and premium support to bridge the gap between skill-building and career reality.
            </p>
          </div>
        </div>

        <div className="pro-packs-grid">
          {/* Value Packs */}
          <div className="pro-pack-tier" data-reveal>
            <div className="tier-header">
              <Zap size={24} className="text-violet-500" />
              <h3>Value Bundles</h3>
            </div>
            <div className="pro-packs-list">
              {[
                { title: "MBA Lite", desc: "Foundational business analysis for non-business grads." },
                { title: "Tech Starter", desc: "Core web + cloud + security essentials." },
                { title: "Creators Pack", desc: "Design, UI/UX, and marketing toolkit." },
                { title: "Make Your Own", desc: "Curate any 5 courses for customized learning." },
              ].map((pack) => (
                <div key={pack.title} className="pro-pack-item">
                  <div className="pro-pack-info">
                    <strong>{pack.title}</strong>
                    <p>{pack.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Pass */}
          <div className="pro-pack-tier featured" data-reveal>
            <div className="tier-header">
              <Star size={24} className="text-yellow-500" />
              <h3>The Golden Pass</h3>
            </div>
            <p className="golden-pass-desc">
              Get lifetime access to our entire class library, advanced projects, and priority perks.
            </p>
            <div className="golden-pass-features">
              <span>&diams; 20+ Comprehensive Courses</span>
              <span>&diams; All Pro Packs Included</span>
              <span>&diams; Lifetime Platform Access</span>
              <span>&diams; Premium Feature Updates</span>
            </div>
            <a href="mailto:hello@skillsparx.technology?subject=Golden%20Pass%20Enquiry" className="button button-primary">Secure Golden Pass <ArrowUpRight /></a>
          </div>

          {/* Support */}
          <div className="pro-pack-tier support" data-reveal>
            <div className="tier-header">
              <ShieldCheck size={24} className="text-emerald-500" />
              <h3>Career Support</h3>
            </div>
            <div className="support-list">
              <div className="support-item">
                <PlayCircle size={20} className="text-violet-400" />
                <div>
                  <strong>Mock Interviews</strong>
                  <p>1-on-1 sessions with industry pros covering algorithm analysis & system design.</p>
                </div>
              </div>
              <div className="support-item">
                <PlayCircle size={20} className="text-violet-400" />
                <div>
                  <strong>Placement Assistance</strong>
                  <p>Direct referrals to hiring partners & personalized portfolio refinement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
