import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACHIEVEMENTS, XP_PER_LESSON, XP_PER_PROJECT, levelForXp, xpProgress } from "./gamification";

type Progress = Record<string, boolean>;
type ProjectProgress = Record<string, boolean>;
type Toast = { id: string; title: string; desc?: string; kind: "xp"|"achievement"|"streak"; xp?: number };

const K_DONE="sf_progress_v1", K_PROJ="sf_projects_v1", K_STREAK="sf_streak_v1", K_XP="sf_xp_v1", K_ACH="sf_ach_v1", K_LAST="sf_last_active_v1";
function todayKey(){ return new Date().toISOString().slice(0,10); }
function yesterdayKey(){ const d=new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }

type CtxT={
  done: Progress; projectsDone: ProjectProgress;
  toggle:(id:string)=>void; toggleProject:(id:string)=>void;
  completedCount:number; completedProjectsCount:number;
  xp:number; level:number; xpInfo: ReturnType<typeof xpProgress>;
  streak:number; longestStreak:number;
  achievements:string[]; toasts: Toast[]; dismissToast:(id:string)=>void;
  recentUnlocks:{id:string;title:string;desc:string;icon:string;xp:number}[]; clearRecentUnlocks:()=>void;
  isComplete:boolean; hydrated:boolean;
};
const Ctx=createContext<CtxT>({
  done:{},projectsDone:{},toggle:()=>{},toggleProject:()=>{},completedCount:0,completedProjectsCount:0,
  xp:0,level:1,xpInfo:xpProgress(0),streak:0,longestStreak:0,achievements:[],toasts:[],dismissToast:()=>{},recentUnlocks:[],clearRecentUnlocks:()=>{},isComplete:false,hydrated:false,
});

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
    (async()=>{
      try{
        const a=await AsyncStorage.getItem(K_DONE); if(a) setDone(JSON.parse(a));
        const b=await AsyncStorage.getItem(K_PROJ); if(b) setProjectsDone(JSON.parse(b));
        const c=await AsyncStorage.getItem(K_XP); if(c) setXp(JSON.parse(c));
        const d=await AsyncStorage.getItem(K_STREAK); if(d){ const o=JSON.parse(d); setStreak(o.streak||0); setLongest(o.longest||0); }
        const e=await AsyncStorage.getItem(K_ACH); if(e) setAchievements(JSON.parse(e));
      }catch{}
      setHydrated(true);
      try{
        const last=await AsyncStorage.getItem(K_LAST);
        const today=todayKey();
        if(last!==today){
          const y=yesterdayKey();
          let cur=0; let lng=0;
          try{ const o=JSON.parse((await AsyncStorage.getItem(K_STREAK))||"{}"); cur=o.streak||0; lng=o.longest||0; }catch{}
          if(last===y) cur+=1; else if(!last) cur=1; else cur=1;
          lng=Math.max(lng,cur);
          await AsyncStorage.setItem(K_STREAK, JSON.stringify({streak:cur,longest:lng}));
          await AsyncStorage.setItem(K_LAST, today);
          setStreak(cur); setLongest(lng);
          if(cur>=2){
            const id="streak-"+Date.now();
            setToasts(t=>[...t,{id, title: cur>=7?"Week Warrior!":cur>=3?"Streak alive!":"Streak started!", desc: cur+" day"+(cur>1?"s":"")+" in a row", kind:"streak"}]);
            setTimeout(()=> setToasts(t=>t.filter(x=>x.id!==id)), 3800);
          }
        }
      }catch{}
    })();
  },[]);

  useEffect(()=>{ if(hydrated) AsyncStorage.setItem(K_DONE, JSON.stringify(done)).catch(()=>{}); },[done,hydrated]);
  useEffect(()=>{ if(hydrated) AsyncStorage.setItem(K_PROJ, JSON.stringify(projectsDone)).catch(()=>{}); },[projectsDone,hydrated]);
  useEffect(()=>{ if(hydrated) AsyncStorage.setItem(K_XP, JSON.stringify(xp)).catch(()=>{}); },[xp,hydrated]);
  useEffect(()=>{ if(hydrated) AsyncStorage.setItem(K_ACH, JSON.stringify(achievements)).catch(()=>{}); },[achievements,hydrated]);
  useEffect(()=>{ if(hydrated) AsyncStorage.setItem(K_STREAK, JSON.stringify({streak,longest})).catch(()=>{}); },[streak,longest,hydrated]);

  const pushToast=useCallback((t:Toast)=>{
    setToasts(p=>[...p,t]);
    setTimeout(()=> setToasts(p=>p.filter(x=>x.id!==t.id)), 3400);
  },[]);

  const evaluateAchievements=useCallback((nextDone:Progress, nextProj:ProjectProgress, nextXp:number, nextStreak:number)=>{
    const lvl=levelForXp(nextXp);
    const state={ completedIds: Object.keys(nextDone).filter(k=>nextDone[k]), completedProjects: Object.keys(nextProj).filter(k=>nextProj[k]), streak: nextStreak, longestStreak: Math.max(longest,nextStreak), xp: nextXp, level: lvl, unlockedAchievements: achievements };
    const newly=ACHIEVEMENTS.filter(a=> !achievements.includes(a.id) && a.condition(state as any));
    if(newly.length){
      setAchievements(p=> [...p, ...newly.map(n=>n.id)]);
      setRecent(r=> [...r, ...newly.map(n=>({id:n.id,title:n.title,desc:n.desc,icon:n.icon,xp:n.xp}))]);
      newly.forEach(n=> pushToast({ id:"ach-"+n.id+"-"+Date.now(), title: n.title, desc: n.desc, kind:"achievement", xp: n.xp }));
    }
  },[achievements,longest,pushToast]);

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
        evaluateAchievements(next, projectsDone, newXp, streak);
      }
      return next;
    });
  },[xp,streak,projectsDone,pushToast,evaluateAchievements]);

  const toggleProject=useCallback((id:string)=>{
    setProjectsDone(prev=>{
      const was=!!prev[id];
      const next={...prev,[id]:!was};
      if(!was){
        const newXp = xp + XP_PER_PROJECT;
        setXp(newXp);
        pushToast({id:"proj-"+id+"-"+Date.now(), title:"+"+XP_PER_PROJECT+" XP", desc:"Project shipped", kind:"xp", xp:XP_PER_PROJECT});
        evaluateAchievements(done, next, newXp, streak);
      }
      return next;
    });
  },[xp,done,streak,pushToast,evaluateAchievements]);

  const completedCount=Object.values(done).filter(Boolean).length;
  const completedProjectsCount=Object.values(projectsDone).filter(Boolean).length;
  const level=levelForXp(xp);
  const xpInfo=xpProgress(xp);
  const isComplete=completedCount>=27 && completedProjectsCount>=3;

  return (
    <Ctx.Provider value={{
      done,projectsDone,toggle,toggleProject,completedCount,completedProjectsCount,
      xp,level,xpInfo,streak,longestStreak:longest,achievements,toasts,
      dismissToast:(id)=> setToasts(t=>t.filter(x=>x.id!==id)),
      recentUnlocks:recent,clearRecentUnlocks:()=> setRecent([]),
      isComplete,hydrated,
    }}>
      {children}
    </Ctx.Provider>
  );
}
export const useProgress=()=> useContext(Ctx);
