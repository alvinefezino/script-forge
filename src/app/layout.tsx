import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProgressProvider } from "@/components/ProgressProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ToastStack } from "@/components/ToastStack";
import { AchievementModal } from "@/components/AchievementModal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport = {
  themeColor: "#F59E0B",
};

export const metadata: Metadata = {
  title: "Script Forge - Learn JavaScript and TypeScript by doing",
  description: "Mobile first, explanatory lessons for JavaScript and TypeScript. Inspired by boot.dev and freeCodeCamp, built for learning on your phone.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Script Forge", statusBarStyle: "black-translucent" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <ScrollProgress />
        <AuthProvider>
          <ProgressProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <ToastStack />
          <AchievementModal />
          <BottomNav />
          <ServiceWorkerRegister />
          <footer className="border-t px-4 py-8 text-center text-xs leading-5 text-[var(--text-faint)] md:py-10" style={{ borderColor: "var(--border)" }}>
            <p>Script Forge. Learn JavaScript and TypeScript by doing. Built for mobile first learning.</p>
            <p className="mt-1">Curriculum inspired by boot.dev and freeCodeCamp. Content is original and explanatory.</p>
          </footer>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
