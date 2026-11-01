'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Building2 } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Mega projects as full-screen chapters: each one's footage fills the city backdrop
 * (data-shot="project-<id>", played only while on screen) and the story panel alternates sides.
 * Only the project facts on record are shown; the footage is labelled illustrative.
 */
export default function ProjectsChapters() {
  return (
    <section id="projects" className="force-dark relative text-white">
      {PROJECTS.map((p, i) => {
        const right = i % 2 === 1;
        return (
          <div key={p.id} data-shot={`project-${p.id}`} className="relative min-h-[120svh] flex flex-col justify-center py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
              {i === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="mb-14"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="h-px w-14 bg-sky-300" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">Mega Projects</span>
                  </div>
                  <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.04] drop-shadow-[0_4px_30px_rgba(2,8,23,0.6)]">
                    Megaproject Delivery. <em className="font-serif italic font-normal text-sky-300">Generational Scale.</em>
                  </h2>
                </motion.div>
              )}

              <div className={`flex ${right ? 'lg:justify-end' : ''}`}>
                <motion.article
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="max-w-xl glass-panel rounded-[28px] p-8 sm:p-10"
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
                    <span>{p.category}</span>
                    <span className="text-white/45">Illustrative footage</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">{p.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
                    <span className="flex items-center gap-2"><Building2 size={15} className="text-sky-300" />{p.client}</span>
                    <span className="flex items-center gap-2"><MapPin size={15} className="text-sky-300" />{p.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={15} className="text-sky-300" />{p.date}</span>
                  </div>
                  <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/85">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8" data-cursor="OPEN">
                    <span>Explore Project</span>
                    <ArrowUpRight size={15} />
                  </a>
                </motion.article>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
