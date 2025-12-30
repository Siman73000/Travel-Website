"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gallery } from "@/src/components/Gallery";
import { photosForSlug } from "@/src/data/photoManifest";
import type { LocationEntry } from "@/src/data/locations";
import { useMotionPrefs } from "@/src/components/motion";

export function LocationDetailClient({ loc }: { loc: LocationEntry }) {
  const { reduce, ease } = useMotionPrefs();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-5 sm:py-6 pb-10">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/locations"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:border-white/20"
        >
          ← All locations
        </Link>
        <Link href="/" className="text-sm text-zinc-200/85 hover:text-zinc-100">
          Home
        </Link>
      </div>

      <motion.div
        className="mt-6 glass rounded-3xl p-6 md:p-8 soft-shadow border-aurora ring-aurora"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.99 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.62, ease }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-aurora animate-gradientShift" style={{ backgroundSize: "200% 200%" }}>
              {loc.name}
            </h1>
            <p className="mt-1 text-zinc-100/85">
              {loc.country} • {loc.region} • {loc.dateRange}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-gradient-to-r from-fuchsia-500/40 via-sky-500/30 to-emerald-500/30 px-3 py-1 text-xs text-zinc-100">
            {loc.slug}
          </span>
        </div>

        <p className="mt-5 text-zinc-100/85">{loc.summary}</p>

        <div className="mt-7">
          <h2 className="text-sm font-semibold text-zinc-100">Highlights</h2>
          <motion.ul
            className="mt-3 space-y-2 text-sm text-zinc-100/85"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.08 } },
            }}
          >
            {loc.highlights.map((h) => (
              <motion.li
                key={h}
                className="flex gap-2"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.48, ease } },
                }}
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-300 to-sky-300" />
                <span>{h}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Gallery slug={loc.slug} photos={photosForSlug(loc.slug)} />
      </motion.div>
    </div>
  );
}
