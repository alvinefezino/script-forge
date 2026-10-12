import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const url = (Constants.expoConfig?.extra as any)?.supabaseUrl ?? "https://pjgosyszjpjqidrmlipn.supabase.co";
// anon key shipped for mobile — same as web preview (public, RLS protected)
const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZ29zeXN6anBqcWlkcm1saXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTY1MjcsImV4cCI6MjA3NTg3MjUyN30.GFrD3401Wr8KLEGlXzCKFRi7E0Q1hBgR7V1rLy2V57cM";

export const supabase = createClient(url, anon, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
