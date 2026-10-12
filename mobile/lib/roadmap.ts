export type RoadmapPhase = {
  n: string;
  title: string;
  subtitle: string;
  minutes: number;
  lessons: string[];
  skills: string[];
  deliverable: string;
  href: string;
  cta: string;
};

export type CareerPath = {
  role: string;
  tagline: string;
  focus: string[];
  projects: string[];
  nextSteps: string[];
  level: string;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    n: "01",
    title: "JavaScript Foundations",
    subtitle: "Variables, types, operators — how JS thinks.",
    minutes: 42,
    lessons: ["Variables and declarations", "Types and values", "Operators and expressions"],
    skills: ["let / const", "Primitives", "Coercion rules"],
    deliverable: "Run your first programs in the playground.",
    href: "/modules/js-foundations",
    cta: "Start phase 01",
  },
  {
    n: "02",
    title: "Control and Functions",
    subtitle: "Branch, loop, and bottle logic into functions.",
    minutes: 48,
    lessons: ["Control flow", "Functions every way", "Scope and closures", "Higher order functions"],
    skills: ["if / loops", "Arrow functions", "Closures"],
    deliverable: "Write reusable functions that pass logic around.",
    href: "/modules/js-control",
    cta: "Explore control flow",
  },
  {
    n: "03",
    title: "Objects and Data",
    subtitle: "Model real things with objects, arrays, maps.",
    minutes: 44,
    lessons: ["Objects in practice", "Arrays", "Sets and Maps"],
    skills: ["Destructuring", "Array methods", "Map / Set"],
    deliverable: "Transform lists of data without mutating the world.",
    href: "/modules/js-objects",
    cta: "Work with data",
  },
  {
    n: "04",
    title: "Classes and Prototypes",
    subtitle: "How JS shares behavior, classes vs prototypes, errors.",
    minutes: 36,
    lessons: ["Classes", "Prototypes explained", "Errors and debugging"],
    skills: ["class syntax", "prototype chain", "try / catch"],
    deliverable: "Debug with confidence and model entities cleanly.",
    href: "/modules/js-classes",
    cta: "Master prototypes",
  },
  {
    n: "05",
    title: "Async JavaScript",
    subtitle: "Promises and async/await — the non-blocking world.",
    minutes: 38,
    lessons: ["Async foundations", "Promises", "Async and await"],
    skills: ["Promises", "async / await", "Error handling"],
    deliverable: "Fetch data without freezing the UI.",
    href: "/modules/js-async",
    cta: "Go async",
  },
  {
    n: "06",
    title: "TypeScript Essentials",
    subtitle: "Add types and stop bugs before they ship.",
    minutes: 52,
    lessons: ["Why TypeScript", "Basic types", "Interfaces and types", "Narrowing and guards"],
    skills: ["Types", "Interfaces", "Narrowing"],
    deliverable: "Make JS safer with autocomplete that means something.",
    href: "/modules/ts-essentials",
    cta: "Add types",
  },
  {
    n: "07",
    title: "TypeScript Deep",
    subtitle: "Generics, utility types, and the toolchain.",
    minutes: 46,
    lessons: ["Generics", "Utility types", "Tooling and config"],
    skills: ["Generics", "Utility types", "tsconfig"],
    deliverable: "Write libraries that scale with your team.",
    href: "/modules/ts-deep",
    cta: "Go deep",
  },
  {
    n: "08",
    title: "Ship Real Projects",
    subtitle: "Next.js setup, App Router, and three full builds.",
    minutes: 190,
    lessons: ["tsconfig in depth", "Classes and access — TS style", "How Next.js works", "How to download Next.js", "Dependencies explained", "Portfolio — 6 steps", "Blog — 5 steps", "Storefront — 6 steps"],
    skills: ["Next.js App Router", "Data fetching", "Deploy to Vercel"],
    deliverable: "Portfolio, Blog, and Storefront live on the web.",
    href: "/projects",
    cta: "Build and ship",
  },
];

export const careerPaths: CareerPath[] = [
  {
    role: "Frontend Developer",
    tagline: "Turn designs into fast, accessible interfaces.",
    focus: ["JavaScript mastery", "React and Next.js", "Styling and a11y"],
    projects: ["Portfolio", "Blog"],
    nextSteps: ["Learn React after phase 05", "Master fetching and image optimization", "Polish portfolio for interviews"],
    level: "Entry to mid",
  },
  {
    role: "TypeScript Engineer",
    tagline: "Ship large codebases that stay correct.",
    focus: ["Advanced TS", "Tooling and testing", "API design"],
    projects: ["Blog", "Storefront"],
    nextSteps: ["Finish phases 06 and 07", "Add testing with Vitest", "Contribute types to an open source library"],
    level: "Mid",
  },
  {
    role: "Full-Stack Indie Builder",
    tagline: "Own the whole loop — build, ship, get users.",
    focus: ["Next.js full stack", "Server Actions", "Shipping fast"],
    projects: ["Portfolio", "Storefront", "Your own idea"],
    nextSteps: ["Complete storefront server actions", "Add auth and database", "Launch and charge"],
    level: "Independent",
  },
];

export const roadmapStats = {
  phases: 8,
  lessons: 27,
  minutes: 484,
  projects: 3,
};