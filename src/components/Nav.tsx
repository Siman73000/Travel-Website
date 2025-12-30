"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMotionPrefs } from "@/src/components/motion";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const { reduce } = useMotionPrefs();
  const active = pathname?.startsWith("/locations") ? "/locations" : "/";

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/55 backdrop-blur pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <span className="absolute inset-0 opacity-60 bg-gradient-to-br from-fuchsia-500/35 via-sky-500/25 to-emerald-500/25 animate-gradientShift" style={{ backgroundSize: "200% 200%" }} />
            <span className="relative">✦</span>
          </span>
          <span className="text-sm font-semibold tracking-wide">
            <span className="text-aurora animate-gradientShift" style={{ backgroundSize: "200% 200%" }}>Wanderlog</span>
            <span className="ml-2 hidden text-xs font-normal text-zinc-300/80 sm:inline">adventures</span>
          </span>
        </Link>

        <div className="relative flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
          {tabs.map((t) => {
            const isActive = active === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="relative rounded-xl px-3 py-2 text-sm text-zinc-200/90 hover:text-zinc-100"
              >
                {!reduce && isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/40 via-sky-500/32 to-emerald-500/30"
                    transition={{ type: "spring", stiffness: 460, damping: 34 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
