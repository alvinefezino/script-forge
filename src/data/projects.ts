export type ProjectStep = {
  id: string;
  title: string;
  duration: string;
  concept: string;
  explain: string;
  terminal?: string;
  code?: string;
  lang?: string;
  tip?: string;
  checklist?: string[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  stack: string[];
  steps: ProjectStep[];
};

export const projects: Project[] = [
  {
    id: "p1",
    slug: "portfolio",
    title: "Personal Portfolio",
    blurb: "Build and ship your portfolio. Learn App Router, layouts, linking, and deploying to Vercel.",
    level: "Beginner",
    duration: "55 min",
    stack: ["Next.js", "App Router", "Tailwind"],
    steps: [
      {
        id: "p1s1",
        title: "Install Node and create the app",
        duration: "6 min",
        concept: "Prerequisites and scaffolding",
        explain: "Next.js needs Node 18.18 or newer. npx create-next-app scaffolds a working project with routing, bundling, and TypeScript ready. You do not configure webpack yourself.",
        terminal: "node -v\n# need 18.18 or newer\n\nnpx create-next-app@latest my-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias \"@/*\"\n\ncd my-portfolio\nnpm run dev\n# open http://localhost:3000",
        tip: "Use --src-dir to keep app code in src/. Remove --tailwind if you want plain CSS.",
        checklist: ["Node version checked", "App created without errors", "Dev server shows Welcome page"],
      },
      {
        id: "p1s2",
        title: "How App Router works",
        duration: "8 min",
        concept: "File based routing and layouts",
        explain: "Every folder under app is a route. page.tsx makes it visitable. layout.tsx wraps all children. No route config file needed. This is file based routing.",
        code: "src/app/layout.tsx  -> wraps every route (html, body, nav)\nsrc/app/page.tsx     -> /\nsrc/app/about/page.tsx -> /about\nsrc/app/work/page.tsx  -> /work\nsrc/app/work/[id]/page.tsx -> /work/123 (dynamic)",
        lang: "text",
        checklist: ["Can explain what page.tsx does", "Knows layout.tsx persists across routes"],
      },
      {
        id: "p1s3",
        title: "Build the layout and navigation",
        duration: "10 min",
        concept: "Server components by default",
        explain: "Components in app are Server Components by default. They render on the server, send HTML, no client JS until needed. Add \"use client\" only when you need state or events.",
        code: "// src/app/layout.tsx\nimport Link from \"next/link\";\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\"><body>\n      <nav>\n        <Link href=\"/\">Home</Link>\n        <Link href=\"/about\">About</Link>\n        <Link href=\"/work\">Work</Link>\n      </nav>\n      {children}\n    </body></html>\n  );\n}",
        lang: "tsx",
        tip: "Link prefetches in the background. Use a for external links.",
      },
      {
        id: "p1s4",
        title: "Create pages with file routing",
        duration: "9 min",
        concept: "Every page is a file",
        explain: "To add /about, create src/app/about/page.tsx and export a default component. That is the whole route. Add a loading.tsx in the same folder for a skeleton while data loads.",
        code: "// src/app/about/page.tsx\nexport default function About() {\n  return (\n    <main className=\"mx-auto max-w-[720px] px-6 py-12\">\n      <h1 className=\"text-3xl font-semibold\">About</h1>\n      <p className=\"mt-3 text-[15px] leading-6 text-zinc-600\">I build fast, mobile first products.</p>\n    </main>\n  );\n}",
        lang: "tsx",
      },
      {
        id: "p1s5",
        title: "Style with Tailwind and understand dependencies",
        duration: "10 min",
        concept: "What each package does",
        explain: "Tailwind is configured in globals.css with @import \"tailwindcss\". The packages you installed each have a job. See the dependencies table below.",
        code: "npm install  -> reads package.json and installs node_modules\nnpm run dev  -> starts Turbopack dev server\nnpm run build -> compiles, type checks, generates static pages\nnpm run lint  -> runs ESLint rules",
        lang: "bash",
        tip: "Remove a dependency with npm uninstall <name>. Add one with npm install <name>.",
      },
      {
        id: "p1s6",
        title: "Deploy to Vercel",
        duration: "6 min",
        concept: "Zero config deploy",
        explain: "Push to GitHub, import in Vercel, deploy. Next.js is built by Vercel so no extra config is needed. Every git push auto deploys.",
        terminal: "git init\ngit add .\ngit commit -m \"feat: portfolio v1\"\ngit remote add origin https://github.com/you/my-portfolio.git\ngit push -u origin main\n\n# then on vercel.com: New Project -> Import my-portfolio -> Deploy",
        checklist: ["Repo pushed to GitHub", "Vercel shows Ready", "Custom domain optional"],
      },
    ],
  },
  {
    id: "p2",
    slug: "blog",
    title: "Blog with Data Fetching",
    blurb: "Fetch posts, render MDX, add metadata and static generation. Learn server components and caching.",
    level: "Intermediate",
    duration: "60 min",
    stack: ["fetch", "generateStaticParams", "metadata"],
    steps: [
      {
        id: "p2s1",
        title: "How data fetching works in Next.js",
        duration: "8 min",
        concept: "Server components can be async",
        explain: "In App Router you fetch directly in the component. No useEffect needed for initial data. fetch is extended with caching controls: force-cache, no-store, and revalidate.",
        code: "// src/app/blog/page.tsx\nexport default async function Blog() {\n  const res = await fetch(\"https://api.example.com/posts\", { next: { revalidate: 60 } });\n  const posts = await res.json();\n  return <ul>{posts.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;\n}\n// revalidate 60 = regenerate at most once per minute (ISR)",
        lang: "tsx",
        tip: "Use no-store for always fresh data, force-cache for never refetch in that render.",
      },
      {
        id: "p2s2",
        title: "Dynamic routes for each post",
        duration: "9 min",
        concept: "[slug] folders",
        explain: "Create src/app/blog/[slug]/page.tsx. Next.js passes params.slug. One file handles every post. Add a notFound() call for missing slugs.",
        code: "// src/app/blog/[slug]/page.tsx\nimport { notFound } from \"next/navigation\";\nexport default async function Post({ params }: { params: { slug: string } }) {\n  const post = await getPost(params.slug);\n  if (!post) notFound();\n  return <article><h1>{post.title}</h1><p>{post.body}</p></article>;\n}",
        lang: "tsx",
      },
      {
        id: "p2s3",
        title: "Pre-render all posts at build time",
        duration: "7 min",
        concept: "generateStaticParams",
        explain: "Export generateStaticParams to tell Next.js which slugs to build as static HTML. Great for speed and SEO. Fallback is dynamic if a new slug appears after build.",
        code: "export async function generateStaticParams() {\n  const posts = await getAllPosts();\n  return posts.map((p) => ({ slug: p.slug }));\n}\nexport const dynamicParams = true; // allow new slugs on demand",
        lang: "ts",
      },
      {
        id: "p2s4",
        title: "Metadata and SEO per post",
        duration: "7 min",
        concept: "generateMetadata",
        explain: "Export generateMetadata to set title and description per route. Next.js injects it into head automatically.",
        code: "export async function generateMetadata({ params }: { params: { slug: string } }) {\n  const post = await getPost(params.slug);\n  return { title: post.title, description: post.excerpt };\n}",
        lang: "ts",
      },
      {
        id: "p2s5",
        title: "Loading and error states",
        duration: "8 min",
        concept: "loading.tsx and error.tsx",
        explain: "Add loading.tsx for the skeleton shown during navigation and error.tsx for the boundary. They are file conventions, no wiring needed.",
        code: "// src/app/blog/loading.tsx\nexport default function Loading() {\n  return <div className=\"animate-pulse h-32 rounded-xl bg-zinc-100\" />;\n}\n// src/app/blog/error.tsx\n\"use client\";\nexport default function Error({ error, reset }: any) {\n  return <div><p>Failed: {error.message}</p><button onClick={reset}>Retry</button></div>;\n}",
        lang: "tsx",
      },
    ],
  },
  {
    id: "p3",
    slug: "storefront",
    title: "Mini Storefront",
    blurb: "Product grid, cart with server actions, image optimization, and route handlers. The most complete Next.js project.",
    level: "Advanced",
    duration: "75 min",
    stack: ["Server Actions", "Route Handlers", "next/image"],
    steps: [
      {
        id: "p3s1",
        title: "Project setup and image optimization",
        duration: "8 min",
        concept: "next/image and next/font",
        explain: "next/image optimizes images on demand and prevents layout shift. next/font self hosts fonts with zero layout shift. Both are built in, no install needed.",
        code: "import Image from \"next/image\";\nimport { Geist } from \"next/font/google\";\nconst geist = Geist({ subsets: [\"latin\"] });\n\n<Image src=\"/shoe.jpg\" alt=\"Shoe\" width={600} height={600} priority />",
        lang: "tsx",
        tip: "Use priority only for above the fold images.",
      },
      {
        id: "p3s2",
        title: "Product listing and filtering with searchParams",
        duration: "10 min",
        concept: "URL as state",
        explain: "Read searchParams in a Server Component to filter. Updating the URL triggers a server render. No client state needed for the list.",
        code: "export default async function Shop({ searchParams }: { searchParams: { q?: string } }) {\n  const q = searchParams.q ?? \"\";\n  const products = await getProducts(q);\n  return <Grid products={products} />;\n}",
        lang: "tsx",
      },
      {
        id: "p3s3",
        title: "Route handlers for an API",
        duration: "9 min",
        concept: "src/app/api/*/route.ts",
        explain: "Create src/app/api/cart/route.ts and export GET or POST functions. They run on the server. Great for webhooks or external clients.",
        code: "// src/app/api/cart/route.ts\nimport { NextResponse } from \"next/server\";\nexport async function POST(req: Request) {\n  const body = await req.json();\n  await saveCart(body);\n  return NextResponse.json({ ok: true });\n}",
        lang: "ts",
      },
      {
        id: "p3s4",
        title: "Server Actions for the cart",
        duration: "12 min",
        concept: "Mutations without an API route",
        explain: "Add \"use server\" to a function and call it from a form. Next.js handles the POST, validation, and revalidation. No fetch boilerplate.",
        code: "// actions.ts\n\"use server\";\nimport { revalidatePath } from \"next/cache\";\nexport async function addToCart(formData: FormData) {\n  const id = String(formData.get(\"id\"));\n  await db.cart.add(id);\n  revalidatePath(\"/cart\");\n}\n// in component\n<form action={addToCart}><input type=\"hidden\" name=\"id\" value={product.id} /><button>Add to cart</button></form>",
        lang: "tsx",
      },
      {
        id: "p3s5",
        title: "Caching and revalidation",
        duration: "8 min",
        concept: "next/cache",
        explain: "Use revalidatePath and revalidateTag to update cached data after a mutation. Unstable_cache can cache any function, not just fetch.",
        code: "import { revalidateTag } from \"next/cache\";\n// after updating products\nrevalidateTag(\"products\");\n// fetch with tag\nfetch(url, { next: { tags: [\"products\"] } })",
        lang: "ts",
      },
      {
        id: "p3s6",
        title: "Build, measure, ship",
        duration: "7 min",
        concept: "next build and bundle analysis",
        explain: "npm run build shows route types: static or dynamic. Add @next/bundle-analyzer to see what makes your JS heavy.",
        terminal: "npm run build\n# Route (app)\n# - Portfolio /           static\n# - Shop /shop           static\n# - Product /shop/[id]   dynamic\n\nnpm install -D @next/bundle-analyzer\nANALYZE=true npm run build",
        checklist: ["Build shows no type errors", "Bundle size under 200kB first load", "Deployed to Vercel"],
      },
    ],
  },
];

export const dependenciesExplained = [
  { name: "next", why: "The framework. Routing, rendering, bundling, and optimization.", when: "Always, created by create-next-app." },
  { name: "react / react-dom", why: "UI library. Next.js renders React components on server and client.", when: "Always, Next.js depends on it." },
  { name: "typescript", why: "Type checking. Catches bugs before runtime and powers autocomplete.", when: "When you pass --typescript. Recommended for every project." },
  { name: "tailwindcss", why: "Utility CSS. Styles without leaving JSX and with tiny CSS output.", when: "When you pass --tailwind. Remove if you prefer CSS modules." },
  { name: "eslint (+ eslint-config-next)", why: "Lint rules tuned for Next.js and React. Flags bad patterns and a11y issues.", when: "When you pass --eslint. Run with npm run lint." },
  { name: "@types/*", why: "Type definitions for packages that are not written in TypeScript.", when: "Auto installed with TypeScript. Example @types/node, @types/react." },
  { name: "sharp", why: "Image optimization in production. Next.js uses it to resize next/image.", when: "Auto installed on Vercel. Add locally with npm install sharp if images are slow." },
];

export const howNextWorks = [
  { title: "App Router", desc: "Folders define routes. page.tsx is the UI, layout.tsx is the wrapper, loading.tsx is the skeleton, error.tsx is the boundary. No router config." },
  { title: "Server then Client", desc: "Components are Server Components by default. They fetch on the server and send HTML. Add \"use client\" only for state, effects, or browser APIs." },
  { title: "Rendering choices", desc: "Static: built once. Dynamic: built per request. ISR: static with revalidate. Pick per route with fetch cache, generateStaticParams, or export const dynamic." },
  { title: "Turbopack and bundling", desc: "Dev server uses Turbopack for fast HMR. Build outputs optimized chunks, code splits by route, and inlines critical CSS." },
];