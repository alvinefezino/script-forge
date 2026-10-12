import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../lib/AuthProvider";
import { ProgressProvider } from "../lib/ProgressProvider";
import { View } from "react-native";
import { theme } from "../lib/theme";
import ToastStack from "../components/ToastStack";
import AchievementModal from "../components/AchievementModal";

export default function RootLayout(){
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProgressProvider>
          <View style={{ flex:1, backgroundColor: theme.bg }}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown:false, contentStyle:{ backgroundColor: theme.bg }, animation:"fade" }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="login" />
              <Stack.Screen name="learn/[id]" options={{ animation:"slide_from_right" }} />
              <Stack.Screen name="project/[slug]" options={{ animation:"slide_from_right" }} />
            </Stack>
            <ToastStack />
            <AchievementModal />
          </View>
        </ProgressProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
