import { useState, useId } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { courses, type Course } from "../data/site";
import Modal from "./Modal";

const categories = [
  { id: "all", label: "All Programs", anchor: "programs" },
  { id: "tech-data", label: "Tech & Data", category: "TECH & DATA", anchor: "tech-data" },
  { id: "mechanics", label: "Mechanics", category: "MECHANICS", anchor: "mechanics" },
  { id: "business", label: "Business", category: "BUSINESS", anchor: "business" },
  { id: "medical-science", label: "Medical & Science", category: "MEDICAL & SCIENCE", anchor: "medical-science" },
  { id: "design", label: "Design", category: "DESIGN", anchor: "design" },
  { id: "other-bootcamp", label: "Other / Bootcamp", category: "OTHER / BOOTCAMP", anchor: "other-bootcamp" },
];

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const filterId = useId();

  const filteredCourses = activeCategory === "all"
    ? courses
    : courses.filter((c) => {
        const catObj = categories.find((cat) => cat.id === activeCategory);
        return catObj?.category ? c.category === catObj.category : true;
      });

  const displayCourses = expanded ? filteredCourses : filteredCourses.slice(0, 5);

  return (
    <section id="programs" className="programs-section" aria-labelledby="programs-heading">
      <div className="page-container">
        <div className="chapter-topline">
          <span className="eyebrow eyebrow-purple">02 / ALL PROGRAMS</span>
          <span className="chapter-rule" />
        </div>

        <div className="section-intro">
          <div>
            <h2 id="programs-heading" data-reveal>
              Comprehensive Curriculum<span className="purple-period">.</span>
            </h2>
            <p data-reveal>
              Explore 27 specialized tracks across high-growth domains, crafted for foundational mastery and industry readiness.
            </p>
          </div>
          <div className="programs-stats-pill" data-reveal>
            <Sparkles size={16} className="text-violet-500" aria-hidden="true" />
            <span>27 Industry Programs &middot; 6 Domains</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="programs-filter-bar" role="tablist" aria-label="Filter programs by domain">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`${filterId}-${cat.id}`}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`programs-filter-btn ${activeCategory === cat.id ? "is-active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              <span className="filter-count">
                {cat.id === "all"
                  ? courses.length
                  : courses.filter((c) => c.category === cat.category).length}
              </span>
            </button>
          ))}
        </div>

        {/* Enhanced Program Categories Section */}
        <div className="programs-categories-section" data-reveal>
          <div className="section-intro">
            <h2 id="programs-heading" data-reveal>
              Comprehensive Curriculum<span className="purple-period">.</span>
            </h2>
            <p data-reveal>
              Explore 27 specialized tracks across high-growth domains, crafted for foundational mastery and industry readiness.
            </p>
            <div className="programs-stats-pill" data-reveal>
              <Sparkles size={16} className="text-violet-500" aria-hidden="true" />
              <span>27 Industry Programs &middot; 6 Domains</span>
            </div>
          </div>
        </div>

        {/* Anchors for direct navbar jumps */}
        <div id="tech-data" className="category-anchor" />
        <div id="mechanics" className="category-anchor" />
        <div id="business" className="category-anchor" />
        <div id="medical-science" className="category-anchor" />
        <div id="design" className="category-anchor" />
        <div id="other-bootcamp" className="category-anchor" />

        {/* Programs Grid */}
        <div className="programs-grid">
          {displayCourses.map((course) => (
            <article
              key={course.id}
              className="program-card"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="program-card-header">
                <span className="program-number">{course.number}</span>
                <span className="program-category-badge">{course.category}</span>
              </div>

              <div className="program-card-body">
                <h3 className="program-title">{course.title}</h3>
                <p className="program-desc">{course.description}</p>
              </div>

              <div className="program-card-footer">
                <div className="program-meta-tags">
                  <span className="meta-tag">{course.duration}</span>
                  <span className="meta-tag">{course.level}</span>
                  <span className="meta-tag">{course.lessons} Lessons</span>
                </div>
                <button
                  type="button"
                  className="program-action-btn program-view-curriculum"
                  aria-label={`View curriculum for ${course.title}`}
                >
                  View Curriculum <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredCourses.length > 5 && (
          <div className="view-more-wrap" aria-live="polite" aria-atomic="false">
            <button
              type="button"
              className="view-more-btn"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls="programs-grid"
            >
              <span>{expanded ? "Show Less" : "View More"}</span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className={`view-more-arrow ${expanded ? "is-flipped" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <Modal
        open={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        labelledBy="program-modal-title"
        className="course-dialog"
      >
        {selectedCourse && (
          <div className="course-dialog-layout">
            <div className="course-dialog-art">
              <img src={selectedCourse.image} alt={selectedCourse.imageAlt} />
            </div>
            <div className="course-dialog-copy">
              <p className="eyebrow eyebrow-purple">{selectedCourse.category}</p>
              <h2 id="program-modal-title">{selectedCourse.title}</h2>
              <p className="course-dialog-description">{selectedCourse.description}</p>

              <div className="course-dialog-meta">
                <span><strong>Duration:</strong> {selectedCourse.duration}</span>
                <span><strong>Lessons:</strong> {selectedCourse.lessons}</span>
                <span><strong>Level:</strong> {selectedCourse.level}</span>
                <span><strong>Instructor:</strong> {selectedCourse.instructor}</span>
              </div>

              <p className="course-dialog-small-title">KEY LEARNING OUTCOMES</p>
              <ul>
                {selectedCourse.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <Check size={17} strokeWidth={1.8} aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <a
                className="button button-primary"
                href="mailto:hello@skillsparx.technology?subject=Enrollment%20Enquiry%20-%20"
                onClick={() => setSelectedCourse(null)}
              >
                Enroll in Program <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
