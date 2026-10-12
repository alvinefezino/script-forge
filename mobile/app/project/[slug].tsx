import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { projects } from "../../lib/projects";
import { useProgress } from "../../lib/ProgressProvider";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ProjectDetail(){
  const { slug } = useLocalSearchParams<{slug:string}>();
  const router=useRouter();
  const p = projects.find(x=> x.slug===slug);
  const { projectsDone, toggleProject } = useProgress();
  if(!p) return <View style={{ flex:1, backgroundColor: theme.bg, padding:20 }}><Text style={{ color: theme.text }}>Project not found</Text><Pressable onPress={()=> router.back()}><Text style={{ color: theme.accent, marginTop:12 }}>Back</Text></Pressable></View>;
  const done=!!projectsDone[p.slug];

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Pressable onPress={()=> router.back()}><Text style={{ color: theme.muted, fontSize:12 }}>← Projects</Text></Pressable>

      <Animated.View entering={FadeInUp.duration(260)} style={styles.head}>
        <View style={{ flexDirection:"row", gap:8, alignItems:"center" }}>
          <View style={styles.badge}><Text style={styles.badgeText}>{p.level[0].toUpperCase()}</Text></View>
          <Text style={styles.level}>{p.level.toUpperCase()} · {p.duration} · {p.steps.length} steps</Text>
          {done && <View style={styles.shipped}><Text style={styles.shippedText}>Shipped ✓</Text></View>}
        </View>
        <Text style={styles.title}>{p.title}</Text>
        <Text style={styles.blurb}>{p.blurb}</Text>
        <View style={{ flexDirection:"row", flexWrap:"wrap", gap:6, marginTop:8 }}>
          {p.stack.map(s=> <View key={s} style={styles.stackPill}><Text style={styles.stackText}>{s}</Text></View>)}
        </View>
      </Animated.View>

      <Pressable onPress={()=> toggleProject(p.slug)} style={[styles.shipBtn, done&&{ backgroundColor: theme.success }]}>
        <Text style={[styles.shipText, done&&{ color:"#fff"}]}>{done ? "Shipped ✓ — tap to undo" : "Mark as shipped — I deployed this"}</Text>
      </Pressable>

      <Text style={styles.kicker}>STEPS — follow in order. Copy any block.</Text>

      {p.steps.map((step,i)=> (
        <Animated.View key={step.id} entering={FadeInUp.delay(i*30).duration(260)} style={styles.step}>
          <View style={styles.stepHead}>
            <View style={styles.num}><Text style={styles.numText}>{i+1}</Text></View>
            <View style={{ flex:1 }}>
              <View style={{ flexDirection:"row", gap:8, alignItems:"center" }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <View style={styles.dur}><Text style={styles.durText}>{step.duration}</Text></View>
              </View>
              <Text style={styles.concept}>◐ {step.concept}</Text>
              <Text style={styles.explain}>{step.explain}</Text>
            </View>
          </View>
          {step.terminal && (
            <View style={styles.codeWrap}>
              <Text style={styles.codeLabel}>TERMINAL</Text>
              <View style={styles.codeBox}><Text style={styles.codeText}>{step.terminal}</Text></View>
            </View>
          )}
          {step.code && (
            <View style={styles.codeWrap}>
              <Text style={styles.codeLabel}>{(step.lang ?? "code").toUpperCase()}</Text>
              <View style={styles.codeBox}><Text style={styles.codeText}>{step.code}</Text></View>
            </View>
          )}
          {step.tip && <View style={styles.tip}><Text style={styles.tipText}><Text style={{ color: theme.accent, fontWeight:"800"}}>Tip: </Text>{step.tip}</Text></View>}
          {step.checklist && step.checklist.length>0 && (
            <View style={styles.checkWrap}>
              <Text style={styles.kicker}>CHECKLIST</Text>
              {step.checklist.map(c=> <View key={c} style={{ flexDirection:"row", gap:8, marginTop:6 }}><Text style={{ color: theme.success }}>✓</Text><Text style={styles.checkText}>{c}</Text></View>)}
            </View>
          )}
        </Animated.View>
      ))}

      <View style={{ flexDirection:"row", gap:10 }}>
        <Pressable onPress={()=> router.push("/(tabs)/projects")} style={styles.ghost}><Text style={styles.ghostText}>All projects</Text></Pressable>
        <Pressable onPress={()=> router.push("/(tabs)/modules")} style={styles.cta}><Text style={styles.ctaText}>Start lessons</Text></Pressable>
      </View>
      {done && <Link href="/certificate" asChild><Pressable style={styles.certCta}><Text style={styles.certCtaText}>View certificate →</Text></Pressable></Link>}
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  head:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  badge:{ width:28, height:28, borderRadius:14, backgroundColor:"#fff", alignItems:"center", justifyContent:"center" },
  badgeText:{ color:"#000", fontSize:12, fontWeight:"800" },
  level:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.6, flex:1 },
  shipped:{ backgroundColor: theme.success, borderRadius:999, paddingHorizontal:8, paddingVertical:3 },
  shippedText:{ color:"#fff", fontSize:10, fontWeight:"800" },
  title:{ color: theme.text, fontSize:20, fontWeight:"800", marginTop:8 },
  blurb:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:6 },
  stackPill:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:8, paddingVertical:4 },
  stackText:{ color: theme.muted, fontSize:10, fontWeight:"600" },
  shipBtn:{ height:46, backgroundColor: theme.accent, borderRadius:999, alignItems:"center", justifyContent:"center" },
  shipText:{ color:"#000", fontSize:13, fontWeight:"800" },
  kicker:{ color: theme.faint, fontSize:10, fontWeight:"800", letterSpacing:1 },
  step:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, overflow:"hidden" },
  stepHead:{ flexDirection:"row", gap:10, padding:14, backgroundColor: theme.surfaceRaised },
  num:{ width:28, height:28, borderRadius:14, backgroundColor:"#fff", alignItems:"center", justifyContent:"center" },
  numText:{ color:"#000", fontSize:12, fontWeight:"800" },
  stepTitle:{ color: theme.text, fontSize:14, fontWeight:"800", flex:1 },
  dur:{ backgroundColor:"#000", borderRadius:999, paddingHorizontal:8, paddingVertical:3 },
  durText:{ color:"#737373", fontSize:10, fontWeight:"700" },
  concept:{ color: theme.accent, fontSize:10, fontWeight:"700", letterSpacing:0.8, marginTop:4 },
  explain:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:4 },
  codeWrap:{ padding:14, gap:8 },
  codeLabel:{ color: theme.faint, fontSize:10, fontWeight:"800", letterSpacing:1 },
  codeBox:{ backgroundColor:"#000", borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12 },
  codeText:{ color:"#E5E5E5", fontFamily:"monospace", fontSize:11, lineHeight:16 },
  tip:{ marginHorizontal:14, marginBottom:14, borderWidth:1, borderColor:"rgba(245,158,11,0.22)", backgroundColor:"rgba(245,158,11,0.08)", borderRadius:10, padding:10 },
  tipText:{ color: theme.muted, fontSize:12, lineHeight:18 },
  checkWrap:{ borderTopWidth:1, borderTopColor: theme.border, padding:12 },
  checkText:{ color: theme.muted, fontSize:12, flex:1 },
  ghost:{ flex:1, height:44, borderWidth:1, borderColor: theme.border, borderRadius:999, alignItems:"center", justifyContent:"center" },
  ghostText:{ color: theme.text, fontSize:13, fontWeight:"700" },
  cta:{ flex:1, height:44, backgroundColor: theme.accent, borderRadius:999, alignItems:"center", justifyContent:"center" },
  ctaText:{ color:"#000", fontSize:13, fontWeight:"800" },
  certCta:{ height:44, backgroundColor:"#fff", borderRadius:999, alignItems:"center", justifyContent:"center" },
  certCtaText:{ color:"#000", fontSize:13, fontWeight:"800" },
});
