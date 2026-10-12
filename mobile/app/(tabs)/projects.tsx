import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { projects } from "../../lib/projects";
import { useProgress } from "../../lib/ProgressProvider";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Projects(){
  const router=useRouter();
  const { projectsDone } = useProgress();
  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Animated.View entering={FadeInUp.duration(260)} style={styles.head}>
        <Text style={styles.kicker}>PROJECTS</Text>
        <Text style={styles.h1}>Ship three apps</Text>
        <Text style={styles.sub}>Follow the steps in order. Everything is explained — how Next.js works, how to install, what dependencies do. Works offline after first load.</Text>
      </Animated.View>
      {projects.map((p,i)=> {
        const done=!!projectsDone[p.slug];
        return (
          <Animated.View key={p.slug} entering={FadeInUp.delay(i*40).duration(260)} style={[styles.card, done&&{ borderColor:"rgba(245,158,11,0.3)", backgroundColor:"rgba(245,158,11,0.06)" }]}>
            <View style={{ flexDirection:"row", gap:8, alignItems:"center" }}>
              <View style={[styles.badge, done&&{ backgroundColor: theme.success }]}><Text style={styles.badgeText}>{done?"✓": p.level[0].toUpperCase()}</Text></View>
              <Text style={styles.level}>{p.level.toUpperCase()} · {p.duration} · {p.steps.length} steps</Text>
              {done && <View style={styles.shipped}><Text style={styles.shippedText}>Shipped</Text></View>}
            </View>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.blurb}>{p.blurb}</Text>
            <View style={{ flexDirection:"row", flexWrap:"wrap", gap:6, marginTop:8 }}>
              {p.stack.map(s=> <View key={s} style={styles.stackPill}><Text style={styles.stackText}>{s}</Text></View>)}
            </View>
            <Pressable onPress={()=> router.push(`/project/${p.slug}`)} style={styles.cta}><Text style={styles.ctaText}>{done?"View again":"Open project"}  →</Text></Pressable>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  head:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:16 },
  kicker:{ color: theme.accent, fontSize:11, fontWeight:"800", letterSpacing:1 },
  h1:{ color: theme.text, fontSize:22, fontWeight:"800", marginTop:6 },
  sub:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:6 },
  card:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  badge:{ width:28, height:28, borderRadius:14, backgroundColor:"#fff", alignItems:"center", justifyContent:"center" },
  badgeText:{ color:"#000", fontSize:12, fontWeight:"800" },
  level:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.6, flex:1 },
  shipped:{ backgroundColor: theme.success, borderRadius:999, paddingHorizontal:8, paddingVertical:3 },
  shippedText:{ color:"#fff", fontSize:10, fontWeight:"800" },
  title:{ color: theme.text, fontSize:16, fontWeight:"800", marginTop:8 },
  blurb:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:4 },
  stackPill:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:8, paddingVertical:4 },
  stackText:{ color: theme.muted, fontSize:10, fontWeight:"600" },
  cta:{ marginTop:12, height:40, backgroundColor: theme.accent, borderRadius:999, alignItems:"center", justifyContent:"center" },
  ctaText:{ color:"#000", fontSize:13, fontWeight:"800" },
});
