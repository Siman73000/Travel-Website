"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { locations } from "@/src/data/locations";
import { withBasePath } from "@/src/lib/basePath";
import { photosForSlug } from "@/src/data/photoManifest";
import { Reveal } from "@/src/components/Reveal";
import { RegionChip } from "@/src/components/RegionChip";
import { TiltCard } from "@/src/components/TiltCard";
import { useMotionPrefs } from "@/src/components/motion";

export default function HomePage() {
  const { reduce, ease } = useMotionPrefs();

  return (
    <main className="min-h-[calc(100vh-72px)]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <Reveal>
          <div className="glass rounded-[28px] p-7 md:p-10 soft-shadow border-aurora ring-aurora">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm tracking-wide text-zinc-200/80">Travel log</p>

                <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
                  Your adventures,
                  <span className="block text-aurora animate-gradientShift" style={{ backgroundSize: "200% 200%" }}>
                    vividly archived.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-zinc-100/85">
                  A vibrant travel journal with glowing colors, smooth motion, and photo galleries.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/locations"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500/45 via-sky-500/35 to-emerald-500/35 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-white/20"
                  >
                    Browse locations
                  </Link>
</div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-200/80">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Locations: <span className="text-zinc-100">{locations.length}</span>
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Effects: <span className="text-zinc-100">aurora • sparkles • spotlight</span>
                  </span>
                </div>
              </div>
</div>
          </div>
        </Reveal>

        <motion.div
          className="mt-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.05 } },
          }}
        >
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-100">Featured</h2>
            <Link href="/locations" className="text-sm text-zinc-100/80 hover:text-zinc-100">
              View all →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.slice(0, 6).map((l) => (
              <motion.div
                key={l.slug}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.68, ease } },
                }}
                layout
              >
                <Link href={`/locations/${l.slug}`} className="block">
                  <TiltCard className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{l.name}</div>
                        <div className="text-sm text-zinc-100/80">
                          {l.country} • {l.dateRange}
                        </div>
                      </div>
                      <RegionChip region={l.region} />
                    </div>

                    <p className="mt-3 text-sm text-zinc-100/85">{l.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {l.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-100"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 text-xs text-zinc-200/70">
                      Open location <span className="transition group-hover:translate-x-0.5 inline-block">→</span>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-200/70">
        © {new Date().getFullYear()} • Your Name • Built with Next.js + Tailwind
      </footer>
    </main>
  );
}
