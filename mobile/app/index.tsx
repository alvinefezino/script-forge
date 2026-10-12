import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../lib/AuthProvider";
import { theme } from "../lib/theme";

export default function Index(){
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(()=>{
    if(loading) return;
    if(user) router.replace("/(tabs)");
    else router.replace("/login");
  },[user, loading]);
  return <View style={{ flex:1, backgroundColor: theme.bg, alignItems:"center", justifyContent:"center" }}><ActivityIndicator color={theme.accent} /></View>;
}
