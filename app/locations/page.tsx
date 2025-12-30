"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { locations } from "@/src/data/locations";
  import { withBasePath } from "@/src/lib/basePath";
  import { photosForSlug } from "@/src/data/photoManifest";
import { RegionChip } from "@/src/components/RegionChip";
import { TiltCard } from "@/src/components/TiltCard";
import { useMotionPrefs } from "@/src/components/motion";

const regions = [
  "All",
  "North America",
  "Central America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Oceania",
] as const;

export default function LocationsPage() {
  const { reduce, ease } = useMotionPrefs();
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations
      .filter((l) => (region === "All" ? true : l.region === region))
      .filter((l) => {
        if (!q) return true;
        return (
          l.name.toLowerCase().includes(q) ||
          l.country.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.highlights.some((h) => h.toLowerCase().includes(q))
        );
      });
  }, [region, query]);

  return (
    <main className="min-h-[calc(100svh-72px)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-10">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: compact header + controls (sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="glass rounded-3xl p-5 md:p-6 soft-shadow border-aurora ring-aurora">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-wide text-zinc-200/80">Wanderlog</p>
                  <h1
                    className="mt-2 text-2xl font-semibold text-aurora animate-gradientShift"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Locations
                  </h1>
                </div>
                <Link href="/" className="text-sm text-zinc-100/80 hover:text-zinc-100">
                  Home
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city, country, highlight…"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-100/45 focus:border-white/20"
                />

                <div className="flex items-center gap-3">
                  <label className="text-xs text-zinc-100/70">Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as (typeof regions)[number])}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/20"
                  >
                    {regions.map((r) => (
                      <option key={r} value={r} className="bg-zinc-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-xs text-zinc-100/70">
                  Add/edit places in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-100">src/data/locations.ts</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Right: results (visible immediately without scrolling) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 1, y: 10, filter: "blur(10px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={reduce ? { duration: 0 } : { duration: 0.55, ease }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-zinc-100/70">Showing</span>
                  <span className="text-xs font-semibold text-zinc-100">{filtered.length}</span>
                </div>

                {region !== "All" && (
                  <div className="flex items-center gap-2">
                    <RegionChip region={region as any} />
                    <button
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-100/85 hover:border-white/20"
                      onClick={() => setRegion("All")}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <LayoutGroup>
                <motion.div
                  className="mt-4 grid gap-4 sm:grid-cols-2"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.03 } },
                  }}
                >
                  <AnimatePresence>
                    {filtered.map((l) => (
                      <motion.div
                        key={l.slug}
                        layout
                        initial={reduce ? { opacity: 1 } : { opacity: 1, y: 14, scale: 0.995, filter: "blur(8px)" }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.99 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease }}
                      >
                        <Link href={`/locations/${l.slug}`} scroll className="block">
                          <TiltCard>
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-lg font-semibold text-zinc-100">{l.name}</h3>
                                <p className="mt-1 text-sm text-zinc-100/75">
                                  {l.country} • {l.dateRange}
                                </p>
                              </div>
                              <RegionChip region={l.region as any} />
                            </div>

                            <p className="mt-4 text-sm text-zinc-100/85">{l.summary}</p>

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
                              Open location{" "}
                              <span className="transition group-hover:translate-x-0.5 inline-block">→</span>
                            </div>
                          </TiltCard>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>

              {filtered.length === 0 && (
                <motion.div
                  className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-100/85 soft-shadow border-aurora ring-aurora"
                  initial={reduce ? { opacity: 1 } : { opacity: 1, y: 10, filter: "blur(10px)" }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}
                >
                  No matches. Try a different search or filter.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
