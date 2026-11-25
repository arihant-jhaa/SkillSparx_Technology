import { ArrowUpRight, BookOpen } from "lucide-react";
import CourseArtwork from "./CourseArtwork";
import { courses } from "../data/courses";

const spotlightCourses = ["data-science", "digital-marketing"]
  .map((slug) => courses.find((course) => course.slug === slug))
  .filter((course) => course !== undefined);

export default function AdvancedProgramsSection() {
  return (
    <section id="advanced-programs" className="advanced-programs-section" aria-labelledby="advanced-heading">
      <div className="page-container">
        <div className="chapter-topline chapter-topline-dark">
          <span className="eyebrow eyebrow-purple">04 / COURSE SPOTLIGHT</span>
          <span className="chapter-rule" />
        </div>

        <div className="section-intro">
          <div>
            <h2 id="advanced-heading" data-reveal>
              Take a closer look<span className="purple-period">.</span>
            </h2>
            <p data-reveal>Explore two course outlines from the catalogue, with details taken directly from their supplied syllabi.</p>
          </div>
        </div>

        <div className="advanced-grid">
          {spotlightCourses.map((course) => (
            <article key={course.slug} className="advanced-card" data-reveal>
              <CourseArtwork course={course} compact />
              <div className="advanced-top">
                <div className="advanced-badge-row">
                  <span className="advanced-tag">{course.category}</span>
                  <span className="advanced-number">{course.modules.length} sections</span>
                </div>
                <h3 className="advanced-title">{course.title}</h3>
                <p className="advanced-desc">
                  {course.modules.slice(0, 2).map((module) => module.title).join(" · ")}
                </p>
              </div>

              <div className="advanced-highlights">
                <span className="highlights-title">FROM THE SYLLABUS</span>
                <ul>
                  {course.modules.slice(0, 3).map((module) => (
                    <li key={module.title}>
                      <BookOpen size={16} strokeWidth={1.8} aria-hidden="true" />
                      <span>{module.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="advanced-actions">
                <a className="button button-primary w-full justify-center" href={`/courses/${course.slug}`}>
                  View course details <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
