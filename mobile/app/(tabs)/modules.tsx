import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { curriculum } from "../../lib/curriculum";
import { useProgress } from "../../lib/ProgressProvider";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Modules(){
  const router=useRouter();
  const { done, xp, level } = useProgress();
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Animated.View entering={FadeInUp.duration(260)} style={styles.head}>
        <Text style={styles.kicker}>CURRICULUM</Text>
        <Text style={styles.h1}>Learn by doing</Text>
        <Text style={styles.sub}>Tap a lesson to open the playground. Progress saves offline. {completed} completed · Lv {level} · {xp} XP</Text>
      </Animated.View>
      {curriculum.map((m,i)=> (
        <Animated.View key={m.id} entering={FadeInUp.delay(i*40).duration(260)} style={styles.mod}>
          <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
            <Text style={styles.track}>{m.track.toUpperCase()} · {m.level.toUpperCase()}</Text>
            <Text style={styles.count}>{m.lessons.length} lessons</Text>
          </View>
          <Text style={styles.title}>{m.title}</Text>
          <Text style={styles.desc}>{m.blurb}</Text>
          <View style={{ gap:8, marginTop:12 }}>
            {m.lessons.map(l=>{
              const isDone=!!done[l.id];
              return (
                <Pressable key={l.id} onPress={()=> router.push(`/learn/${l.id}`)} style={[styles.lesson, isDone&&styles.lessonDone]}>
                  <View style={{ flex:1 }}>
                    <Text style={[styles.lessonTitle, isDone&&{ color: theme.success }]}>{l.title} {isDone?"✓":""}</Text>
                    <Text style={styles.lessonMeta}>{l.duration} · {l.description.slice(0,64)}…</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  head:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:16 },
  kicker:{ color: theme.accent, fontSize:11, fontWeight:"800", letterSpacing:1 },
  h1:{ color: theme.text, fontSize:22, fontWeight:"800", marginTop:6 },
  sub:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:6 },
  mod:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  track:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.8 },
  count:{ color: theme.faint, fontSize:11 },
  title:{ color: theme.text, fontSize:16, fontWeight:"800", marginTop:6 },
  desc:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:4 },
  lesson:{ flexDirection:"row", alignItems:"center", gap:10, backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:10, padding:12 },
  lessonDone:{ borderColor:"rgba(34,197,94,0.35)", backgroundColor:"rgba(34,197,94,0.06)" },
  lessonTitle:{ color: theme.text, fontSize:13, fontWeight:"700" },
  lessonMeta:{ color: theme.muted, fontSize:11, marginTop:2 },
  chevron:{ color: theme.faint, fontSize:18, fontWeight:"700" },
});
