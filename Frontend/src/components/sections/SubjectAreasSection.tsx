import { ArrowUpRight } from "lucide-react";
import { courses, courseCategories, slugForCategory } from "../../data/courses";

export default function SubjectAreasSection() {
  return (
    <section id="subject-areas" className="subject-areas-section" aria-labelledby="subject-areas-heading">
      <div className="page-container">
        <div className="chapter-topline chapter-topline-dark"><span className="eyebrow eyebrow-purple">05 / SUBJECT AREAS</span><span className="chapter-rule" /></div>
        <div className="subject-areas-heading">
          <div>
            <p className="eyebrow eyebrow-purple">THE SKILLSPARX CATALOGUE</p>
            <h2 id="subject-areas-heading">A field for every kind<br />of curiosity<span className="purple-period">.</span></h2>
          </div>
          <p>Each subject area links to its available course outlines and syllabus details.</p>
        </div>
        <div className="subject-areas-grid">
          {courseCategories.map((category, index) => {
            const categoryCourses = courses.filter((course) => course.category === category);
            const featured = categoryCourses[0];
            return (
              <a className="subject-area-card" key={category} href={`/#program-category-${slugForCategory(category)}`}>
                <span className="subject-area-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="subject-area-count">{categoryCourses.length} course{categoryCourses.length === 1 ? "" : "s"}</span>
                <strong>{category}</strong>
                <span className="subject-area-example">{featured?.title}</span>
                <span className="subject-area-action">Browse this field <ArrowUpRight size={17} aria-hidden="true" /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
