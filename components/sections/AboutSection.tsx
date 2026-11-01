'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Cpu, Globe } from 'lucide-react';
import { STATS, REGIONS } from '@/lib/constants';
import Counter from '@/components/ui/Counter';
import TextScrub from '@/components/ui/TextScrub';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" data-shot="about" ref={ref} className="shot-scrim relative min-h-[130svh] flex flex-col justify-center py-28 lg:py-36 z-10 overflow-hidden bg-transparent text-fg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1fr,1.3fr] gap-10 lg:gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span className="hud-label text-accent font-bold">CORPORATE FOUNDATIONS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-fg tracking-tight leading-[1.1]">
              Engineered with{' '}
              <em className="font-serif italic font-normal text-accent-soft">
                Discipline
              </em>
              .
              <br />
              Delivered at Scale.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Scroll-Linked Text Illumination */}
            <TextScrub
              text="Headquartered at 20th Floor, Aspect Tower, Executive Towers Cluster, Business Bay, Dubai, AASA CP Holding operates across eight integrated business divisions. From high-voltage power matrices and mega structural steel fabrication to airport hangars and skilled engineering mobilization, our delivery forms the permanent physical backbone of regional development."
              className="text-base sm:text-lg text-muted font-medium"
            />
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-accent-soft font-semibold pt-2">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" />
                ISO 9001 / 14001 / 45001 CERTIFIED
              </span>
              <span className="flex items-center gap-2">
                <Cpu size={16} className="text-accent" />
                3D BIM & SMART AUTOMATION
              </span>
            </div>
          </motion.div>
        </div>

        {/* The group's numbers on a hairline strip over the Business Bay shot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-fg/20 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`pt-6 pr-4 ${i % 2 ? 'border-l border-fg/20 pl-5 lg:pl-8' : i ? 'lg:border-l lg:border-fg/20 lg:pl-8' : ''}`}
            >
              <div className="font-display text-5xl sm:text-7xl font-black text-fg tracking-tight">
                <Counter value={stat.value} />
              </div>
              <div className="mt-2 text-sm font-semibold text-fg/90">{stat.label}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-fg/55 mt-1">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Transnational GCC Regional Network Footprint */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-fg/15 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgb(var(--shadow)/0.5)] bg-surface/75"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={18} className="text-accent" />
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                TRANSNATIONAL GCC FOOTPRINT
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-fg tracking-tight mb-3">
              Operating Across 4 Sovereign GCC & Asian Markets
            </h3>
            <p className="text-sm text-muted leading-relaxed font-normal">
              Deploying multi-disciplinary engineering hubs in Dubai (Global HQ), Abu Dhabi, Riyadh (Saudi Arabia),
              Doha (Qatar), and Mumbai (India) — delivering mega-initiatives on time, within tolerances, and with zero safety compromises.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-start lg:justify-end">
            {REGIONS.map((r) => (
              <div
                key={r.name}
                className="px-4 py-3 rounded-xl bg-fg/[0.05] border border-fg/10 hover:border-cyan-400/50 transition-all flex items-center gap-3 text-xs font-bold text-fg shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                <span>{r.name}</span>
                <span className="font-mono text-[10px] text-accent-soft font-semibold">
                  [{r.projects}+ Megaprojects]
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
