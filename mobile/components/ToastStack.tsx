import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useProgress } from "../lib/ProgressProvider";
import { theme } from "../lib/theme";

export default function ToastStack(){
  const { toasts } = useProgress();
  if(!toasts.length) return null;
  return (
    <View pointerEvents="none" style={styles.wrap}>
      {toasts.map(t=>(
        <Animated.View key={t.id} entering={FadeInUp.duration(220)} exiting={FadeOutUp.duration(180)} style={[styles.toast, t.kind==="achievement" && styles.toastAch, t.kind==="streak" && styles.toastStreak]}>
          <Text style={styles.title}>{t.title}{t.xp ? " · +" + t.xp + " XP" : ""}</Text>
          {t.desc ? <Text style={styles.desc}>{t.desc}</Text> : null}
        </Animated.View>
      ))}
    </View>
  );
}
const styles=StyleSheet.create({
  wrap:{ position:"absolute", top:52, left:12, right:12, gap:8, zIndex:50 },
  toast:{ backgroundColor: theme.surfaceRaised, borderWidth:1, borderColor: theme.border, borderRadius:12, paddingHorizontal:14, paddingVertical:10 },
  toastAch:{ borderColor:"rgba(245,158,11,0.35)", backgroundColor:"rgba(245,158,11,0.12)" },
  toastStreak:{ borderColor:"rgba(245,158,11,0.35)" },
  title:{ color: theme.text, fontSize:12, fontWeight:"700" },
  desc:{ color: theme.muted, fontSize:11, marginTop:2 },
});
