import { useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { curriculum, getLessonById, nextLesson } from "../../lib/curriculum";
import { useProgress } from "../../lib/ProgressProvider";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

function runJS(code: string){
  const out: string[]=[];
  const log=(...a:any[])=> out.push(a.map(v=> typeof v==="string"? v: JSON.stringify(v)).join(" "));
  try{
    const fn=new Function("console", code);
    fn({ log });
    return { ok:true, out: out.join("\n") || "(no output — try console.log)" };
  }catch(e:any){
    return { ok:false, out: e?.message ?? String(e) };
  }
}

export default function Learn(){
  const { id } = useLocalSearchParams<{id:string}>();
  const router=useRouter();
  const found = getLessonById(id ?? "m1l1");
  if(!found) return <View style={{ flex:1, backgroundColor: theme.bg, padding:20 }}><Text style={{ color: theme.text }}>Lesson not found</Text><Link href="/(tabs)/modules"><Text style={{ color: theme.accent, marginTop:12 }}>Back</Text></Link></View>;
  const { mod, lesson } = found;
  const nav = nextLesson(lesson.id);
  const { done, toggle } = useProgress();
  const isDone=!!done[lesson.id];
  const [code,setCode]=useState(lesson.code);
  const [result,setResult]=useState<{ok:boolean;out:string}|null>(null);
  const [quizAns,setQuizAns]=useState<Record<number, number>>({});

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Pressable onPress={()=> router.back()}><Text style={{ color: theme.muted, fontSize:12 }}>← {mod.title}</Text></Pressable>

      <Animated.View entering={FadeInUp.duration(260)} style={styles.head}>
        <View style={{ flexDirection:"row", gap:6 }}>
          <View style={styles.trackPill}><Text style={styles.trackText}>{mod.track.toUpperCase()}</Text></View>
          <View style={[styles.trackPill,{ backgroundColor:"#fff", borderColor:"#fff"}]}><Text style={[styles.trackText,{ color:"#000"}]}>{mod.level.toUpperCase()}</Text></View>
          <Text style={{ color: theme.faint, fontSize:11, marginLeft:6 }}>{lesson.duration}</Text>
        </View>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.desc}>{lesson.description}</Text>
      </Animated.View>

      <View style={styles.takeaways}>
        <Text style={styles.kicker}>IN PLAIN LANGUAGE</Text>
        {lesson.takeaways.map(t=> <View key={t} style={{ flexDirection:"row", gap:8, marginTop:8 }}><View style={styles.dot}/><Text style={styles.takeText}>{t}</Text></View>)}
      </View>

      <View style={styles.play}>
        <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
          <Text style={styles.kicker}>PLAYGROUND — editable, runs on device</Text>
          <Pressable onPress={()=> { setCode(lesson.code); setResult(null); }} style={styles.reset}><Text style={styles.resetText}>Reset</Text></Pressable>
        </View>
        <TextInput value={code} onChangeText={setCode} multiline style={styles.editor} placeholderTextColor={theme.faint} autoCapitalize="none" autoCorrect={false} />
        <View style={{ flexDirection:"row", gap:8, marginTop:10 }}>
          <Pressable onPress={()=> setResult(runJS(code))} style={styles.run}><Text style={styles.runText}>Run ▶</Text></Pressable>
          <Pressable onPress={()=> setCode(lesson.code)} style={styles.ghost}><Text style={styles.ghostText}>Copy original</Text></Pressable>
        </View>
        {result && (
          <View style={[styles.output, !result.ok && styles.outputErr]}>
            <Text style={[styles.outputText, !result.ok && { color:"#FCA5A5"}]}>{result.out}</Text>
            {lesson.expectedOutput && result.ok && <Text style={styles.expected}>Expected: {lesson.expectedOutput}</Text>}
          </View>
        )}
      </View>

      {lesson.quiz && lesson.quiz.length>0 && (
        <View style={{ gap:10 }}>
          {lesson.quiz.map((q,i)=>{
            const chosen=quizAns[i];
            const correct=chosen===q.answer;
            return (
              <View key={i} style={styles.quiz}>
                <Text style={styles.quizQ}>{q.q}</Text>
                <View style={{ gap:8, marginTop:10 }}>
                  {q.options.map((opt,oi)=>{
                    const sel=chosen===oi;
                    return (
                      <Pressable key={oi} onPress={()=> setQuizAns(s=> ({...s,[i]:oi}))} style={[styles.opt, sel&&styles.optSel, sel&&correct&&styles.optOk, sel&&!correct&&styles.optBad]}>
                        <Text style={[styles.optText, sel&&{ color:"#000", fontWeight:"700"}]}>{opt}</Text>
                      </Pressable>
                    );
                  })}
                </View>
                {chosen!==undefined && (
                  <View style={[styles.explain, correct?{ borderColor:"rgba(34,197,94,0.3)", backgroundColor:"rgba(34,197,94,0.08)"}:{ borderColor:"rgba(229,72,77,0.3)", backgroundColor:"rgba(229,72,77,0.08)"}]}>
                    <Text style={[styles.explainText, { color: correct? "#86EFAC":"#FCA5A5"}]}>{correct?"Correct —":"Not quite —"} {q.explain}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <View style={{ flexDirection:"row", gap:10 }}>
        <Pressable onPress={()=> toggle(lesson.id)} style={[styles.doneBtn, isDone&&styles.doneActive]}>
          <Text style={[styles.doneText, isDone&&{ color:"#fff"}]}>{isDone ? "Completed ✓" : "Mark as completed"}</Text>
        </Pressable>
        {nav?.next ? <Pressable onPress={()=> router.push(`/learn/${nav.next.lesson.id}`)} style={styles.next}><Text style={styles.nextText}>Next: {nav.next.lesson.title.slice(0,22)}… →</Text></Pressable> : null}
      </View>

      <View style={{ flexDirection:"row", gap:8 }}>
        {nav?.prev ? <Pressable onPress={()=> router.push(`/learn/${nav.prev.lesson.id}`)} style={styles.ghost}><Text style={styles.ghostText}>← Previous</Text></Pressable> : <View style={{flex:1}}/>}
        <Pressable onPress={()=> router.push("/(tabs)/modules")} style={styles.ghost}><Text style={styles.ghostText}>All lessons</Text></Pressable>
      </View>

      <Text style={styles.foot}>Progress saves offline on device. Works without signal after first open.</Text>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  head:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  trackPill:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:8, paddingVertical:4, backgroundColor:"transparent" },
  trackText:{ color: theme.muted, fontSize:10, fontWeight:"700", letterSpacing:0.8 },
  title:{ color: theme.text, fontSize:22, fontWeight:"800", marginTop:10, letterSpacing:-0.3 },
  desc:{ color: theme.muted, fontSize:13, lineHeight:19, marginTop:6 },
  takeaways:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  kicker:{ color: theme.accent, fontSize:10, fontWeight:"800", letterSpacing:1 },
  dot:{ width:6, height:6, borderRadius:3, backgroundColor: theme.accent, marginTop:6 },
  takeText:{ color: theme.text, fontSize:12, lineHeight:18, flex:1 },
  play:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  reset:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:10, paddingVertical:6 },
  resetText:{ color: theme.muted, fontSize:11, fontWeight:"700" },
  editor:{ marginTop:10, minHeight:140, backgroundColor:"#0B0B0B", borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12, color:"#E5E5E5", fontFamily:"monospace", fontSize:12, lineHeight:18, textAlignVertical:"top" },
  run:{ backgroundColor: theme.accent, borderRadius:999, paddingHorizontal:16, height:40, alignItems:"center", justifyContent:"center" },
  runText:{ color:"#000", fontSize:13, fontWeight:"800" },
  ghost:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:14, height:40, alignItems:"center", justifyContent:"center" },
  ghostText:{ color: theme.text, fontSize:12, fontWeight:"700" },
  output:{ marginTop:10, backgroundColor:"#0B0B0B", borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12 },
  outputErr:{ borderColor:"rgba(229,72,77,0.35)", backgroundColor:"rgba(229,72,77,0.08)" },
  outputText:{ color:"#E5E5E5", fontFamily:"monospace", fontSize:11, lineHeight:16 },
  expected:{ color: theme.faint, fontSize:11, marginTop:6 },
  quiz:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  quizQ:{ color: theme.text, fontSize:13, fontWeight:"700", lineHeight:18 },
  opt:{ borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12, backgroundColor: theme.bg },
  optSel:{ backgroundColor:"#fff", borderColor:"#fff" },
  optOk:{ borderColor: theme.success },
  optBad:{ borderColor: theme.danger },
  optText:{ color: theme.text, fontSize:12 },
  explain:{ marginTop:10, borderWidth:1, borderRadius:10, padding:10 },
  explainText:{ fontSize:11, lineHeight:16 },
  doneBtn:{ flex:1, height:44, borderRadius:999, backgroundColor:"#fff", alignItems:"center", justifyContent:"center" },
  doneActive:{ backgroundColor: theme.success },
  doneText:{ color:"#000", fontSize:13, fontWeight:"800" },
  next:{ flex:1, height:44, borderRadius:999, backgroundColor: theme.accent, alignItems:"center", justifyContent:"center", paddingHorizontal:10 },
  nextText:{ color:"#000", fontSize:11, fontWeight:"800" },
  foot:{ color: theme.faint, fontSize:11, textAlign:"center", marginTop:4 },
});
