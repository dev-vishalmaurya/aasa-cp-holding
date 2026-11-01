'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { filmSources } from '@/lib/films';

/**
 * A section's own film (e.g. a unit page hero): the clip's playhead follows the scroll through the
 * section — it never plays by itself — and the pointer reframes the shot slightly.
 * Place as the first child of a `relative overflow-hidden` section.
 */
export default function SectionFilm({ name, alt }: { name: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mobile, setMobile] = useState(false);
  const src = filmSources(name);

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const move = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced) window.addEventListener('pointermove', move, { passive: true });
    let t = -1;
    let raf = 0;
    const tick = () => {
      const el = wrap.current;
      const v = video.current;
      if (el && v && v.duration) {
        const r = el.getBoundingClientRect();
        // From the top of the page to the section leaving the screen
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.9)));
        const target = 0.15 + p * (v.duration - 0.2);
        t = t < 0 ? target : t + (target - t) * 0.2;
        if (!v.seeking && Math.abs(v.currentTime - t) > 1 / 60) v.currentTime = t;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      if (frame.current) frame.current.style.transform = `translate3d(${-pointer.x * 1.6}%, ${-pointer.y * 1.1}%, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="force-dark pointer-events-none absolute inset-0 overflow-hidden bg-[#020817]">
      <div ref={frame} className="absolute -inset-[4%] will-change-transform">
        <img src={src.poster} alt={alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <video
          ref={video}
          src={mobile ? src.mobile : src.desktop}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.play()
              .then(() => v.pause())
              .catch(() => {});
            (window as unknown as { __aasaWorldReady?: boolean }).__aasaWorldReady = true;
            window.dispatchEvent(new Event('aasa:world-ready'));
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
