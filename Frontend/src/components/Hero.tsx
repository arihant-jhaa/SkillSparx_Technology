import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../motion/gsap";
import { courses, courseCategories } from "../data/courses";
import CourseArtwork from "./CourseArtwork";

const columns = [
  [courses[0], courses[5], courses[8], courses[1]],
  [courses[2], courses[10], courses[14], courses[4]],
  [courses[6], courses[16], courses[20], courses[11]],
  [courses[19], courses[24], courses[28], courses[30]],
];

function SubjectCard({ course, priority = false }: { course: (typeof courses)[number]; priority?: boolean }) {
  return (
    <div className="mentor-card subject-hero-card">
      <CourseArtwork course={course} compact priority={priority} />
      <span className="mentor-card-shade" aria-hidden="true" />
      <span className="mentor-meta">
        <span className="mentor-name">{course.title}</span>
        <span className="mentor-course">{course.category}</span>
      </span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0.1)
        .from(".hero-line-inner", { yPercent: 115, duration: 0.95, stagger: 0.1 }, 0.2)
        .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, 0.72)
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, 0.84)
        .from(".hero-subtle", { y: 10, opacity: 0, duration: 0.4 }, 0.94)
        .from(".hero-stage", { opacity: 0, scale: 1.04, duration: 1.1, ease: "power2.out" }, 0.1);
    });
    return () => media.revert();
  }, { scope: heroRef });

  return (
    <section id="top" ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-stage">
          {columns.map((items, columnIndex) => (
            <div key={columnIndex} className={`marquee-col ${columnIndex % 2 === 1 ? "is-down" : ""}`}>
              <div className="marquee-col-inner" style={{ animationDuration: `${30 + columnIndex * 6}s` }}>
                {[...items, ...items].map((course, cardIndex) => <SubjectCard key={`${course.slug}-${cardIndex}`} course={course} priority={columnIndex === 0 && cardIndex < 4} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="page-container hero-content">
        <p className="eyebrow hero-eyebrow"><span className="hero-badge">32</span> syllabus-led course outlines</p>
        <h1 id="hero-heading" className="hero-title" aria-label="Build practical skills across technology and beyond.">
          <span className="hero-line"><span className="hero-line-inner">Build practical</span></span>
          <span className="hero-line"><span className="hero-line-inner">skills across</span></span>
          <span className="hero-line"><span className="hero-line-inner">fields<span className="purple-period">.</span></span></span>
        </h1>
        <p className="hero-description">Explore course outlines across technology, design, business, engineering, health, and management.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#classes">View course catalogue <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
          <a className="button button-ghost-light" href="#approach">Explore the approach <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <p className="hero-subtle">{courses.length} courses <span aria-hidden="true">·</span> {courseCategories.length} subject areas</p>
      </div>
    </section>
  );
}
