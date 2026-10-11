"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Library, GraduationCap, Hammer } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/modules/js-foundations", label: "Modules", icon: Library },
  { href: "/learn/m1l1", label: "Learn", icon: GraduationCap },
  { href: "/projects", label: "Projects", icon: Hammer },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-[var(--bg)] pb-[env(safe-area-inset-bottom)] md:hidden" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto grid max-w-[500px] grid-cols-4">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex flex-col items-center gap-1 py-3 text-[10px] font-medium tracking-wide ${active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}
            >
              <it.icon size={18} strokeWidth={active ? 2.2 : 1.7} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}