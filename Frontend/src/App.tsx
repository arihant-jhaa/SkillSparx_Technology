import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustSection from "./components/TrustSection";
import ManifestoSection from "./components/ManifestoSection";
import LearningSection from "./components/LearningSection";
import ShowcaseSection from "./components/ShowcaseSection";
import ProgramsSection from "./components/ProgramsSection";
import AdvancedProgramsSection from "./components/AdvancedProgramsSection";
import ProPacksSection from "./components/ProPacksSection";
import StorySection from "./components/StorySection";
import VoicesSection from "./components/VoicesSection";
import PricingSection from "./components/PricingSection";
import CommunitySection from "./components/CommunitySection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { useScrollReveals } from "./hooks/useScrollReveals";
import { ScrollTrigger } from "./motion/gsap";

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

export default function App() {
  useScrollReveals();

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
        <AdvancedProgramsSection />
        <ProPacksSection />
        <StorySection />
        <VoicesSection />
        <PricingSection />
        <CommunitySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
