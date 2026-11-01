'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Counter from '@/components/ui/Counter';
import { BUSINESS_UNITS, COMPANY, STATS } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1] as const;
const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

/**
 * Home hero: copy set into the first shot of the city (Downtown Dubai at night). The section is a
 * little taller than the screen so the camera has room to dolly in before the next shot.
 */
export default function HomeHero() {
  const [lead, last] = [COMPANY.tagline.split(' ').slice(0, -1).join(' '), COMPANY.tagline.split(' ').slice(-1)[0]];

  return (
    <section id="hero" data-shot="hero" className="force-dark relative min-h-[125svh] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]"
        style={{
          background:
            'linear-gradient(90deg, rgb(2 8 23 / 0.65) 0%, rgb(2 8 23 / 0.2) 50%, transparent 75%), linear-gradient(0deg, rgb(2 8 23 / 0.75) 0%, transparent 40%)',
        }}
      />
      <div className="relative h-[100svh] min-h-[640px] flex flex-col justify-end pt-32 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-px w-14 bg-sky-300" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/80">
              {COMPANY.name} · {COMPANY.hq.city}
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[13vw] sm:text-7xl lg:text-[6.8rem] xl:text-[7.8rem] max-w-6xl">
            {lead.split(' ').map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.08, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
              <motion.em
                className="inline-block font-serif italic font-normal text-sky-300"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.75, ease: EASE }}
              >
                {last}
              </motion.em>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="mt-8"
          >
            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">{COMPANY.heroSubline}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <button onClick={() => scrollTo('#divisions')} className="btn-primary" data-cursor="EXPLORE">
                <span>Explore {BUSINESS_UNITS.length} Business Units</span>
                <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-ghost" data-cursor="PROPOSAL">
                Request Proposal
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-white/25"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className={`pt-5 pr-4 ${i % 2 ? 'border-l border-white/25 pl-4 lg:pl-6' : i ? 'lg:border-l lg:border-white/25 lg:pl-6' : ''}`}>
                <div className="font-display text-3xl sm:text-4xl font-black tracking-tight">
                  <Counter value={s.value} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white/90 mt-1">{s.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/55 mt-0.5">{s.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
