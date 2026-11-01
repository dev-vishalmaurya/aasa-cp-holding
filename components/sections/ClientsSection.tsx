'use client';

/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// The client logos shown under "Some of Our Clients" on aasa.ae (copied locally to /public/clients)
const LOGOS: [file: string, name: string][] = [
  ['abb-logo', 'ABB'],
  ['abu-dhabi-ports-logo-2', 'AD Ports Group'],
  ['ajman-police-logo', 'Ajman Police'],
  ['al-futtaim-logo', 'Al-Futtaim'],
  ['alec-logo', 'ALEC'],
  ['aqaar-logo-1', 'Aqaar'],
  ['arena-a-modon-company-logo-white-custom', 'Arena – A Modon Company'],
  ['armani-hotel-dubai-2', 'Armani Hotel Dubai'],
  ['asgc-logo', 'ASGC'],
  ['besix-1', 'BESIX'],
  ['danube-properties', 'Danube Properties'],
  ['dewa-logo-1', 'DEWA'],
  ['diamond-developers-logo-2', 'Diamond Developers'],
  ['du-logo-1', 'du'],
  ['dubai-airports-logo', 'Dubai Airports'],
  ['dubai-developments-logo-2', 'Dubai Developments'],
  ['dubai-police-logo', 'Dubai Police'],
  ['dwmc', 'Dubai Waste Management Company'],
  ['emaar-word-mark-en', 'Emaar'],
  ['emirates-logo', 'Emirates'],
  ['emrill-1', 'Emrill'],
  ['etisalat-eand-logo-en', 'Etisalat by e&'],
  ['expo2020-dubai', 'Expo 2020 Dubai'],
  ['general-electric-logo', 'General Electric'],
  ['hare-logo', 'HARE'],
  ['hilton-logo', 'Hilton'],
  ['hitachi-logo', 'Hitachi'],
  ['hyundai-engineering-construction-logo', 'Hyundai Engineering & Construction'],
  ['jumeirah-group-1', 'Jumeirah'],
  ['larsen-toubro-logo', 'Larsen & Toubro'],
  ['meraas', 'Meraas'],
  ['ministry-of-housing-and-urban-developments-india-logo', 'Ministry of Housing and Urban Affairs, India'],
  ['nakheel-logo', 'Nakheel'],
  ['national-bonds-logo', 'National Bonds'],
  ['nbcc-logo', 'NBCC'],
  ['nec-1', 'NEC'],
  ['palfinger-marine-logo-1', 'Palfinger Marine'],
  ['port-of-fujirah-logo', 'Port of Fujairah'],
  ['rimond-logo-black', 'Rimond'],
  ['saipem-logo-svg', 'Saipem'],
  ['samsung-engineering3687-logowik', 'Samsung Engineering'],
  ['siemens-ag-logo-1', 'Siemens'],
  ['sobha-master-logo-hi-res', 'Sobha Realty'],
  ['wasl', 'wasl'],
];

const ROWS = [LOGOS.filter((_, i) => i % 2 === 0), LOGOS.filter((_, i) => i % 2 === 1)];

/** "Some of Our Clients": the logo wall from aasa.ae, as two counter-moving rows over the city. */
export default function ClientsSection() {
  return (
    <section id="clients" data-shot="clients" className="shot-scrim relative min-h-[100svh] flex flex-col justify-center py-24 lg:py-32 overflow-hidden text-fg">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 mb-12 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.05]"
        >
          Some of Our <em className="font-serif italic font-normal text-accent-soft">Clients</em>
        </motion.h2>
      </div>

      <div className="relative z-10 space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {ROWS.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <ul
              className="flex w-max shrink-0 animate-marquee gap-4 pr-4 hover:[animation-play-state:paused]"
              style={{ animationDirection: r ? 'reverse' : 'normal', animationDuration: `${row.length * 3.4}s` }}
            >
              {[...row, ...row].map(([file, name], i) => (
                <li
                  key={i}
                  aria-hidden={i >= row.length}
                  className="flex h-24 w-52 sm:h-28 sm:w-60 shrink-0 items-center justify-center rounded-2xl bg-white px-5 shadow-[0_12px_30px_rgba(2,8,23,0.25)] ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-1"
                >
                  <img src={`/clients/${file}.webp`} alt={i < row.length ? name : ''} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
