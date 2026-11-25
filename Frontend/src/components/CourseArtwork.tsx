import { useEffect, useState } from "react";
import {
  Atom,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Dna,
  DraftingCompass,
  PenTool,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Course } from "../data/courses";
import artworkMetadata from "../data/course-artwork.json";

type ArtworkInfo = { src: string; alt: string };
const artworkByCourse = artworkMetadata as Record<string, ArtworkInfo>;

const categoryIcons: Record<string, LucideIcon> = {
  Technology: Code2,
  Engineering: Cpu,
  Business: BriefcaseBusiness,
  "Health & Science": Dna,
  Design: PenTool,
  Management: Workflow,
};

export default function CourseArtwork({ course, compact = false, priority = false }: { course: Course; compact?: boolean; priority?: boolean }) {
  const Icon = categoryIcons[course.category] ?? Atom;
  const artwork = artworkByCourse[course.slug];
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [artwork?.src]);

  return (
    <div className={`course-artwork ${compact ? "course-artwork-compact" : ""} ${imageFailed ? "course-artwork-failed" : ""}`}>
      {!imageFailed && artwork && (
        <img
          className="course-artwork-image"
          src={artwork.src}
          alt={compact ? "" : artwork.alt}
          width="1200"
          height="800"
          loading={compact && !priority ? "lazy" : "eager"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          sizes={compact ? "(max-width: 600px) 90vw, (max-width: 900px) 44vw, 30vw" : "(max-width: 900px) 100vw, 48vw"}
          onError={() => setImageFailed(true)}
        />
      )}
      <span className="course-artwork-shade" aria-hidden="true" />
      <span className="course-artwork-fallback" aria-hidden="true">
        <span className="course-artwork-grid" />
        <Icon className="course-artwork-icon" strokeWidth={1.15} />
        <DraftingCompass className="course-artwork-detail" strokeWidth={1} />
      </span>
    </div>
  );
}
