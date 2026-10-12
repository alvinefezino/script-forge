import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useProgress } from "../lib/ProgressProvider";
import { theme } from "../lib/theme";

export default function AchievementModal(){
  const { recentUnlocks, clearRecentUnlocks } = useProgress();
  const cur = recentUnlocks[0];
  if(!cur) return null;
  return (
    <Modal transparent animationType="fade" visible={!!cur} onRequestClose={clearRecentUnlocks}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={clearRecentUnlocks} />
        <Animated.View entering={ZoomIn.duration(280)} style={styles.card}>
          <View style={styles.badge}><Text style={styles.badgeIcon}>{cur.icon}</Text></View>
          <Text style={styles.kicker}>ACHIEVEMENT UNLOCKED</Text>
          <Text style={styles.title}>{cur.title}</Text>
          <Text style={styles.desc}>{cur.desc}</Text>
          <View style={styles.xpPill}><Text style={styles.xpText}>+{cur.xp} XP</Text></View>
          <Pressable onPress={clearRecentUnlocks} style={styles.cta}><Text style={styles.ctaText}>Continue</Text></Pressable>
          {recentUnlocks.length>1 && <Text style={styles.more}>+{recentUnlocks.length-1} more unlocked</Text>}
        </Animated.View>
      </View>
    </Modal>
  );
}
const styles=StyleSheet.create({
  backdrop:{ flex:1, backgroundColor:"rgba(0,0,0,0.6)", alignItems:"center", justifyContent:"center", padding:20 },
  card:{ width:"100%", maxWidth:360, backgroundColor: theme.surface, borderWidth:1, borderColor:"rgba(245,158,11,0.3)", borderRadius:16, padding:20, alignItems:"center" },
  badge:{ width:64, height:64, borderRadius:32, backgroundColor: theme.accent, alignItems:"center", justifyContent:"center", marginBottom:12 },
  badgeIcon:{ fontSize:28, color:"#000", fontWeight:"800" },
  kicker:{ color: theme.accent, fontSize:10, fontWeight:"800", letterSpacing:1.2 },
  title:{ color: theme.text, fontSize:18, fontWeight:"800", marginTop:6, textAlign:"center" },
  desc:{ color: theme.muted, fontSize:12, marginTop:6, textAlign:"center", lineHeight:18 },
  xpPill:{ marginTop:12, backgroundColor:"#fff", borderRadius:999, paddingHorizontal:14, paddingVertical:6 },
  xpText:{ color:"#000", fontSize:12, fontWeight:"800" },
  cta:{ marginTop:14, height:44, backgroundColor: theme.accent, borderRadius:999, paddingHorizontal:24, alignItems:"center", justifyContent:"center", alignSelf:"stretch" },
  ctaText:{ color:"#000", fontSize:14, fontWeight:"700" },
  more:{ color: theme.faint, fontSize:11, marginTop:8 },
});
