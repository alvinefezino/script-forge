import { Tabs } from "expo-router";
import { Text } from "react-native";
import { theme } from "../../lib/theme";

function TabIcon({ c, label, focused }: { c: string; label: string; focused: boolean }){
  return <Text style={{ fontSize:18, color: focused ? theme.accent : theme.muted }}>{c}</Text>;
}

export default function TabsLayout(){
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{ backgroundColor: theme.bg, borderTopColor: theme.border, borderTopWidth:1, height:62, paddingTop:6 },
      tabBarActiveTintColor: theme.accent,
      tabBarInactiveTintColor: theme.muted,
    }}>
      <Tabs.Screen name="index" options={{ title:"Home", tabBarIcon: ({focused})=> <TabIcon c="⌂" label="Home" focused={focused} /> }} />
      <Tabs.Screen name="modules" options={{ title:"Learn", tabBarIcon: ({focused})=> <TabIcon c="◫" label="Learn" focused={focused} /> }} />
      <Tabs.Screen name="projects" options={{ title:"Build", tabBarIcon: ({focused})=> <TabIcon c="▣" label="Build" focused={focused} /> }} />
      <Tabs.Screen name="roadmap" options={{ title:"Roadmap", tabBarIcon: ({focused})=> <TabIcon c="⬢" label="Roadmap" focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ title:"You", tabBarIcon: ({focused})=> <TabIcon c="◆" label="You" focused={focused} /> }} />
    </Tabs>
  );
}
