import { courses, courseCategories } from "../../data/courses";

const stats = [
  { value: courses.length, suffix: "", label: "course outlines" },
  { value: courseCategories.length, suffix: "", label: "subject areas" },
  { value: courses.reduce((total, course) => total + course.modules.length, 0), suffix: "", label: "syllabus sections" },
];

export default function TrustSection() {
  return (
    <section className="trust-section" aria-labelledby="trust-heading">
      <div className="page-container">
        <div className="trust-partners" data-reveal>
          <span className="eyebrow">THE CURRENT CATALOGUE</span>
          <div className="partner-names subject-area-ribbon" aria-label="Course subject areas">
            {courseCategories.map((category) => <span key={category}>{category}</span>)}
          </div>
        </div>
        <div className="trust-main">
          <div className="trust-copy" data-reveal>
            <p className="eyebrow eyebrow-purple">A CATALOGUE TO EXPLORE</p>
            <h2 id="trust-heading">Start with a subject.<br />Follow your curiosity<span className="purple-period">.</span></h2>
            <p>Browse the supplied course outlines and see the topics each one covers.</p>
          </div>
          <div className="trust-stats" aria-label="Course catalogue at a glance">
            {stats.map((stat, index) => (
              <div className="trust-stat" key={stat.label} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="stat-value" data-counter={stat.value} data-suffix={stat.suffix}>{stat.value}{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
