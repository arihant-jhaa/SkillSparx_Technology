import catalog from "./courses.json";

export type CourseModule = { title: string; lessons: string[]; schedule?: string };
export type Course = {
  id: string;
  slug: string;
  title: string;
  category: string;
  sourceFile: string;
  sourceNote?: string;
  modules: CourseModule[];
};
export const courses = catalog as Course[];
export const courseCategories = [...new Set(courses.map((course) => course.category))];

export function slugForCategory(category: string): string {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function findCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
