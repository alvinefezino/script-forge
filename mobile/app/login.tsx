import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { theme } from "../lib/theme";

export default function LoginScreen(){
  const [mode,setMode]=useState<"login"|"signup">("login");
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const [err,setErr]=useState<string|null>(null);
  const [msg,setMsg]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  const submit=async()=>{
    setErr(null); setMsg(null);
    if(mode==="signup" && !fullName.trim()){ setErr("Enter your full name."); return; }
    if(!email.trim() || !password){ setErr("Enter email and password."); return; }
    if(password.length<6){ setErr("Password must be at least 6 characters."); return; }
    setLoading(true);
    try{
      if(mode==="signup"){
        const { error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options:{ data:{ full_name: fullName.trim() }, emailRedirectTo:"https://script-forge-brown.vercel.app/auth/callback" }
        });
        if(error) throw error;
        setMsg("Check your email to confirm, then log in. Progress saves offline in the meantime.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if(error) throw error;
        setMsg("Signed in.");
        router.replace("/(tabs)");
      }
    }catch(e:any){
      setErr(e?.message ?? "Something went wrong");
    }finally{ setLoading(false); }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap} style={{ flex:1, backgroundColor: theme.bg }}>
      <View style={styles.header}>
        <View style={styles.logo}><Text style={styles.logoMark}>{"</>"}</Text></View>
        <Text style={styles.brand}>Script Forge</Text>
        <Text style={styles.subtitle}>Learn JavaScript and TypeScript by doing.</Text>
        <Text style={styles.desc}>Offline first. Lessons run on device. Progress and streaks sync when you are signed in.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.toggle}>
          <Pressable onPress={()=>{ setMode("login"); setErr(null); setMsg(null); }} style={[styles.toggleBtn, mode==="login"&&styles.toggleActive]}><Text style={[styles.toggleText, mode==="login"&&styles.toggleTextActive]}>Log in</Text></Pressable>
          <Pressable onPress={()=>{ setMode("signup"); setErr(null); setMsg(null); }} style={[styles.toggleBtn, mode==="signup"&&styles.toggleActive]}><Text style={[styles.toggleText, mode==="signup"&&styles.toggleTextActive]}>Create account</Text></Pressable>
        </View>

        {mode==="signup" && (
          <View style={styles.field}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput value={fullName} onChangeText={setFullName} placeholder="Tobi Grant" placeholderTextColor={theme.faint} style={styles.input} autoCapitalize="words" />
          </View>
        )}
        <View style={styles.field}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={theme.faint} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passWrap}>
            <TextInput value={password} onChangeText={setPassword} placeholder={mode==="signup"?"At least 6 characters":"Your password"} placeholderTextColor={theme.faint} style={[styles.input,{flex:1, borderWidth:0}]} secureTextEntry={!show} />
            <Pressable onPress={()=>setShow(v=>!v)} style={styles.eye}><Text style={styles.eyeText}>{show?"Hide":"Show"}</Text></Pressable>
          </View>
        </View>

        {err && <View style={styles.err}><Text style={styles.errText}>{err}</Text></View>}
        {msg && !err && <View style={styles.ok}><Text style={styles.okText}>{msg}</Text></View>}

        <Pressable onPress={submit} disabled={loading} style={[styles.cta, loading&&{opacity:0.6}]}>
          {loading ? <ActivityIndicator color="#000"/> : <Text style={styles.ctaText}>{mode==="signup"?"Create account":"Log in"}  →</Text>}
        </Pressable>

        <Pressable onPress={()=> setMode(mode==="signup"?"login":"signup")} style={{marginTop:14, alignItems:"center"}}>
          <Text style={{ color: theme.faint, fontSize:12 }}>{mode==="signup"?"Already have an account? ":"Need an account? "}<Text style={{ color: theme.text, fontWeight:"700", textDecorationLine:"underline" }}>{mode==="signup"?"Log in":"Create one"}</Text></Text>
        </Pressable>

        <Pressable onPress={()=> router.replace("/(tabs)")} style={{marginTop:16, alignItems:"center"}}>
          <Text style={{ color: theme.muted, fontSize:12, textDecorationLine:"underline" }}>Continue offline without signing in</Text>
        </Pressable>
      </View>
      <Text style={styles.foot}>Works offline. Progress stays on device. Sign in to keep streaks across devices.</Text>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  wrap:{ padding:20, paddingBottom:40 },
  header:{ alignItems:"center", marginTop:18, marginBottom:18 },
  logo:{ width:44, height:44, borderRadius:10, backgroundColor: theme.accent, alignItems:"center", justifyContent:"center" },
  logoMark:{ color:"#000", fontWeight:"800", fontSize:14 },
  brand:{ color: theme.text, fontSize:22, fontWeight:"700", marginTop:10, letterSpacing:-0.5 },
  subtitle:{ color: theme.text, fontSize:13, fontWeight:"600", marginTop:6 },
  desc:{ color: theme.muted, fontSize:12, textAlign:"center", marginTop:6, lineHeight:18, maxWidth:320 },
  card:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:16 },
  toggle:{ flexDirection:"row", backgroundColor: theme.surfaceRaised, borderRadius:999, padding:3, borderWidth:1, borderColor: theme.border },
  toggleBtn:{ flex:1, height:36, borderRadius:999, alignItems:"center", justifyContent:"center" },
  toggleActive:{ backgroundColor:"#fff" },
  toggleText:{ color: theme.muted, fontSize:13, fontWeight:"700" },
  toggleTextActive:{ color:"#000" },
  field:{ marginTop:14 },
  label:{ color: theme.muted, fontSize:10, fontWeight:"700", letterSpacing:1.2 },
  input:{ marginTop:6, height:44, backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:10, paddingHorizontal:12, color: theme.text, fontSize:14 },
  passWrap:{ marginTop:6, flexDirection:"row", alignItems:"center", backgroundColor: theme.bg, borderWidth:1, borderColor: theme.border, borderRadius:10, overflow:"hidden" },
  eye:{ paddingHorizontal:12, height:44, alignItems:"center", justifyContent:"center" },
  eyeText:{ color: theme.muted, fontSize:11, fontWeight:"700" },
  err:{ marginTop:12, backgroundColor:"rgba(229,72,77,0.1)", borderWidth:1, borderColor:"rgba(229,72,77,0.3)", borderRadius:10, padding:10 },
  errText:{ color:"#FCA5A5", fontSize:12, lineHeight:16 },
  ok:{ marginTop:12, backgroundColor:"rgba(245,158,11,0.1)", borderWidth:1, borderColor:"rgba(245,158,11,0.3)", borderRadius:10, padding:10 },
  okText:{ color: theme.text, fontSize:12, lineHeight:16 },
  cta:{ marginTop:16, height:44, backgroundColor: theme.accent, borderRadius:999, alignItems:"center", justifyContent:"center" },
  ctaText:{ color:"#000", fontSize:14, fontWeight:"700" },
  foot:{ color: theme.faint, fontSize:11, textAlign:"center", marginTop:16, lineHeight:16 },
});
