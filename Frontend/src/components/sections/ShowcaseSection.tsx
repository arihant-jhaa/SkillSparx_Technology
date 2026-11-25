import { useRef } from "react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { courses } from "../../data/courses";
import { gsap, ScrollTrigger, useGSAP } from "../../motion/gsap";
import CourseArtwork from "../courses/CourseArtwork";

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const featuredCourses = courses.slice(0, 6);

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
            if (currentRef.current) currentRef.current.textContent = String(Math.min(featuredCourses.length, Math.floor(self.progress * featuredCourses.length) + 1)).padStart(2, "0");
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
    <section id="featured-classes" ref={sectionRef} className="showcase-section" aria-labelledby="showcase-heading">
      <div className="page-container showcase-intro">
        <div className="chapter-topline chapter-topline-dark"><span className="eyebrow eyebrow-purple">03 / A FEW CLASSES</span><span className="chapter-rule" /></div>
        <div className="section-intro">
          <h2 id="showcase-heading" data-reveal>Explore a subject.<br />Find your direction<span className="purple-period">.</span></h2>
          <p data-reveal>Browse a selection of courses from the full syllabus-led catalogue.</p>
        </div>
      </div>

      <div ref={viewportRef} className="showcase-viewport">
        <div className="showcase-top-note page-container"><span>COURSES FROM THE CATALOGUE</span><span className="showcase-scroll-note">SCROLL TO DISCOVER <MoveRight size={17} strokeWidth={1.4} aria-hidden="true" /></span><span className="showcase-swipe-note">SWIPE TO DISCOVER <MoveRight size={17} strokeWidth={1.4} aria-hidden="true" /></span></div>
        <div ref={trackRef} className="showcase-track">
          {featuredCourses.map((course, index) => (
            <a className="course-card" key={course.slug} href={`/courses/${course.slug}`} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) focusCourse(index); }} aria-label={`Explore ${course.title} course details`}>
              <span className="course-image-wrap"><CourseArtwork course={course} /><span className="course-number">{String(index + 1).padStart(2, "0")} / {String(featuredCourses.length).padStart(2, "0")}</span></span>
              <span className="course-content">
                <span className="course-category">{course.category}</span>
                <strong className="course-title">{course.title}</strong>
                <span className="course-description">{course.modules.length} sections in the supplied curriculum outline.</span>
                <span className="course-bottom">
                  <span className="course-meta">{course.modules.length} CURRICULUM SECTIONS</span>
                  <span className="course-action">View course <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" /></span>
                </span>
              </span>
            </a>
          ))}
        </div>
        <div className="showcase-bottom page-container"><span><span ref={currentRef}>01</span> <span className="showcase-pagination-slash">/</span> {String(featuredCourses.length).padStart(2, "0")}</span><span className="showcase-progress"><span ref={progressRef} /></span><a href="/#classes">Browse all courses <ArrowUpRight size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
