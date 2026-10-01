import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="membership" className="pricing-section" aria-labelledby="pricing-heading">
      <div className="page-container">
        <div className="chapter-topline chapter-topline-dark"><span className="eyebrow eyebrow-purple">06 / YOUR WAY IN</span><span className="chapter-rule" /></div>
        <div className="pricing-header">
          <div>
            <h2 id="pricing-heading" data-reveal>Make space<br />for your next move<span className="purple-period">.</span></h2>
            <p data-reveal>Start with a spark. Stay for everything it becomes.</p>
          </div>
          <div className="billing-switch" role="group" aria-label="Choose billing period">
            <button type="button" className={billing === "monthly" ? "is-active" : ""} onClick={() => setBilling("monthly")} aria-pressed={billing === "monthly"}>Monthly</button>
            <button type="button" className={billing === "yearly" ? "is-active" : ""} onClick={() => setBilling("yearly")} aria-pressed={billing === "yearly"}>Yearly <span>save 17%</span></button>
          </div>
        </div>

        <div className="pricing-grid">
          <article className="plan-card" data-reveal>
            <div className="plan-top"><span className="plan-index">01 / FIND YOUR FEET</span><span className="plan-symbol">u.</span></div>
            <div className="plan-info"><h3>Explorer</h3><p>For the curious who are ready to begin.</p></div>
            <div className="plan-price"><strong>$0</strong><span>/ forever</span></div>
            <p className="plan-billing-note">No card needed. Just curiosity.</p>
            <a className="button button-outline-light" href="#classes">Explore the classes <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
            <div className="plan-details"><span>YOUR STARTING POINT</span><ul>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />A selection of introductory lessons</li>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />One guided starter project</li>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />A glimpse into the community</li>
            </ul></div>
          </article>
          <article className="plan-card plan-featured" data-reveal style={{ transitionDelay: "110ms" }}>
            <div className="plan-top"><span className="plan-index">02 / GO ALL IN</span><span className="plan-popular">MOST POPULAR</span></div>
            <div className="plan-info"><h3>Studio</h3><p>For the maker who wants room to grow.</p></div>
            <div className="plan-price"><strong>${billing === "monthly" ? "29" : "24"}</strong><span>/ month</span></div>
            <p className="plan-billing-note">{billing === "monthly" ? "Billed monthly. Change your mind anytime." : "$288 billed yearly. Change your mind anytime."}</p>
            <a className="button button-primary plan-featured-cta" href="mailto:hello@unfold.school?subject=Studio%20membership%20enquiry">Ask about Studio <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
            <div className="plan-details"><span>EVERYTHING IN EXPLORER, PLUS</span><ul>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />The complete class library</li>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />Guided projects and workbooks</li>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />Feedback from the community</li>
              <li><Check size={17} strokeWidth={1.8} aria-hidden="true" />Fresh inspiration every month</li>
            </ul></div>
          </article>
        </div>
        <p className="pricing-footnote">No pressure to have it all figured out. Just a place to begin.</p>
      </div>
    </section>
  );
}