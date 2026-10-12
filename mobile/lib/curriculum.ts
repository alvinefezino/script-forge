export type Lesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
  takeaways: string[];
  code: string;
  expectedOutput?: string;
  quiz?: { q: string; options: string[]; answer: number; explain: string }[];
};

export type Module = {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  track: "JavaScript" | "TypeScript";
  lessons: Lesson[];
};

export const curriculum: Module[] = [
  {
    id: "m1",
    slug: "js-foundations",
    title: "JavaScript Foundations",
    blurb: "Variables, types, and the mental model for how JavaScript actually runs.",
    level: "Beginner",
    track: "JavaScript",
    lessons: [
      {
        id: "m1l1",
        title: "Variables and Declarations",
        duration: "8 min",
        description: "JavaScript has three ways to create a binding. let and const replaced var for good reason. You will learn when each one makes sense and why const does not mean immutable.",
        takeaways: ["let for values that change, const as default", "var is function scoped and hoisted, avoid it", "const objects can still mutate internally"],
        code: `// let vs const vs var
let score = 0;
const player = "Ava";
const stats = { wins: 2 };
stats.wins += 1;
score += 10;
console.log(player, score, stats);`,
        expectedOutput: "Ava 10 { wins: 3 }",
        quiz: [{ q: "Which declaration should be your default?", options: ["var", "let", "const", "no declaration"], answer: 2, explain: "Use const by default, switch to let only when reassignment is needed." }],
      },
      {
        id: "m1l2",
        title: "Types and Coercion",
        duration: "10 min",
        description: "JavaScript is dynamically typed and will quietly coerce values. That is powerful and a common source of bugs. Learn the seven primitive types and how equality really works.",
        takeaways: ["7 primitives plus object", "== coerces, === does not", "typeof null is object, a historic bug"],
        code: `console.log(typeof 42);
console.log(typeof "hello");
console.log(typeof null);
console.log(typeof undefined);
console.log(0 == false);
console.log(0 === false);
console.log("" == 0);
console.log("" === 0);`,
        expectedOutput: "number\nstring\nobject\nundefined\ntrue\nfalse\ntrue\nfalse",
      },
      {
        id: "m1l3",
        title: "Operators and Expressions",
        duration: "9 min",
        description: "From arithmetic to logical operators, plus the short circuit tricks that JavaScript developers use daily.",
        takeaways: ["Short circuit: || and && return values, not booleans", "Nullish coalescing ?? vs ||", "Optional chaining ?. prevents crashes"],
        code: `const name = "";
const display = name || "Guest";
const strictDisplay = name ?? "Guest";
console.log(display);
console.log(strictDisplay);
const user = { profile: { email: "ava@mail.com" } };
console.log(user.profile?.email);
console.log(user.settings?.theme ?? "light");`,
        expectedOutput: "Guest\n\nava@mail.com\nlight",
      },
    ],
  },
  {
    id: "m2",
    slug: "js-control",
    title: "Control Flow",
    blurb: "Comparisons, conditionals, and loops. Make your program choose and repeat.",
    level: "Beginner",
    track: "JavaScript",
    lessons: [
      {
        id: "m2l1",
        title: "Comparisons and Conditionals",
        duration: "7 min",
        description: "if, else, switch, and ternaries. Learn to write conditions that read clearly even on a small screen.",
        takeaways: ["Prefer early returns over nested ifs", "Switch needs break unless you want fallthrough", "Ternary for assignment, not for side effects"],
        code: `function grade(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 50) return "C";
  return "F";
}
console.log(grade(82));
const role = "editor";
const canPublish = role === "admin" || role === "editor";
console.log(canPublish ? "allowed" : "denied");`,
        expectedOutput: "B\nallowed",
      },
      {
        id: "m2l2",
        title: "Loops Without Pain",
        duration: "11 min",
        description: "for, while, for of, and for in. Each has a job. Learn which to reach for and how to avoid infinite loops.",
        takeaways: ["for of for values, for in for keys", "while when count is unknown", "break and continue control iteration"],
        code: `const colors = ["amber", "teal", "red"];
for (const color of colors) {
  console.log(color);
}
for (let i = 0; i < 3; i++) {
  console.log("round " + i);
}
let n = 3;
while (n > 0) {
  console.log("count " + n);
  n--;
}`,
        expectedOutput: "amber\nteal\nred\nround 0\nround 1\nround 2\ncount 3\ncount 2\ncount 1",
      },
    ],
  },
  {
    id: "m3",
    slug: "js-functions",
    title: "Functions",
    blurb: "The core unit of JavaScript. Declarations, expressions, arrows, and closures.",
    level: "Beginner",
    track: "JavaScript",
    lessons: [
      {
        id: "m3l1",
        title: "Functions Every Way",
        duration: "10 min",
        description: "Function declaration vs expression vs arrow. They behave differently with this and hoisting.",
        takeaways: ["Declarations are hoisted, expressions are not", "Arrow functions have no own this", "Default parameters make APIs friendly"],
        code: `function add(a, b = 0) {
  return a + b;
}
const multiply = function(a, b) {
  return a * b;
};
const square = (n) => n * n;
console.log(add(2, 3));
console.log(multiply(3, 4));
console.log(square(5));
console.log(add(5));`,
        expectedOutput: "5\n12\n25\n5",
      },
      {
        id: "m3l2",
        title: "Scope and Closures",
        duration: "12 min",
        description: "A closure remembers the variables where it was created. This is how private state, factories, and modules work.",
        takeaways: ["Lexical scope: functions remember where they were defined", "Closures enable private counters and factories", "Block scope matters with let and const"],
        code: `function makeCounter(start = 0) {
  let count = start;
  return {
    inc() { count++; return count; },
    dec() { count--; return count; },
    value() { return count; }
  };
}
const c = makeCounter(10);
console.log(c.inc());
console.log(c.inc());
console.log(c.value());`,
        expectedOutput: "11\n12\n12",
      },
      {
        id: "m3l3",
        title: "Higher Order Functions",
        duration: "10 min",
        description: "Functions that take or return other functions. The pattern behind map, filter, and most utilities.",
        takeaways: ["Functions are values you can pass around", "Callbacks enable async and iteration helpers", "Keep higher order functions pure when possible"],
        code: `function withLogging(fn) {
  return (...args) => {
    console.log("calling with", args);
    const result = fn(...args);
    console.log("result", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(3, 4);`,
        expectedOutput: "calling with [3, 4]\nresult 7",
      },
    ],
  },
  {
    id: "m4",
    slug: "js-objects-arrays",
    title: "Objects and Arrays",
    blurb: "The two structures you will use everywhere. Master them and half of JavaScript clicks.",
    level: "Beginner",
    track: "JavaScript",
    lessons: [
      {
        id: "m4l1",
        title: "Objects in Practice",
        duration: "9 min",
        description: "Object literals, destructuring, spread, and how to safely access nested data.",
        takeaways: ["Destructuring pulls values out cleanly", "Spread copies shallow, not deep", "Optional chaining for nested safety"],
        code: `const user = { name: "Ava", role: "editor", prefs: { theme: "dark" } };
const { name, role } = user;
console.log(name, role);
const updated = { ...user, role: "admin" };
console.log(updated.role);
console.log(user.prefs?.theme);
console.log(user.settings?.lang ?? "en");`,
        expectedOutput: "Ava editor\nadmin\ndark\nen",
      },
      {
        id: "m4l2",
        title: "Arrays That Do Work",
        duration: "11 min",
        description: "map, filter, reduce, find, and the rest of the modern array toolkit.",
        takeaways: ["map transforms, filter selects, reduce aggregates", "These return new arrays, original stays intact", "Chain them for readable pipelines"],
        code: `const prices = [12, 45, 8, 33];
const taxed = prices.map(p => p * 1.1);
const affordable = prices.filter(p => p < 20);
const total = prices.reduce((sum, p) => sum + p, 0);
console.log(taxed.map(n => n.toFixed(1)));
console.log(affordable);
console.log(total);`,
        expectedOutput: "[ '13.2', '49.5', '8.8', '36.3' ]\n[ 12, 8 ]\n98",
      },
      {
        id: "m4l3",
        title: "Sets and Maps",
        duration: "7 min",
        description: "ES6 added two new collections. Set for unique values, Map for keys that can be anything.",
        takeaways: ["Set auto dedupes", "Map keys can be objects, not just strings", "Both have clear size and iteration APIs"],
        code: `const tags = new Set(["js", "ts", "js"]);
console.log([...tags]);
console.log(tags.size);
const scores = new Map([["Ava", 42], ["Ben", 37]]);
console.log(scores.get("Ava"));`,
        expectedOutput: "[ 'js', 'ts' ]\n2\n42",
      },
    ],
  },
  {
    id: "m5",
    slug: "js-classes-prototypes",
    title: "Classes and Prototypes",
    blurb: "How JavaScript does object orientation without traditional inheritance.",
    level: "Intermediate",
    track: "JavaScript",
    lessons: [
      {
        id: "m5l1",
        title: "Classes That Feel Familiar",
        duration: "10 min",
        description: "Modern class syntax is sugar over prototypes. Learn constructors, methods, getters, and private fields.",
        takeaways: ["class is prototype sugar", "# prefix creates true private fields", "Getters and setters control access"],
        code: `class Account {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(n) { this.#balance += n; return this; }
  get balance() { return this.#balance; }
}
const a = new Account("Ava");
a.deposit(50).deposit(25);
console.log(a.owner, a.balance);`,
        expectedOutput: "Ava 75",
      },
      {
        id: "m5l2",
        title: "Prototypes Explained",
        duration: "11 min",
        description: "Every object has a prototype. That chain is how JavaScript shares behavior without copying.",
        takeaways: ["Prototype chain is live, not copied", "Object.create makes a clean prototype link", "Understand this before you debug this"],
        code: `const animal = {
  speak() { return this.name + " makes a sound"; }
};
const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak());
console.log(Object.getPrototypeOf(dog) === animal);`,
        expectedOutput: "Rex makes a sound\ntrue",
      },
      {
        id: "m5l3",
        title: "Errors Done Right",
        duration: "7 min",
        description: "try, catch, finally, and how to create meaningful errors your future self will thank you for.",
        takeaways: ["Throw Error objects, not strings", "Catch what you can handle, rethrow the rest", "finally always runs"],
        code: `function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
try {
  console.log(divide(10, 2));
  console.log(divide(10, 0));
} catch (e) {
  console.log("caught: " + e.message);
} finally {
  console.log("done");
}`,
        expectedOutput: "5\ncaught: Cannot divide by zero\ndone",
      },
    ],
  },
  {
    id: "m6",
    slug: "js-async",
    title: "Async JavaScript",
    blurb: "Promises, async await, fetch, and the event loop you were told to fear.",
    level: "Intermediate",
    track: "JavaScript",
    lessons: [
      {
        id: "m6l1",
        title: "Promises",
        duration: "10 min",
        description: "A Promise is a value that will arrive later. Learn then and catch, and why you rarely need them now that async await exists.",
        takeaways: ["Pending, fulfilled, or rejected", "then returns a new promise, enabling chains", "Always handle rejections"],
        code: `function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve("ready"), ms));
}
wait(10).then(msg => console.log(msg));
Promise.all([wait(10), wait(5)]).then(() => console.log("all done"));`,
        expectedOutput: "ready\nall done",
      },
      {
        id: "m6l2",
        title: "Async and Await",
        duration: "12 min",
        description: "Async functions let you write async code that looks sync. Cleaner than chains for most cases.",
        takeaways: ["async always returns a promise", "await pauses only the current function", "Use try catch for async errors"],
        code: `async function fetchUser(id) {
  if (id === 0) throw new Error("Not found");
  return { id, name: "Ava" };
}
async function run() {
  try {
    const u = await fetchUser(1);
    console.log(u.name);
    await fetchUser(0);
  } catch (e) {
    console.log("error: " + e.message);
  }
}
run();`,
        expectedOutput: "Ava\nerror: Not found",
      },
      {
        id: "m6l3",
        title: "Event Loop and Runtimes",
        duration: "12 min",
        description: "The event loop is just a queue. Understand microtasks, macrotasks, and why setTimeout with 0 still waits.",
        takeaways: ["Call stack, queue, and microtask queue", "Promises use microtasks, setTimeout uses macrotasks", "Node and browser runtimes differ in APIs, not the loop itself"],
        code: `console.log("1");
setTimeout(() => console.log("2 - timeout"), 0);
Promise.resolve().then(() => console.log("3 - microtask"));
console.log("4");`,
        expectedOutput: "1\n4\n3 - microtask\n2 - timeout",
      },
      {
        id: "m6l4",
        title: "Modules",
        duration: "8 min",
        description: "ES Modules organize code into files. import and export, named vs default, and how they differ from CommonJS.",
        takeaways: ["Use named exports for most things", "Default export for the single main thing", "Modules are always strict mode"],
        code: `console.log("ES Modules are static — tools can tree shake them");
console.log("Named imports must match the export name exactly");
console.log("Use import for ESM, require for CommonJS legacy");`,
        expectedOutput: "ES Modules are static — tools can tree shake them\nNamed imports must match the export name exactly\nUse import for ESM, require for CommonJS legacy",
      },
    ],
  },
  {
    id: "m7",
    slug: "ts-essentials",
    title: "TypeScript Essentials",
    blurb: "Add types to JavaScript. Catch bugs before the code runs.",
    level: "Intermediate",
    track: "TypeScript",
    lessons: [
      {
        id: "m7l1",
        title: "Why TypeScript",
        duration: "7 min",
        description: "TypeScript is JavaScript with types erased at compile time. You get safety without paying at runtime.",
        takeaways: ["Types are erased, not shipped", "Strict mode catches more bugs early", "You can adopt file by file"],
        code: `let name = "Ava";
console.log(typeof name);
let score = 42;
console.log(typeof score);
console.log("In TS: let name: string = 'Ava' — type erased at build");`,
        expectedOutput: "string\nnumber\nIn TS: let name: string = 'Ava' — type erased at build",
      },
      {
        id: "m7l2",
        title: "Types, Aliases, and Unions",
        duration: "11 min",
        description: "string, number, boolean, plus type aliases and unions to model real world values.",
        takeaways: ["Use type aliases for shapes you reuse", "Unions model literal values: 'admin' | 'editor'", "Avoid any, prefer unknown and narrow it"],
        code: `const role = "editor";
function describeRole(r) {
  if (r === "admin") return "full access";
  if (r === "editor") return "can publish";
  return "read only";
}
console.log(describeRole(role));
console.log(describeRole("viewer"));`,
        expectedOutput: "can publish\nread only",
      },
      {
        id: "m7l3",
        title: "Interfaces and Objects",
        duration: "10 min",
        description: "Interfaces define object shapes and contracts. Learn when to use interface vs type.",
        takeaways: ["Interface for object contracts, type for unions and tuples", "readonly and optional properties", "Extend interfaces for composition"],
        code: `const user = { id: "1", name: "Ava" };
console.log(user.name);
console.log(user.email ?? "no email");
const admin = { ...user, permissions: ["manage"] };
console.log(admin.permissions[0]);`,
        expectedOutput: "Ava\nno email\nmanage",
      },
      {
        id: "m7l4",
        title: "Arrays, Tuples, and Enums",
        duration: "9 min",
        description: "Typed arrays, fixed length tuples, and why most teams now prefer union strings over enums.",
        takeaways: ["number[] or Array<number> for arrays", "Tuples for fixed length pairs", "Prefer unions over enums for string constants"],
        code: `const scores = [42, 37, 58];
const avg = scores.reduce((a,b) => a+b, 0) / scores.length;
console.log(avg.toFixed(1));
const entry = ["Ava", 42];
console.log(entry[0] + " scored " + entry[1]);`,
        expectedOutput: "45.7\nAva scored 42",
      },
      {
        id: "m7l5",
        title: "Type Narrowing",
        duration: "10 min",
        description: "The pattern that makes unions safe. Use typeof, in, instanceof, and discriminated unions.",
        takeaways: ["Narrowing proves to TS which branch you are in", "Discriminated unions with a literal tag", "Exhaustiveness check with never"],
        code: `function format(value) {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  return "unknown";
}
console.log(format("hello"));
console.log(format(42.5));
console.log(format(true));`,
        expectedOutput: "HELLO\n42.50\nunknown",
      },
    ],
  },
  {
    id: "m8",
    slug: "ts-advanced",
    title: "TypeScript Advanced",
    blurb: "Generics, utility types, and project setup for real codebases.",
    level: "Advanced",
    track: "TypeScript",
    lessons: [
      {
        id: "m8l1",
        title: "Generics",
        duration: "12 min",
        description: "Write functions and types that work with any type while staying type safe.",
        takeaways: ["<T> keeps the link between input and output", "Constrain with extends when you need a property", "Generic classes power Map, Promise, Array"],
        code: `function wrap(value) {
  return { value };
}
console.log(wrap("hello"));
console.log(wrap(42));
console.log(wrap({ name: "Ava" }));`,
        expectedOutput: "{ value: 'hello' }\n{ value: 42 }\n{ value: { name: 'Ava' } }",
      },
      {
        id: "m8l2",
        title: "Utility Types",
        duration: "9 min",
        description: "Partial, Pick, Omit, Required, and ReturnType. Small tools that remove a lot of duplication.",
        takeaways: ["Partial makes all props optional", "Pick and Omit select or exclude keys", "ReturnType extracts a function return type"],
        code: `const user = { id: "1", name: "Ava", email: "ava@mail.com", role: "admin" };
const publicUser = { name: user.name, role: user.role };
console.log(publicUser);
const patch = { name: "Ava R." };
console.log({ ...user, ...patch });`,
        expectedOutput: "{ name: 'Ava', role: 'admin' }\n{ id: '1', name: 'Ava R.', email: 'ava@mail.com', role: 'admin' }",
      },
      {
        id: "m8l3",
        title: "Setup for Real Projects",
        duration: "10 min",
        description: "tsconfig, strict mode, module resolution, and how to configure a project that scales.",
        takeaways: ["strict: true catches the most bugs", "ESM vs CommonJS choice lives in module and target", "Use include and exclude to keep config tidy"],
        code: `console.log("strict true enables 7 strict checks at once");
console.log("moduleResolution bundler matches Vite and Next");
console.log("noEmitOnError stops bad builds");`,
        expectedOutput: "strict true enables 7 strict checks at once\nmoduleResolution bundler matches Vite and Next\nnoEmitOnError stops bad builds",
      },
      {
        id: "m8l4",
        title: "Classes and Access in TS",
        duration: "8 min",
        description: "public, private, protected, and abstract classes. How TS adds structure on top of JS classes.",
        takeaways: ["private is compile time, # is runtime private", "protected visible to subclasses", "abstract forces subclasses to implement"],
        code: `class Repo {
  constructor(items = []) { this.items = items; }
  add(item) { this.items.push(item); }
  get count() { return this.items.length; }
}
const r = new Repo(["a"]);
r.add("b");
console.log(r.count);
console.log(r.items);`,
        expectedOutput: "2\n[ 'a', 'b' ]",
      },
    ],
  },
];

export function getLessonById(id: string) {
  for (const m of curriculum) {
    const l = m.lessons.find(x => x.id === id);
    if (l) return { mod: m, lesson: l };
  }
  return null;
}

export function nextLesson(id: string) {
  const flat: { mod: Module; lesson: Lesson }[] = [];
  for (const m of curriculum) for (const l of m.lessons) flat.push({ mod: m, lesson: l });
  const idx = flat.findIndex(x => x.lesson.id === id);
  if (idx === -1) return null;
  return { prev: flat[idx - 1] || null, next: flat[idx + 1] || null, index: idx, total: flat.length };
}
