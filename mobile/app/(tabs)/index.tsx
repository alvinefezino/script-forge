import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth, firstNameOf } from "../../lib/AuthProvider";
import { useProgress } from "../../lib/ProgressProvider";
import { curriculum } from "../../lib/curriculum";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Home(){
  const { user } = useAuth();
  const { xp, level, xpInfo, streak, completedCount, isComplete } = useProgress();
  const router = useRouter();
  const name = firstNameOf(user);
  const totalLessons = curriculum.reduce((s,m)=> s+m.lessons.length,0);
  const pct = Math.round((completedCount/totalLessons)*100);

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, paddingBottom:24, gap:14 }}>
      <Animated.View entering={FadeInUp.duration(280)} style={styles.hero}>
        {name ? <Text style={styles.welcome}>Welcome {name} 👋</Text> : <Text style={styles.welcome}>Welcome</Text>}
        <Text style={styles.h1}>Learn JavaScript{"\n"}<Text style={{ color: theme.muted }}>and TypeScript</Text>{"\n"}<Text style={{ color: theme.accent }}>by doing.</Text></Text>
        <Text style={styles.sub}>Short, explanatory lessons. Every code block runs on device. Works offline.</Text>
        <View style={{ flexDirection:"row", gap:10, marginTop:14 }}>
          <Pressable onPress={()=> router.push("/learn/m1l1")} style={styles.cta}><Text style={styles.ctaText}>Start learning</Text></Pressable>
          <Pressable onPress={()=> router.push("/(tabs)/modules")} style={styles.ghost}><Text style={styles.ghostText}>Curriculum</Text></Pressable>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}><Text style={styles.statN}>{curriculum.length}</Text><Text style={styles.statL}>Modules</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>{totalLessons}</Text><Text style={styles.statL}>Lessons</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>{completedCount}/{totalLessons}</Text><Text style={styles.statL}>{pct}% done</Text></View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(80).duration(300)} style={styles.card}>
        <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
          <Text style={styles.cardTitle}>Your progress</Text>
          <Text style={styles.xp}>Lv {level} · {xp} XP</Text>
        </View>
        <View style={styles.barTrack}><View style={[styles.barFill,{ width: `${xpInfo.pct}%` }]} /></View>
        <Text style={styles.barMeta}>{xpInfo.into}/{xpInfo.span} XP to level {level+1} · {streak} day streak {streak>=3?"🔥":""}</Text>
        <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
          <Pressable onPress={()=> router.push("/(tabs)/modules")} style={styles.miniCta}><Text style={styles.miniCtaText}>Continue</Text></Pressable>
          <Link href="/(tabs)/profile" asChild><Pressable style={styles.miniGhost}><Text style={styles.ghostText}>Achievements</Text></Pressable></Link>
        </View>
      </Animated.View>

      {isComplete && (
        <Animated.View entering={FadeInUp.delay(120).duration(300)} style={[styles.card,{ borderColor:"rgba(245,158,11,0.3)", backgroundColor:"rgba(245,158,11,0.08)" }]}>
          <Text style={styles.cardTitle}>🎉 You finished everything</Text>
          <Text style={styles.sub}>27 lessons + 3 projects — certificate is ready.</Text>
          <Pressable onPress={()=> router.push("/certificate")} style={[styles.cta,{ marginTop:10, alignSelf:"flex-start"}]}><Text style={styles.ctaText}>View certificate</Text></Pressable>
        </Animated.View>
      )}

      <View style={{ gap:10 }}>
        <Text style={styles.sectionKicker}>CURRICULUM</Text>
        {curriculum.map((m,i)=> (
          <Pressable key={m.id} onPress={()=> router.push("/(tabs)/modules")} style={styles.moduleCard}>
            <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
              <Text style={styles.track}>{m.track.toUpperCase()} · {m.level.toUpperCase()}</Text>
              <Text style={styles.moduleIdx}>0{i+1}</Text>
            </View>
            <Text style={styles.moduleTitle}>{m.title}</Text>
            <Text style={styles.moduleDesc}>{m.blurb}</Text>
            <Text style={styles.moduleMeta}>{m.lessons.length} lessons</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.offlineCard}>
        <Text style={styles.cardTitle}>Works offline</Text>
        <Text style={styles.sub}>Lessons, code playground, and your progress are saved on device. No signal needed after first load.</Text>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  hero:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:16, padding:16 },
  welcome:{ color: theme.accent, fontSize:12, fontWeight:"800", letterSpacing:0.8 },
  h1:{ color: theme.text, fontSize:30, fontWeight:"800", lineHeight:32, marginTop:8, letterSpacing:-0.5 },
  sub:{ color: theme.muted, fontSize:13, lineHeight:19, marginTop:8 },
  cta:{ backgroundColor: theme.accent, borderRadius:999, height:44, paddingHorizontal:18, alignItems:"center", justifyContent:"center" },
  ctaText:{ color:"#000", fontSize:14, fontWeight:"800" },
  ghost:{ borderWidth:1, borderColor: theme.border, borderRadius:999, height:44, paddingHorizontal:18, alignItems:"center", justifyContent:"center", backgroundColor:"transparent" },
  ghostText:{ color: theme.text, fontSize:13, fontWeight:"700" },
  stats:{ flexDirection:"row", gap:8, marginTop:14 },
  stat:{ flex:1, backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:12, padding:12, alignItems:"center" },
  statN:{ color: theme.text, fontSize:16, fontWeight:"800" },
  statL:{ color: theme.muted, fontSize:11, marginTop:2 },
  card:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  cardTitle:{ color: theme.text, fontSize:13, fontWeight:"700" },
  xp:{ color: theme.text, fontSize:11, fontWeight:"800", backgroundColor:"#fff", paddingHorizontal:8, paddingVertical:4, borderRadius:999, overflow:"hidden" },
  barTrack:{ marginTop:10, height:8, backgroundColor: theme.surfaceRaised, borderRadius:999, overflow:"hidden", borderWidth:1, borderColor: theme.border },
  barFill:{ height:"100%", backgroundColor: theme.accent, borderRadius:999 },
  barMeta:{ color: theme.faint, fontSize:11, marginTop:6 },
  miniCta:{ backgroundColor:"#fff", borderRadius:999, paddingHorizontal:14, height:36, alignItems:"center", justifyContent:"center" },
  miniCtaText:{ color:"#000", fontSize:12, fontWeight:"700" },
  miniGhost:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:14, height:36, alignItems:"center", justifyContent:"center" },
  sectionKicker:{ color: theme.accent, fontSize:11, fontWeight:"800", letterSpacing:1 },
  moduleCard:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  track:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.8 },
  moduleIdx:{ color: theme.faint, fontSize:11, fontWeight:"700" },
  moduleTitle:{ color: theme.text, fontSize:15, fontWeight:"700", marginTop:6 },
  moduleDesc:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:4 },
  moduleMeta:{ color: theme.faint, fontSize:11, marginTop:8 },
  offlineCard:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
});
