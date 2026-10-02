import { useRef, useState } from "react";
import { ArrowUpRight, Check, MoveRight } from "lucide-react";
import { courses, type Course } from "../data/site";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import Modal from "./Modal";

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useGSAP(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(track, {
        x: () => -Math.max(0, track.scrollWidth - viewport.clientWidth),
        ease: "none",
        scrollTrigger: {
          id: "showcase-horizontal",
          trigger: viewport,
          start: "top top",
          end: () => `+=${Math.max(750, track.scrollWidth - viewport.clientWidth + 180)}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            if (currentRef.current) currentRef.current.textContent = String(Math.min(6, Math.floor(self.progress * 6) + 1)).padStart(2, "0");
          },
        },
      });
    });

    return () => media.revert();
  }, { scope: sectionRef });

  const focusCourse = (index: number) => {
    if (window.innerWidth <= 900 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = ScrollTrigger.getById("showcase-horizontal");
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!trigger || !viewport || !track || !card) return;

    const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const desired = Math.min(distance, Math.max(0, card.offsetLeft - viewport.clientWidth * 0.12));
    const progress = distance > 0 ? desired / distance : 0;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "smooth" });
  };

  return (
    <section id="classes" ref={sectionRef} className="showcase-section" aria-labelledby="showcase-heading">
      <div className="page-container showcase-intro">
        <div className="chapter-topline chapter-topline-dark"><span className="eyebrow eyebrow-purple">03 / THE CLASSES</span><span className="chapter-rule" /></div>
        <div className="section-intro">
          <h2 id="showcase-heading" data-reveal>Featured.<br />Start your journey<span className="purple-period">.</span></h2>
          <p data-reveal>Explore our most popular programs handpicked by industry experts.</p>
        </div>
      </div>

      <div ref={viewportRef} className="showcase-viewport">
        <div className="showcase-top-note page-container"><span>EXPLORE THE COLLECTION</span><span className="showcase-scroll-note">SCROLL TO DISCOVER <MoveRight size={17} strokeWidth={1.4} aria-hidden="true" /></span><span className="showcase-swipe-note">SWIPE TO DISCOVER <MoveRight size={17} strokeWidth={1.4} aria-hidden="true" /></span></div>
        <div ref={trackRef} className="showcase-track">
          {courses.slice(0, 6).map((course, index) => (
            <button className="course-card" key={course.id} type="button" onClick={() => setSelectedCourse(course)} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) focusCourse(index); }} aria-label={`Explore ${course.title} class`}>
              <span className="course-image-wrap"><img src={course.image} alt={course.imageAlt} loading="lazy" /><span className="course-number">{course.number} / 06</span></span>
              <span className="course-content">
                <span className="course-category">{course.category}</span>
                <strong className="course-title">{course.title}</strong>
                <span className="course-description">{course.description}</span>
                <span className="course-bottom">
                <span className="course-meta">
                  {course.duration.toUpperCase()} <span className="course-dot" /> {course.level.toUpperCase()}
                </span>
                <span className="course-action">
                  View Curriculum <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </span>
              </span>
            </button>
          ))}
        </div>
        <div className="showcase-bottom page-container"><span><span ref={currentRef}>01</span> <span className="showcase-pagination-slash">/</span> 06</span><span className="showcase-progress"><span ref={progressRef} /></span><span>CURATED FOR THE CURIOUS</span></div>
      </div>

      <Modal open={selectedCourse !== null} onClose={() => setSelectedCourse(null)} labelledBy="course-dialog-title" className="course-dialog">
        {selectedCourse && (
          <div className="course-dialog-layout">
            <div className="course-dialog-art"><img src={selectedCourse.image} alt={selectedCourse.imageAlt} /></div>
            <div className="course-dialog-copy">
              <p className="eyebrow eyebrow-purple">{selectedCourse.category}</p>
              <h2 id="course-dialog-title">{selectedCourse.title}</h2>
              <p className="course-dialog-description">{selectedCourse.description}</p>
              <div className="course-dialog-meta"><span>{selectedCourse.duration}</span><span>{selectedCourse.lessons} lessons</span><span>{selectedCourse.level}</span></div>
              <p className="course-dialog-small-title">WHAT YOU'LL MAKE POSSIBLE</p>
              <ul>{selectedCourse.outcomes.map((outcome) => <li key={outcome}><Check size={17} strokeWidth={1.8} aria-hidden="true" />{outcome}</li>)}</ul>
              <a className="button button-primary" href="#membership" onClick={() => setSelectedCourse(null)}>See membership <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}