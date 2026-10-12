import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../lib/theme";

export function Card({ children, style }: any){
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Pill({ children, active }: any){
  return <View style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text></View>;
}
export function Btn({ title, onPress, variant="primary", icon, disabled }: any){
  const isPrimary = variant==="primary";
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.btn, isPrimary?styles.btnPrimary:styles.btnGhost, disabled&&{opacity:0.6}]}>
      {icon}
      <Text style={[styles.btnText, isPrimary?styles.btnTextPrimary:styles.btnTextGhost]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card:{ backgroundColor: theme.surface, borderWidth:1, borderColor: theme.border, borderRadius:14, padding:14 },
  pill:{ borderWidth:1, borderColor: theme.border, borderRadius:999, paddingHorizontal:10, paddingVertical:6, backgroundColor:"transparent" },
  pillActive:{ backgroundColor:"#fff", borderColor:"#fff" },
  pillText:{ color: theme.muted, fontSize:11, fontWeight:"600" },
  pillTextActive:{ color:"#000" },
  btn:{ height:44, borderRadius:999, paddingHorizontal:18, flexDirection:"row", alignItems:"center", justifyContent:"center", gap:8 },
  btnPrimary:{ backgroundColor: theme.accent },
  btnGhost:{ backgroundColor:"transparent", borderWidth:1, borderColor: theme.border },
  btnText:{ fontSize:14, fontWeight:"700" },
  btnTextPrimary:{ color:"#000" },
  btnTextGhost:{ color: theme.text },
});
