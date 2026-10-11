"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ACHIEVEMENTS, XP_PER_LESSON, XP_PER_PROJECT, levelForXp, xpProgress } from "@/lib/gamification";

type Progress = Record<string, boolean>;
type ProjectProgress = Record<string, boolean>;
type Toast = { id: string; title: string; desc?: string; kind: "xp" | "achievement" | "streak"; xp?: number };

const K_DONE = "sf_progress_v1";
const K_PROJ = "sf_projects_v1";
const K_STREAK = "sf_streak_v1";
const K_XP = "sf_xp_v1";
const K_ACH = "sf_ach_v1";
const K_LAST = "sf_last_active_v1";

type CtxT = {
  done: Progress;
  projectsDone: ProjectProgress;
  toggle: (id: string) => void;
  toggleProject: (id: string) => void;
  completedCount: number;
  completedProjectsCount: number;
  xp: number;
  level: number;
  xpInfo: ReturnType<typeof xpProgress>;
  streak: number;
  longestStreak: number;
  achievements: string[];
  toasts: Toast[];
  dismissToast: (id:string)=>void;
  recentUnlocks: { id:string; title:string; desc:string; icon:string; xp:number }[];
  clearRecentUnlocks: ()=>void;
  isComplete: boolean;
  bumpStreak: ()=>void;
};

const Ctx = createContext<CtxT>({
  done:{}, projectsDone:{}, toggle:()=>{}, toggleProject:()=>{}, completedCount:0, completedProjectsCount:0,
  xp:0, level:1, xpInfo: xpProgress(0), streak:0, longestStreak:0, achievements:[], toasts:[], dismissToast:()=>{}, recentUnlocks:[], clearRecentUnlocks:()=>{}, isComplete:false, bumpStreak:()=>{},
});

function todayKey(){ return new Date().toISOString().slice(0,10); }
function yesterdayKey(){ const d=new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }

export function ProgressProvider({ children }: { children: React.ReactNode }){
  const [done,setDone]=useState<Progress>({});
  const [projectsDone,setProjectsDone]=useState<ProjectProgress>({});
  const [xp,setXp]=useState(0);
  const [streak,setStreak]=useState(0);
  const [longest,setLongest]=useState(0);
  const [achievements,setAchievements]=useState<string[]>([]);
  const [toasts,setToasts]=useState<Toast[]>([]);
  const [recent,setRecent]=useState<{id:string;title:string;desc:string;icon:string;xp:number}[]>([]);
  const [hydrated,setHydrated]=useState(false);

  useEffect(()=>{
    try{
      const a=localStorage.getItem(K_DONE); if(a) setDone(JSON.parse(a));
      const b=localStorage.getItem(K_PROJ); if(b) setProjectsDone(JSON.parse(b));
      const c=localStorage.getItem(K_XP); if(c) setXp(JSON.parse(c));
      const d=localStorage.getItem(K_STREAK); if(d){ const o=JSON.parse(d); setStreak(o.streak||0); setLongest(o.longest||0); }
      const e=localStorage.getItem(K_ACH); if(e) setAchievements(JSON.parse(e));
    }catch{}
    setHydrated(true);
    try{
      const last=localStorage.getItem(K_LAST);
      const today=todayKey();
      if(last!==today){
        const y=yesterdayKey();
        let cur=0; let lng=0;
        try{ const o=JSON.parse(localStorage.getItem(K_STREAK)||"{}"); cur=o.streak||0; lng=o.longest||0; }catch{}
        if(last===y) cur+=1; else if(!last) cur=1; else cur=1;
        lng=Math.max(lng,cur);
        localStorage.setItem(K_STREAK, JSON.stringify({streak:cur,longest:lng}));
        localStorage.setItem(K_LAST, today);
        setStreak(cur); setLongest(lng);
        if(cur>=2){
          const id="streak-"+Date.now();
          setToasts(t=>[...t,{id, title: cur>=7 ? "Week Warrior!" : cur>=3 ? "Streak alive!" : "Streak started!", desc: cur+" day"+(cur>1?"s":"")+" in a row", kind:"streak"}]);
          setTimeout(()=> setToasts(t=> t.filter(x=>x.id!==id)), 3800);
        }
      }
    }catch{}
  },[]);

  useEffect(()=>{ if(hydrated) try{ localStorage.setItem(K_DONE, JSON.stringify(done)); }catch{} },[done,hydrated]);
  useEffect(()=>{ if(hydrated) try{ localStorage.setItem(K_PROJ, JSON.stringify(projectsDone)); }catch{} },[projectsDone,hydrated]);
  useEffect(()=>{ if(hydrated) try{ localStorage.setItem(K_XP, JSON.stringify(xp)); }catch{} },[xp,hydrated]);
  useEffect(()=>{ if(hydrated) try{ localStorage.setItem(K_ACH, JSON.stringify(achievements)); }catch{} },[achievements,hydrated]);
  useEffect(()=>{ if(hydrated) try{ localStorage.setItem(K_STREAK, JSON.stringify({streak,longest})); }catch{} },[streak,longest,hydrated]);

  const pushToast=useCallback((t:Toast)=>{
    setToasts(p=>[...p,t]);
    setTimeout(()=> setToasts(p=> p.filter(x=>x.id!==t.id)), 3600);
  },[]);

  const bumpStreak=useCallback(()=>{
    const today=todayKey();
    const last=typeof window!=="undefined" ? localStorage.getItem(K_LAST) : null;
    if(last===today) return;
    const y=yesterdayKey();
    let cur=streak;
    if(last===y) cur=streak+1; else cur=1;
    const lng=Math.max(longest,cur);
    setStreak(cur); setLongest(lng);
    try{ localStorage.setItem(K_LAST,today); localStorage.setItem(K_STREAK, JSON.stringify({streak:cur,longest:lng})); }catch{}
  },[streak,longest]);

  const toggle=useCallback((id:string)=>{
    setDone(prev=>{
      const was=!!prev[id];
      const next={...prev,[id]:!was};
      if(!was){
        const bonus = streak>=3 ? 10 : 0;
        const inc = XP_PER_LESSON + bonus;
        const newXp = xp + inc;
        setXp(newXp);
        pushToast({id:"lesson-"+id+"-"+Date.now(), title:"+"+inc+" XP", desc:"Lesson completed", kind:"xp", xp:inc});
        bumpStreak();
        setTimeout(()=>{
          const ids=Object.keys(next).filter(k=>next[k]);
          const pids=Object.keys(projectsDone).filter(k=>projectsDone[k]);
          const lvl=levelForXp(newXp);
          const s={completedIds:ids, completedProjects:pids, streak, longestStreak:longest, xp:newXp, level:lvl, unlockedAchievements:achievements} as any;
          const newly:string[]=[];
          for(const a of ACHIEVEMENTS) if(!achievements.includes(a.id) && a.condition(s)) newly.push(a.id);
          if(newly.length){
            setAchievements(p=>[...p,...newly]);
            const unlocks=ACHIEVEMENTS.filter(a=>newly.includes(a.id));
            const b=unlocks.reduce((sum,a)=>sum+a.xp,0);
            if(b) setXp(p=>p+b);
            setRecent(p=>[...p,...unlocks.map(u=>({id:u.id,title:u.title,desc:u.desc,icon:u.icon,xp:u.xp}))]);
            for(const u of unlocks) pushToast({id:"ach-"+u.id+"-"+Date.now(), title:u.title, desc:u.desc, kind:"achievement", xp:u.xp});
            if(b) pushToast({id:"bonus-"+Date.now(), title:"+"+b+" XP bonus", kind:"xp"});
          }
        },0);
      } else {
        setXp(p=> Math.max(0, p - XP_PER_LESSON));
      }
      return next;
    });
  },[xp,streak,bumpStreak,pushToast,achievements,projectsDone,longest]);

  const toggleProject=useCallback((id:string)=>{
    setProjectsDone(prev=>{
      const was=!!prev[id];
      const next={...prev,[id]:!was};
      if(!was){
        const newXp=xp+XP_PER_PROJECT;
        setXp(newXp);
        pushToast({id:"proj-"+id+"-"+Date.now(), title:"+"+XP_PER_PROJECT+" XP", desc:"Project shipped", kind:"xp"});
        bumpStreak();
        setTimeout(()=>{
          const ids=Object.keys(done).filter(k=>done[k]);
          const pids=Object.keys(next).filter(k=>next[k]);
          const lvl=levelForXp(newXp);
          const s={completedIds:ids, completedProjects:pids, streak, longestStreak:longest, xp:newXp, level:lvl, unlockedAchievements:achievements} as any;
          const newly:string[]=[];
          for(const a of ACHIEVEMENTS) if(!achievements.includes(a.id) && a.condition(s)) newly.push(a.id);
          if(newly.length){
            setAchievements(p=>[...p,...newly]);
            const unlocks=ACHIEVEMENTS.filter(a=>newly.includes(a.id));
            const b=unlocks.reduce((sum,a)=>sum+a.xp,0);
            if(b) setXp(p=>p+b);
            setRecent(p=>[...p,...unlocks.map(u=>({id:u.id,title:u.title,desc:u.desc,icon:u.icon,xp:u.xp}))]);
            for(const u of unlocks) pushToast({id:"ach-"+u.id+"-"+Date.now(), title:u.title, desc:u.desc, kind:"achievement"});
          }
        },0);
      } else setXp(p=> Math.max(0,p-XP_PER_PROJECT));
      return next;
    });
  },[xp,done,streak,longest,achievements,pushToast,bumpStreak]);

  const completedCount=Object.values(done).filter(Boolean).length;
  const completedProjectsCount=Object.values(projectsDone).filter(Boolean).length;
  const level=levelForXp(xp);
  const xpInfo=xpProgress(xp);
  const isComplete = completedCount>=27 && completedProjectsCount>=3;

  return (
    <Ctx.Provider value={{done,projectsDone,toggle,toggleProject,completedCount,completedProjectsCount,xp,level,xpInfo,streak,longestStreak:longest,achievements,toasts,dismissToast:(id)=>setToasts(t=>t.filter(x=>x.id!==id)),recentUnlocks:recent,clearRecentUnlocks:()=>setRecent([]),isComplete,bumpStreak}}>
      {children}
    </Ctx.Provider>
  );
}
export function useProgress(){ return useContext(Ctx); }
