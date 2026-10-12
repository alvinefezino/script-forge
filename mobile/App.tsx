// Shim — real entry is expo-router/entry -> app/_layout.tsx
import { Redirect } from "expo-router";
export default function App(){ return <Redirect href="/(tabs)" />; }
