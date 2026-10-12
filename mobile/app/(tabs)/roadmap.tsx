import { ScrollView, View, Text, StyleSheet } from "react-native";
import { roadmapPhases, careerPaths } from "../../lib/roadmap";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Roadmap(){
  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Animated.View entering={FadeInUp.duration(260)} style={styles.head}>
        <Text style={styles.kicker}>ROADMAP</Text>
        <Text style={styles.h1}>From zero to shipping</Text>
        <Text style={styles.sub}>Eight phases, 27 lessons, 3 projects. Pick a career path and follow the line.</Text>
        <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
          <View style={styles.stat}><Text style={styles.statN}>08</Text><Text style={styles.statL}>Phases</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>27</Text><Text style={styles.statL}>Lessons</Text></View>
          <View style={styles.stat}><Text style={styles.statN}>03</Text><Text style={styles.statL}>Projects</Text></View>
        </View>
      </Animated.View>

      {roadmapPhases.map((phase,i)=> (
        <Animated.View key={phase.n} entering={FadeInUp.delay(i*30).duration(260)} style={styles.phase}>
          <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
            <Text style={styles.phasePhase}>PHASE {phase.n}</Text>
            <Text style={styles.phaseMeta}>{phase.minutes} min · {phase.lessons.length} lessons</Text>
          </View>
          <Text style={styles.phaseTitle}>{phase.title}</Text>
          <Text style={styles.phaseDesc}>{phase.subtitle}</Text>
          <View style={{ flexDirection:"row", flexWrap:"wrap", gap:6, marginTop:8 }}>
            {phase.skills.map((s: string)=> <View key={s} style={styles.topic}><Text style={styles.topicText}>{s}</Text></View>)}
          </View>
          <Text style={styles.deliverable}>{phase.deliverable}</Text>
        </Animated.View>
      ))}

      <View style={styles.paths}>
        <Text style={styles.kicker}>CAREER PATHS</Text>
        {careerPaths.map((c:any)=> (
          <View key={c.role} style={styles.pathCard}>
            <Text style={styles.pathTitle}>{c.role}</Text>
            <Text style={styles.pathDesc}>{c.tagline}</Text>
            <Text style={styles.pathMeta}>{c.focus.join(" · ")}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  head:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:16 },
  kicker:{ color: theme.accent, fontSize:11, fontWeight:"800", letterSpacing:1 },
  h1:{ color: theme.text, fontSize:22, fontWeight:"800", marginTop:6 },
  sub:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:6 },
  stat:{ flex:1, backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:10, padding:10, alignItems:"center" },
  statN:{ color: theme.text, fontSize:16, fontWeight:"800" },
  statL:{ color: theme.muted, fontSize:11, marginTop:2 },
  phase:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  phasePhase:{ color: theme.accent, fontSize:10, fontWeight:"800", letterSpacing:1 },
  phaseMeta:{ color: theme.faint, fontSize:11 },
  phaseTitle:{ color: theme.text, fontSize:15, fontWeight:"800", marginTop:6 },
  phaseDesc:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:4 },
  topic:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:8, paddingVertical:4, backgroundColor: theme.bg },
  topicText:{ color: theme.muted, fontSize:10, fontWeight:"600" },
  deliverable:{ color: theme.faint, fontSize:11, marginTop:8, fontStyle:"italic" },
  paths:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14, gap:10 },
  pathCard:{ backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12 },
  pathTitle:{ color: theme.text, fontSize:13, fontWeight:"700" },
  pathDesc:{ color: theme.muted, fontSize:11, lineHeight:16, marginTop:4 },
  pathMeta:{ color: theme.faint, fontSize:10, marginTop:6 },
});
