import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { Session, User } from "@supabase/supabase-js";

type Ctx = { user: User | null; session: Session | null; loading: boolean; signOut: () => Promise<void>; };
const Ctx = createContext<Ctx>({ user: null, session: null, loading: true, signOut: async()=>{} });

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [session,setSession]=useState<Session|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{ setSession(data.session ?? null); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e,s)=> setSession(s));
    return ()=> sub.subscription.unsubscribe();
  },[]);
  const signOut = async()=>{ await supabase.auth.signOut(); };
  return <Ctx.Provider value={{ user: session?.user ?? null, session, loading, signOut }}>{children}</Ctx.Provider>;
}
export const useAuth=()=> useContext(Ctx);
export function firstNameOf(user:any){
  const f=user?.user_metadata?.full_name as string|undefined;
  if(f && f.trim()) return f.trim().split(/\s+/)[0];
  const e=user?.email as string|undefined;
  if(e) return e.split("@")[0].split(".")[0];
  return null;
}
