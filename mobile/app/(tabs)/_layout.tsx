import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { House, BookOpen, Hammer, MapPinned, UserRound } from "lucide-react-native";
import { theme } from "../../lib/theme";

function PillTab({ label, Icon, focused }: { label: string; Icon: any; focused: boolean }) {
  return (
    <View style={[s.pill, focused && s.pillActive]}>
      <Icon size={16} color={focused ? "#000" : theme.muted} strokeWidth={focused ? 2.4 : 2} />
      <Text numberOfLines={1} style={[s.pillLabel, focused ? s.pillLabelActive : s.pillLabelIdle]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: s.bar,
        tabBarItemStyle: s.item,
        tabBarHideOnKeyboard: true,
        // smooth fade between tabs
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <PillTab label="Home" Icon={House} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="modules"
        options={{
          title: "Learn",
          tabBarIcon: ({ focused }) => <PillTab label="Learn" Icon={BookOpen} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Build",
          tabBarIcon: ({ focused }) => <PillTab label="Build" Icon={Hammer} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: "Roadmap",
          tabBarIcon: ({ focused }) => <PillTab label="Plan" Icon={MapPinned} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "You",
          tabBarIcon: ({ focused }) => <PillTab label="You" Icon={UserRound} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const s = StyleSheet.create({
  // Floating pill navbar — black glass, orange active pill
  bar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.OS === "ios" ? 20 : 14,
    height: 62,
    borderRadius: 999,
    backgroundColor: "rgba(16,16,16,0.96)",
    borderWidth: 1,
    borderColor: theme.borderStrong,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "transparent",
    minWidth: 0,
  },
  pillActive: {
    backgroundColor: theme.accent,
    paddingHorizontal: 14,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  pillLabelActive: {
    color: "#000",
  },
  pillLabelIdle: {
    color: theme.muted,
  },
});
