import { useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import TrustSection from "../components/sections/TrustSection";
import ManifestoSection from "../components/sections/ManifestoSection";
import LearningSection from "../components/sections/LearningSection";
import ShowcaseSection from "../components/sections/ShowcaseSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import CourseSpotlightsSection from "../components/sections/CourseSpotlightsSection";
import ProPacksSection from "../components/sections/ProPacksSection";
import StorySection from "../components/sections/StorySection";
import SubjectAreasSection from "../components/sections/SubjectAreasSection";
import PricingSection from "../components/sections/PricingSection";
import CommunitySection from "../components/sections/CommunitySection";
import FinalCTA from "../components/sections/FinalCTA";
import { useScrollReveals } from "../hooks/useScrollReveals";
import { ScrollTrigger } from "../motion/gsap";

function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const progress = distance > 0 ? Math.min(1, window.scrollY / distance) : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span ref={barRef} /></div>;
}

export default function HomePage() {
  useScrollReveals(true);

  useEffect(() => {
    let mounted = true;
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(() => { if (mounted) refresh(); });
    window.addEventListener("load", refresh);
    return () => {
      mounted = false;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustSection />
        <ManifestoSection />
        <LearningSection />
        <ShowcaseSection />
        <ProgramsSection />
        <CourseSpotlightsSection />
        <ProPacksSection />
        <StorySection />
        <SubjectAreasSection />
        <PricingSection />
        <CommunitySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
