import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, firstNameOf } from "../../lib/AuthProvider";
import { useProgress } from "../../lib/ProgressProvider";
import { ACHIEVEMENTS } from "../../lib/gamification";
import { theme } from "../../lib/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Profile(){
  const router=useRouter();
  const { user, signOut } = useAuth();
  const { xp, level, xpInfo, streak, longestStreak, achievements, completedCount, completedProjectsCount, isComplete } = useProgress();
  const name = firstNameOf(user);
  const unlocked = new Set(achievements);

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, gap:12, paddingBottom:24 }}>
      <Animated.View entering={FadeInUp.duration(260)} style={styles.hero}>
        {name ? <Text style={styles.welcome}>Welcome {name} 👋</Text> : <Text style={styles.welcome}>Welcome 👋</Text>}
        <Text style={styles.email}>{user?.email ?? "Offline mode — sign in to keep streaks across devices."}</Text>
        {!user && <Pressable onPress={()=> router.push("/login")} style={styles.cta}><Text style={styles.ctaText}>Log in or create account</Text></Pressable>}
        {user && <Pressable onPress={async()=>{ await signOut(); router.replace("/login"); }} style={styles.ghost}><Text style={styles.ghostText}>Log out</Text></Pressable>}
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(60).duration(260)} style={styles.card}>
        <View style={{ flexDirection:"row", gap:8 }}>
          <View style={[styles.miniStat,{ borderColor: streak>=3? "rgba(245,158,11,0.35)": theme.border, backgroundColor: streak>=3? "rgba(245,158,11,0.1)":"transparent"}]}>
            <Text style={styles.miniK}>STREAK</Text><Text style={styles.miniV}>{streak} days 🔥</Text><Text style={styles.miniSub}>Best {longestStreak}</Text>
          </View>
          <View style={styles.miniStat}><Text style={styles.miniK}>LEVEL</Text><Text style={styles.miniV}>Lv {level}</Text><Text style={styles.miniSub}>{xp} XP</Text></View>
          <View style={styles.miniStat}><Text style={styles.miniK}>PROGRESS</Text><Text style={styles.miniV}>{completedCount}/27</Text><Text style={styles.miniSub}>{completedProjectsCount}/3 ships</Text></View>
        </View>
        <View style={styles.barTrack}><View style={[styles.barFill,{ width: `${xpInfo.pct}%` }]} /></View>
        <Text style={styles.barMeta}>{xpInfo.into}/{xpInfo.span} XP to level {level+1}</Text>
        {isComplete ? (
          <Pressable onPress={()=> router.push("/certificate")} style={[styles.cta,{ marginTop:12 }]}><Text style={styles.ctaText}>View certificate →</Text></Pressable>
        ) : (
          <Pressable onPress={()=> router.push("/(tabs)/modules")} style={[styles.cta,{ marginTop:12 }]}><Text style={styles.ctaText}>Continue learning →</Text></Pressable>
        )}
      </Animated.View>

      <View style={styles.card}>
        <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <Text style={styles.cardMeta}>{achievements.length}/{ACHIEVEMENTS.length}</Text>
        </View>
        <View style={{ flexDirection:"row", flexWrap:"wrap", gap:8, marginTop:12 }}>
          {ACHIEVEMENTS.map(a=>{
            const done = unlocked.has(a.id);
            return (
              <View key={a.id} style={[styles.ach, done?styles.achDone:styles.achLocked]}>
                <Text style={[styles.achIcon, done&&{ color: theme.accent }]}>{done ? a.icon : "○"}</Text>
                <Text style={[styles.achTitle, !done&&{ color: theme.faint }]}>{a.title}</Text>
                <Text style={styles.achDesc}>{a.desc}</Text>
                {done ? <Text style={styles.achXp}>+{a.xp} XP</Text> : <Text style={styles.achLockedLabel}>Locked</Text>}
              </View>
            );
          })}
        </View>
        <Pressable onPress={()=> router.push("/certificate")} style={[styles.ghost,{ marginTop:12 }]}><Text style={styles.ghostText}>Certificate — {isComplete ? "unlocked" : "complete 27 lessons + 3 ships to unlock"}</Text></Pressable>
      </View>

      <View style={styles.offline}>
        <Text style={styles.cardTitle}>Offline ready</Text>
        <Text style={styles.offlineText}>Lessons, playground, and your progress are bundled on device. Works without signal. Sign in only to sync streaks.</Text>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  hero:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:16 },
  welcome:{ color: theme.text, fontSize:20, fontWeight:"800", letterSpacing:-0.3 },
  email:{ color: theme.muted, fontSize:12, marginTop:6 },
  cta:{ marginTop:12, height:44, backgroundColor: theme.accent, borderRadius:999, alignItems:"center", justifyContent:"center", paddingHorizontal:18 },
  ctaText:{ color:"#000", fontSize:13, fontWeight:"800" },
  ghost:{ marginTop:12, height:44, borderWidth:1, borderColor: theme.border, borderRadius:999, alignItems:"center", justifyContent:"center", paddingHorizontal:18 },
  ghostText:{ color: theme.text, fontSize:12, fontWeight:"700" },
  card:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  cardTitle:{ color: theme.text, fontSize:13, fontWeight:"800" },
  cardMeta:{ color: theme.faint, fontSize:11, fontWeight:"700" },
  miniStat:{ flex:1, borderWidth:1, borderColor: theme.border, borderRadius:10, padding:10, alignItems:"center" },
  miniK:{ color: theme.faint, fontSize:10, fontWeight:"800", letterSpacing:0.8 },
  miniV:{ color: theme.text, fontSize:14, fontWeight:"800", marginTop:4 },
  miniSub:{ color: theme.muted, fontSize:11, marginTop:2 },
  barTrack:{ marginTop:12, height:8, backgroundColor: theme.surfaceRaised, borderRadius:999, overflow:"hidden", borderWidth:1, borderColor: theme.border },
  barFill:{ height:"100%", backgroundColor: theme.accent },
  barMeta:{ color: theme.faint, fontSize:11, marginTop:6 },
  ach:{ width:"48%", borderWidth:1, borderRadius:10, padding:10, gap:4 },
  achDone:{ backgroundColor:"rgba(245,158,11,0.06)", borderColor:"rgba(245,158,11,0.3)" },
  achLocked:{ backgroundColor: theme.bg, borderColor: theme.border, opacity:0.7 },
  achIcon:{ fontSize:16, fontWeight:"800", color: theme.faint },
  achTitle:{ color: theme.text, fontSize:11, fontWeight:"800" },
  achDesc:{ color: theme.muted, fontSize:11, lineHeight:14 },
  achXp:{ color: theme.success, fontSize:11, fontWeight:"800", marginTop:4 },
  achLockedLabel:{ color: theme.faint, fontSize:10, fontWeight:"700", letterSpacing:0.8, marginTop:4 },
  offline:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  offlineText:{ color: theme.muted, fontSize:12, lineHeight:18, marginTop:6 },
});
