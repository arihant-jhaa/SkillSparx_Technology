import { useEffect } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ProgramsSection from "../components/sections/ProgramsSection";
import { useScrollReveals } from "../hooks/useScrollReveals";

export default function ClassesPage() {
  useScrollReveals(true);

  useEffect(() => {
    document.title = "Classes | SkillSparx Technology";
    return () => { document.title = "SkillSparx Technology - Technology & Career Programs"; };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar classesPage />
      <main id="main-content">
        <ProgramsSection />
      </main>
      <Footer homeLinks />
    </>
  );
}
