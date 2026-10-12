import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, firstNameOf } from "../lib/AuthProvider";
import { useProgress } from "../lib/ProgressProvider";
import { theme } from "../lib/theme";

export default function Certificate(){
  const router=useRouter();
  const { user } = useAuth();
  const { isComplete, completedCount, completedProjectsCount, xp, level, streak } = useProgress();
  const name = user ? (firstNameOf(user) ? `${firstNameOf(user)} — ${user.email}` : user.email) : "Learner";
  const displayName = (()=>{ const f=(user as any)?.user_metadata?.full_name as string|undefined; if(f && f.trim()) return f.trim(); return name; })();
  const date = new Date().toLocaleDateString("en-US",{ year:"numeric", month:"long", day:"numeric"});

  if(!isComplete){
    return (
      <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:20, gap:14 }}>
        <Pressable onPress={()=> router.back()}><Text style={{ color: theme.muted, fontSize:12 }}>← Back</Text></Pressable>
        <View style={styles.locked}>
          <View style={styles.lockIcon}><Text style={{ color: theme.faint, fontSize:20 }}>○</Text></View>
          <Text style={styles.lockTitle}>Certificate locked</Text>
          <Text style={styles.lockDesc}>Finish all 27 lessons and ship all 3 projects to unlock your certificate. You are at {completedCount}/27 lessons and {completedProjectsCount}/3 ships.</Text>
          <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
            <View style={styles.pill}><Text style={styles.pillText}>{completedCount}/27 lessons</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>{completedProjectsCount}/3 ships</Text></View>
          </View>
          <Pressable onPress={()=> router.push("/(tabs)/modules")} style={styles.cta}><Text style={styles.ctaText}>Continue learning</Text></Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Pressable onPress={()=> router.back()}><Text style={{ color: theme.muted, fontSize:12 }}>← Back</Text></Pressable>
      <View style={styles.head}>
        <Text style={styles.kicker}>CERTIFICATE</Text>
        <Text style={styles.h1}>Certificate of Completion</Text>
        <Text style={styles.sub}>This certifies that</Text>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.body}>has completed all 27 lessons and shipped all 3 projects in Script Forge — JavaScript and TypeScript by doing. Built mobile first, explanatory, and offline ready.</Text>
        <View style={{ flexDirection:"row", gap:8, marginTop:14 }}>
          <View style={styles.stat}><Text style={styles.statN}>{completedCount}/27</Text><Text style={styles.statL}>LESSONS</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>{completedProjectsCount}/3</Text><Text style={styles.statL}>PROJECTS</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>Lv {level}</Text><Text style={styles.statL}>{xp} XP · {streak}d</Text></View>
        </View>
        <Text style={styles.date}>{date} · Script Forge</Text>
        <View style={styles.verified}><Text style={styles.verifiedText}>✓ Verified completion</Text></View>
      </View>
      <Text style={{ color: theme.faint, fontSize:11, textAlign:"center" }}>Share a screenshot of this certificate. Progress is saved offline on device.</Text>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  locked:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:20, alignItems:"center" },
  lockIcon:{ width:56, height:56, borderRadius:28, borderWidth:1, borderColor: theme.border, backgroundColor: theme.surfaceRaised, alignItems:"center", justifyContent:"center" },
  lockTitle:{ color: theme.text, fontSize:18, fontWeight:"800", marginTop:12 },
  lockDesc:{ color: theme.muted, fontSize:12, lineHeight:18, textAlign:"center", marginTop:6 },
  pill:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:10, paddingVertical:6 },
  pillText:{ color: theme.muted, fontSize:11, fontWeight:"700" },
  cta:{ marginTop:14, height:44, backgroundColor: theme.accent, borderRadius:999, paddingHorizontal:18, alignItems:"center", justifyContent:"center", alignSelf:"stretch" },
  ctaText:{ color:"#000", fontSize:13, fontWeight:"800" },
  head:{ backgroundColor: theme.bg, borderWidth:1, borderColor:"rgba(245,158,11,0.35)", borderRadius:16, padding:20, alignItems:"center" },
  kicker:{ color:"#000", fontSize:10, fontWeight:"800", letterSpacing:1.2, backgroundColor: theme.accent, paddingHorizontal:8, paddingVertical:4, borderRadius:999, overflow:"hidden" },
  h1:{ color: theme.text, fontSize:22, fontWeight:"800", marginTop:12 },
  sub:{ color: theme.muted, fontSize:12, marginTop:6 },
  name:{ color: theme.text, fontSize:20, fontWeight:"800", marginTop:10, textAlign:"center" },
  body:{ color: theme.muted, fontSize:12, lineHeight:18, textAlign:"center", marginTop:8 },
  stat:{ flex:1, borderWidth:1, borderColor: theme.border, borderRadius:10, padding:10, alignItems:"center", backgroundColor: theme.surface },
  statN:{ color: theme.text, fontSize:14, fontWeight:"800" },
  statL:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.6, marginTop:2 },
  date:{ color: theme.faint, fontSize:11, marginTop:14 },
  verified:{ marginTop:8, borderWidth:1, borderColor:"rgba(34,197,94,0.3)", backgroundColor:"rgba(34,197,94,0.08)", borderRadius:999, paddingHorizontal:10, paddingVertical:6 },
  verifiedText:{ color:"#86EFAC", fontSize:11, fontWeight:"700" },
});
