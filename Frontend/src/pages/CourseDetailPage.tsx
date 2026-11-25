import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText, CalendarClock, Check, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import CourseArtwork from "../components/courses/CourseArtwork";
import WhatsAppLink from "../components/courses/WhatsAppLink";
import { courses, findCourse, type Course } from "../data/courses";

function CourseNotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar coursePage />
      <main className="course-not-found" id="main-content">
        <span className="eyebrow eyebrow-purple">COURSE NOT FOUND</span>
        <h1>We couldn’t find that course.</h1>
        <p>Check the course link or browse the available classes.</p>
        <a className="button button-primary" href="/#classes"><ArrowLeft size={17} aria-hidden="true" /> Back to all classes</a>
      </main>
    </>
  );
}

function scheduleLabel(schedule: string): string {
  return /notified|will be notified/i.test(schedule) ? "Schedule to be announced" : schedule;
}

function CourseCurriculum({ course }: { course: Course }) {
  return (
    <div className="course-curriculum-list">
      {course.modules.map((module, index) => (
        <details className="course-module" key={`${module.title}-${index}`} open={index === 0}>
          <summary>
            <span className="course-module-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="course-module-heading">
              <strong>{module.title}</strong>
              {module.schedule && <span className="course-module-schedule"><CalendarClock size={14} aria-hidden="true" /> {scheduleLabel(module.schedule)}</span>}
            </span>
            <ChevronDown className="course-module-chevron" size={20} aria-hidden="true" />
          </summary>
          <div className="course-module-content">
            {module.lessons.length > 0 ? (
              <ul>
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={`${lesson}-${lessonIndex}`}><Check size={15} aria-hidden="true" /><span>{lesson}</span></li>
                ))}
              </ul>
            ) : (
              <p className="course-module-empty">The supplied outline does not list subtopics for this section.</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function CourseDetailPage({ slug }: { slug: string }) {
  const course = findCourse(slug);

  useEffect(() => {
    document.title = course ? `${course.title} | SkillSparx Technology` : "Course not found | SkillSparx Technology";
    return () => { document.title = "SkillSparx Technology - Technology & Career Programs"; };
  }, [course]);

  if (!course) return <CourseNotFound />;

  const scheduledSections = course.modules.filter((module) => module.schedule).length;
  const listedTopics = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const syllabusHighlights = course.modules.slice(0, 4);
  return (
    <div className="course-detail-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar coursePage />
      <main id="main-content">
        <section className="course-detail-hero" aria-labelledby="course-title">
          <div className="page-container">
            <nav className="course-breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#classes">Classes</a><span aria-hidden="true">/</span><span aria-current="page">{course.title}</span>
            </nav>
            <div className="course-hero-grid">
              <div className="course-hero-copy">
                <p className="eyebrow eyebrow-purple">{course.category}</p>
                <h1 id="course-title">{course.title}<span className="purple-period">.</span></h1>
                <p className="course-hero-description">
                  Explore the course outline and review the topics listed in the supplied SkillSparx syllabus.
                </p>
                <div className="course-hero-facts" aria-label="Course outline details">
                  <span><BookOpenText size={17} aria-hidden="true" /><strong>{course.modules.length}</strong> curriculum sections</span>
                  {scheduledSections > 0 && <span><CalendarClock size={17} aria-hidden="true" />Class timing appears in the syllabus</span>}
                </div>
                <div className="course-hero-actions">
                  <WhatsAppLink className="button button-primary" type="enrollment" courseName={course.title}>Enroll now <ArrowUpRight size={17} aria-hidden="true" /></WhatsAppLink>
                  <a className="button button-outline-light" href="#curriculum">View curriculum <ArrowRight size={17} aria-hidden="true" /></a>
                </div>
              </div>
              <div className="course-hero-art-wrap">
                <CourseArtwork course={course} priority />
                <span className="course-art-caption">SKILLSPARX / {String(courses.indexOf(course) + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="course-overview-section" aria-labelledby="course-overview-title">
          <div className="page-container course-overview-grid">
            <div>
              <p className="eyebrow eyebrow-purple">COURSE OVERVIEW</p>
              <h2 id="course-overview-title">Built around the syllabus.</h2>
            </div>
            <div className="course-overview-copy">
              <p>This {course.title} outline contains {course.modules.length} curriculum sections and {listedTopics} listed topic{listedTopics === 1 ? "" : "s"}. The curriculum below follows the supplied source file.</p>
              {syllabusHighlights.length > 0 && (
                <div className="course-highlights" aria-label="Selected section titles from the syllabus">
                  {syllabusHighlights.map((module, index) => <span key={`${module.title}-${index}`}>{module.title}</span>)}
                </div>
              )}
              <p>Duration, prerequisites, difficulty, and mentor details appear only when the supplied outline provides them.</p>
            </div>
          </div>
        </section>

        <section className="course-curriculum-section" id="curriculum" aria-labelledby="curriculum-title">
          <div className="page-container">
            <div className="course-section-heading">
              <div>
                <p className="eyebrow eyebrow-purple">THE COURSE OUTLINE</p>
                <h2 id="curriculum-title">Curriculum<span className="purple-period">.</span></h2>
              </div>
              <p>{course.modules.length} sections from the supplied syllabus</p>
            </div>
            {course.sourceNote && <p className="course-source-note"><strong>Source note:</strong> {course.sourceNote}</p>}
            <CourseCurriculum course={course} />
          </div>
        </section>

        <section className="course-enrollment-section" aria-labelledby="course-enrollment-title">
          <div className="page-container course-enrollment-content">
            <div>
              <p className="eyebrow eyebrow-purple">READY TO TAKE THE NEXT STEP?</p>
              <h2 id="course-enrollment-title">Ask us about {course.title}<span className="purple-period">.</span></h2>
              <p>Contact SkillSparx Technology for enrollment details.</p>
            </div>
            <WhatsAppLink className="button button-primary" type="course-enquiry" courseName={course.title}>Enquire on WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></WhatsAppLink>
          </div>
        </section>
      </main>
      <div className="course-mobile-enroll" aria-label={`Enroll in ${course.title}`}>
        <span className="course-mobile-enroll-label"><span>Course enrollment</span><strong>{course.title}</strong></span>
        <WhatsAppLink className="button button-primary" type="enrollment" courseName={course.title}>Enroll now <ArrowUpRight size={16} aria-hidden="true" /></WhatsAppLink>
      </div>
      <footer className="course-detail-footer">
        <div className="page-container">
          <span>SkillSparx Technology</span>
          <a href="/#classes"><ArrowLeft size={15} aria-hidden="true" /> Browse all classes</a>
        </div>
      </footer>
    </div>
  );
}
