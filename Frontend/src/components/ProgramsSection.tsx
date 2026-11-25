import { useEffect, useState } from "react";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import CourseArtwork from "./CourseArtwork";
import { courseCategories, courses, slugForCategory } from "../data/courses";

const initialVisibleCount = 9;

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const categoryOptions = ["All Programs", ...courseCategories];
  const filteredCourses = courses.filter((course) => {
    const categoryMatches = activeCategory === "all" || course.category === activeCategory;
    const term = query.trim().toLocaleLowerCase();
    if (!categoryMatches || !term) return categoryMatches;
    return `${course.title} ${course.category} ${course.modules.map((module) => `${module.title} ${module.lessons.join(" ")}`).join(" ")}`
      .toLocaleLowerCase()
      .includes(term);
  });
  const displayCourses = expanded ? filteredCourses : filteredCourses.slice(0, initialVisibleCount);

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const match = window.location.hash.match(/^#program-category-(.+)$/);
      if (!match) return;
      const category = courseCategories.find((item) => slugForCategory(item) === match[1]);
      if (category) setActiveCategory(category);
    };
    window.addEventListener("hashchange", syncCategoryFromHash);
    syncCategoryFromHash();
    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, []);

  const selectCategory = (category: string) => {
    setActiveCategory(category === "All Programs" ? "all" : category);
    setExpanded(false);
    const hash = category === "All Programs" ? "#programs" : `#program-category-${slugForCategory(category)}`;
    if (window.location.hash !== hash) window.location.hash = hash;
  };

  return (
    <section id="classes" className="programs-section" aria-labelledby="programs-heading">
      <div className="page-container">
        <div className="chapter-topline">
          <span className="eyebrow eyebrow-purple">02 / ALL CLASSES</span>
          <span className="chapter-rule" />
        </div>

        <div className="section-intro programs-intro" id="programs">
          <div>
            <h2 id="programs-heading" data-reveal>
              Find your next skill<span className="purple-period">.</span>
            </h2>
            <p data-reveal>Explore the course outlines and choose a subject to learn more.</p>
          </div>
          <div className="programs-stats-pill" data-reveal>
            <Sparkles size={16} aria-hidden="true" />
            <span>{courses.length} courses · {courseCategories.length} subject areas</span>
          </div>
        </div>

        <div className="programs-discovery-controls">
          <div className="programs-filter-bar" role="group" aria-label="Filter classes by subject area">
            {categoryOptions.map((category) => {
              const categorySlug = category === "All Programs" ? "all" : slugForCategory(category);
              const selected = category === "All Programs" ? activeCategory === "all" : activeCategory === category;
              const count = category === "All Programs" ? courses.length : courses.filter((course) => course.category === category).length;
              return (
                <button
                  key={category}
                  id={`program-category-${categorySlug}`}
                  type="button"
                  className={`programs-filter-btn ${selected ? "is-active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
          <label className="programs-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search courses and curriculum topics</span>
            <input
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setExpanded(false); }}
              placeholder="Search courses or topics"
            />
          </label>
        </div>

        <div className="programs-grid" id="programs-grid" aria-live="polite">
          {displayCourses.map((course, index) => (
            <article key={course.slug} className="program-card" data-reveal style={{ transitionDelay: `${(index % 3) * 50}ms` }}>
              <a className="program-card-link" href={`/courses/${course.slug}`} aria-label={`View ${course.title} course details`}>
                <div className="program-card-header">
                  <span className="program-number">{String(courses.indexOf(course) + 1).padStart(2, "0")}</span>
                  <span className="program-category-badge">{course.category}</span>
                </div>
                <CourseArtwork course={course} compact />
                <div className="program-card-body">
                  <h3 className="program-title">{course.title}</h3>
                <p className="program-desc">{course.modules.slice(0, 2).map((module) => module.title).join(" · ")}</p>
                </div>
                <div className="program-card-footer">
                  <span className="program-module-count">{course.modules.length} curriculum sections</span>
                  <span className="program-card-action">
                    View course <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="programs-empty" role="status">No courses match that search. Try another title or topic.</p>
        )}

        {filteredCourses.length > initialVisibleCount && (
          <div className="view-more-wrap">
            <button
              type="button"
              className="view-more-btn"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls="programs-grid"
            >
              <span>{expanded ? "Show fewer courses" : `View all ${filteredCourses.length} courses`}</span>
              <ArrowUpRight size={16} strokeWidth={1.8} className={`view-more-arrow ${expanded ? "is-flipped" : ""}`} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
