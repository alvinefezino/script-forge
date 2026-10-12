export type Achievement = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  condition: (s: GamificationState) => boolean;
};

export type GamificationState = {
  completedIds: string[];
  completedProjects: string[];
  streak: number;
  longestStreak: number;
  xp: number;
  level: number;
  unlockedAchievements: string[];
};

export const XP_PER_LESSON = 25;
export const XP_PER_PROJECT = 120;
export const XP_STREAK_BONUS = 10;

export function levelForXp(xp: number) {
  // level 1 at 0, every 150 xp ~ next level with gentle curve
  return Math.floor(Math.sqrt(xp / 30)) + 1;
}
export function xpForNextLevel(level: number) {
  // inverse: xp needed to reach level
  return Math.pow(level - 1, 2) * 30;
}
export function xpProgress(xp: number) {
  const lvl = levelForXp(xp);
  const curXp = xpForNextLevel(lvl);
  const nextXp = xpForNextLevel(lvl + 1);
  const span = nextXp - curXp;
  const into = xp - curXp;
  return { lvl, curXp, nextXp, span, into, pct: span ? Math.round((into / span) * 100) : 100 };
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_lesson", title: "Hello World", desc: "Complete your first lesson", icon: "✦", xp: 25, condition: (s) => s.completedIds.length >= 1 },
  { id: "five_lessons", title: "On a Roll", desc: "Finish 5 lessons", icon: "⚡", xp: 50, condition: (s) => s.completedIds.length >= 5 },
  { id: "ten_lessons", title: "Dedicated", desc: "Finish 10 lessons", icon: "◆", xp: 75, condition: (s) => s.completedIds.length >= 10 },
  { id: "halfway", title: "Halfway There", desc: "50% of lessons done", icon: "◐", xp: 100, condition: (s) => s.completedIds.length >= 14 },
  { id: "all_lessons", title: "Completionist", desc: "Finish every lesson", icon: "★", xp: 200, condition: (s) => s.completedIds.length >= 27 },
  { id: "first_project", title: "Builder", desc: "Ship your first project", icon: "▣", xp: 80, condition: (s) => s.completedProjects.length >= 1 },
  { id: "all_projects", title: "Ship It", desc: "Ship all 3 projects", icon: "⬢", xp: 250, condition: (s) => s.completedProjects.length >= 3 },
  { id: "streak_3", title: "3 Day Streak", desc: "Learn 3 days in a row", icon: "flame", xp: 40, condition: (s) => s.streak >= 3 },
  { id: "streak_7", title: "Week Warrior", desc: "7 day streak", icon: "flame", xp: 100, condition: (s) => s.streak >= 7 },
  { id: "streak_14", title: "Unstoppable", desc: "14 day streak", icon: "flame", xp: 200, condition: (s) => s.streak >= 14 },
  { id: "level_5", title: "Level 5", desc: "Reach level 5", icon: "⬆", xp: 50, condition: (s) => s.level >= 5 },
  { id: "level_10", title: "Level 10", desc: "Reach level 10", icon: "⬆", xp: 100, condition: (s) => s.level >= 10 },
  { id: "night_owl", title: "Night Owl", desc: "Complete a lesson after 11pm", icon: "moon", xp: 30, condition: () => false },
  { id: "early_bird", title: "Early Bird", desc: "Complete a lesson before 7am", icon: "sun", xp: 30, condition: () => false },
];

export function newlyUnlocked(prev: string[], next: string[], state: GamificationState) {
  const before = new Set(prev);
  return ACHIEVEMENTS.filter((a) => next.includes(a.id) && !before.has(a.id) && a.condition(state));
}
