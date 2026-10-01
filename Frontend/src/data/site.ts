export type Course = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  level: string;
  duration: string;
  lessons: number;
  instructor: string;
  outcomes: string[];
};

export const courses: Course[] = [
  {
    id: "visual-identity",
    number: "01",
    category: "DESIGN / ART DIRECTION",
    title: "Visual identity, with feeling.",
    description: "Build a distinctive visual world from the first sketch to the final system.",
    image: "/images/course-identity.jpg",
    imageAlt: "Folded ivory paper, lavender acrylic, and a polished chrome sculpture",
    level: "All levels",
    duration: "5 weeks",
    lessons: 18,
    instructor: "The unfold. studio",
    outcomes: ["Find the idea behind an identity", "Create a flexible visual language", "Present a complete brand world"],
  },
  {
    id: "interface-design",
    number: "02",
    category: "DIGITAL / PRODUCT",
    title: "Interfaces that feel human.",
    description: "Design thoughtful digital experiences people want to come back to.",
    image: "/images/course-interface.jpg",
    imageAlt: "A designer arranging interface wireframes and a tablet on a worktable",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 22,
    instructor: "The unfold. studio",
    outcomes: ["Turn research into clear direction", "Build considered interface systems", "Prototype and share your thinking"],
  },
  {
    id: "creative-code",
    number: "03",
    category: "CODE / EXPERIMENTATION",
    title: "Code as a creative material.",
    description: "Make expressive work at the intersection of design and technology.",
    image: "/images/course-code.jpg",
    imageAlt: "Fine violet generative lines forming a flowing wave on a dark background",
    level: "Intermediate",
    duration: "4 weeks",
    lessons: 16,
    instructor: "The unfold. studio",
    outcomes: ["Think in creative systems", "Make interactive experiments", "Publish a piece that is yours"],
  },
  {
    id: "motion-design",
    number: "04",
    category: "MOTION / STORYTELLING",
    title: "Motion with meaning.",
    description: "Give ideas rhythm, character, and a reason to move.",
    image: "/images/course-motion.jpg",
    imageAlt: "A flowing silver ribbon sculpture against a pale lavender backdrop",
    level: "All levels",
    duration: "5 weeks",
    lessons: 20,
    instructor: "The unfold. studio",
    outcomes: ["Build a motion vocabulary", "Animate with intention", "Create a complete moving story"],
  },
];

export const features = [
  {
    number: "01",
    title: "Learn from the doers.",
    description: "Get inside the thinking of people making the work you admire.",
    label: "IN YOUR STUDIO / LESSON 01",
    previewTitle: "See how the work really happens.",
    previewDescription: "From first thought to finished form, nothing happens in a vacuum.",
    previewImage: "/images/course-interface.jpg",
    previewAlt: "Creative interface sketches and tablet on a worktable",
    progress: 28,
    progressLabel: "Learning in progress",
  },
  {
    number: "02",
    title: "Make it real.",
    description: "Every class moves toward a project that is unmistakably yours.",
    label: "IN YOUR STUDIO / PROJECT 02",
    previewTitle: "Turn an idea into something tangible.",
    previewDescription: "Your next portfolio piece starts with the first messy version.",
    previewImage: "/images/course-identity.jpg",
    previewAlt: "Sculptural design materials used in a visual identity project",
    progress: 63,
    progressLabel: "Project in progress",
  },
  {
    number: "03",
    title: "Grow together.",
    description: "Find generous feedback and fresh perspective at every step.",
    label: "IN YOUR STUDIO / COMMUNITY",
    previewTitle: "Better work is a conversation.",
    previewDescription: "Share early. Ask better questions. Keep making together.",
    previewImage: "/images/course-code.jpg",
    previewAlt: "Violet generative art created through creative coding",
    progress: 86,
    progressLabel: "Community project",
  },
];

// Concept stories should be replaced with approved customer testimonials.
export const testimonials = [
  {
    quote: "I came for a class. I left with work I couldn't wait to put into the world.",
    name: "Maya Chen",
    role: "Independent designer",
    image: "/images/portrait-maya.jpg",
    imageAlt: "Portrait of Maya in a creative studio",
  },
  {
    quote: "It feels like being in a room with people who genuinely want you to get better.",
    name: "Jordan Ellis",
    role: "Creative developer",
    image: "/images/portrait-jordan.jpg",
    imageAlt: "Portrait of Jordan in a creative studio",
  },
  {
    quote: "Experimenting isn't a detour here. It's the entire point of the journey.",
    name: "Sofia Reyes",
    role: "Art director",
    image: "/images/portrait-sofia.jpg",
    imageAlt: "Portrait of Sofia in a creative studio",
  },
];

// Illustrative mentor faces (stock photography via Pexels) and community portraits.
const px = (id: number, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&h=760&w=560`;

export type Mentor = { name: string; course: string; image: string };

export const mentors: Mentor[] = [
  { name: "Aiden K.", course: "UX Research Course", image: px(9063613) },
  { name: "Leni M.", course: "Brand Identity Course", image: px(36837816) },
  { name: "Marcus T.", course: "Creative Code Course", image: px(12311544) },
  { name: "Noah P.", course: "UX Research Course", image: px(18935832) },
  { name: "Rhea S.", course: "Motion Design Course", image: px(5785780) },
  { name: "Caleb R.", course: "Interface Design Course", image: px(6730458) },
  { name: "Priya N.", course: "Art Direction Course", image: px(22873252) },
  { name: "Theo A.", course: "UX Research Course", image: px(38165826) },
  { name: "Juno L.", course: "Visual Identity Course", image: px(33300663) },
  { name: "Dion W.", course: "Creative Code Course", image: px(9254556) },
  { name: "Sana R.", course: "Motion Design Course", image: px(10189954) },
  { name: "Elias V.", course: "UX Research Course", image: px(13457430) },
];

export const communityFaces: { image: string; alt: string }[] = [
  { image: px(5785780), alt: "Portrait of a community member with curly hair" },
  { image: px(9063613), alt: "Portrait of a community member with braided hair" },
  { image: "/images/portrait-sofia.jpg", alt: "Portrait of a community member" },
  { image: px(36837816), alt: "Portrait of a smiling community member" },
  { image: px(18935832), alt: "Portrait of a community member wearing glasses" },
  { image: px(12311544), alt: "Portrait of a community member" },
  { image: px(22873252), alt: "Portrait of a community member in a suit" },
  { image: "/images/portrait-maya.jpg", alt: "Portrait of a community member" },
  { image: px(33300663), alt: "Portrait of a community member in colour" },
  { image: px(9254556), alt: "Portrait of a community member with coloured hair" },
  { image: px(38165826), alt: "Portrait of a smiling community member" },
  { image: "/images/portrait-jordan.jpg", alt: "Portrait of a community member" },
];