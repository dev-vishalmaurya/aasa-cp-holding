'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_UNITS } from '@/lib/constants';
import { UNIT_CONTENT } from '@/lib/units';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The eight business units as chapters of the city journey. Each chapter is its own shot
 * (data-shot="unit-<slug>"): the camera cuts to that unit's real-world scene as the copy arrives.
 */
export default function DivisionsChapters() {
  return (
    <section id="divisions" className="force-dark relative text-white">
      {/* Chapter opener over the aerial Downtown shot */}
      <div data-shot="divisions" className="relative min-h-[110svh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-14 bg-sky-300" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">Business Units</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tight leading-[1.02] drop-shadow-[0_4px_30px_rgba(2,8,23,0.6)]">
              Eight Pillars of <em className="font-serif italic font-normal text-sky-300">Industrial Scale.</em>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/85 max-w-xl">
              Integrated delivery spanning high-voltage power transmission, precision structural steel fabrication, heavy transit
              civil works, and certified engineering mobilization.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {BUSINESS_UNITS.map((u) => (
                <a
                  key={u.slug}
                  href={`#unit-${u.slug}`}
                  className="rounded-full border border-white/25 bg-[#020817]/35 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition hover:border-sky-300/70 hover:bg-[#020817]/60"
                >
                  {u.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {BUSINESS_UNITS.map((u, i) => {
        const c = UNIT_CONTENT[u.slug];
        const right = i % 2 === 1;
        return (
          <div
            key={u.slug}
            id={`unit-${u.slug}`}
            data-shot={`unit-${u.slug}`}
            className="relative min-h-[120svh] flex items-center py-24"
          >
            <div className={`max-w-7xl mx-auto px-6 lg:px-12 w-full flex ${right ? 'lg:justify-end' : ''}`}>
              <motion.article
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1, ease: EASE }}
                className="relative max-w-xl glass-panel rounded-[28px] p-8 sm:p-10"
              >
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                  <span className="h-px w-10" style={{ backgroundColor: u.color }} />
                  {u.sector}
                </div>
                <h3 className="mt-4 font-display text-4xl sm:text-5xl font-black tracking-tight">{u.name}</h3>
                <p className="mt-3 text-lg font-semibold text-white/90">{c.tagline}</p>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 line-clamp-4">{c.heroText}</p>
                {c.services.length > 0 && (
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {c.services.slice(0, 4).map((s) => (
                      <li key={s.title} className="flex items-start gap-2 text-sm text-white/85">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sky-300" />
                        <span>{s.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {c.stats.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
                    {c.stats.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-2xl font-black">{s.value}</div>
                        <div className="text-[11px] leading-tight text-white/60">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href={`/business-units/${u.slug}`} className="btn-primary mt-8" data-cursor="OPEN">
                  <span>Explore {u.name}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </motion.article>
            </div>
          </div>
        );
      })}
    </section>
  );
}
