'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { FILM_FOR_SHOT, filmSources } from '@/lib/films';
import { readAnchors, type Anchor } from '@/components/world/timeline';

const signalWorldReady = () => {
  (window as unknown as { __aasaWorldReady?: boolean }).__aasaWorldReady = true;
  window.dispatchEvent(new Event('aasa:world-ready'));
};

/**
 * The film behind the home page. Every section (data-shot anchor) has its own real clip; the clip
 * never plays on its own: its playhead follows the scroll through that section, so the visitor
 * drives the camera. Moving between sections is a clean editorial dissolve. The pointer reframes
 * the shot slightly, like an operator adjusting the frame.
 */
export default function ScrollFilm() {
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const videos = useRef<Record<number, HTMLVideoElement | null>>({});
  const frame = useRef<HTMLDivElement>(null);
  const live = useRef({ anchors: [] as Anchor[], active: 0, t: {} as Record<number, number> });

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches);
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const a = readAnchors();
        live.current.anchors = a;
        setAnchors(a);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const t = setTimeout(signalWorldReady, 1500);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  // Scroll drives the playhead; the pointer drives the framing
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const move = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced) window.addEventListener('pointermove', move, { passive: true });

    let raf = 0;
    const tick = () => {
      const L = live.current;
      const a = L.anchors;
      if (a.length) {
        const c = window.scrollY + window.innerHeight * 0.5;
        let i = 0;
        while (i + 1 < a.length && a[i + 1].top <= c) i++;
        if (i !== L.active) {
          L.active = i;
          setActive(i);
        }
        // Playhead: progress through the section → time in its clip (eased toward the target)
        const local = Math.min(1, Math.max(0, (c - a[i].top) / a[i].height));
        const v = videos.current[i];
        if (v && v.duration) {
          const target = local * (v.duration - 0.05);
          const cur = L.t[i] ?? target;
          const next = cur + (target - cur) * 0.2;
          L.t[i] = next;
          if (!v.seeking && Math.abs(v.currentTime - next) > 1 / 60) v.currentTime = next;
        }
        // Neighbours wait on the frame they will open on, so each cut lands on the right image
        for (const k of [i - 1, i + 1]) {
          const n = videos.current[k];
          if (n && n.duration && !n.seeking) {
            const want = k < i ? n.duration - 0.05 : 0;
            if (Math.abs(n.currentTime - want) > 0.05) n.currentTime = want;
          }
        }
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020817]">
      {/* Oversized by 4% so the pointer reframing never shows an edge */}
      <div ref={frame} className="absolute -inset-[4%] will-change-transform">
        {anchors.map((an, i) => {
          const name = FILM_FOR_SHOT[an.id];
          if (!name) return null;
          const src = filmSources(name);
          const near = Math.abs(i - active) <= 1;
          return (
            <div
              key={`${an.id}-${i}`}
              className="absolute inset-0 transition-opacity duration-[650ms] ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <img src={src.poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading={i < 2 ? 'eager' : 'lazy'} />
              {near && (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={mobile ? src.mobile : src.desktop}
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  // Some mobile browsers only paint seeks after one play(); prime it, then hold
                  onLoadedData={(e) => {
                    const v = e.currentTarget;
                    v.play()
                      .then(() => v.pause())
                      .catch(() => {});
                    if (i === 0) signalWorldReady();
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
      {/* A light dark tint only, so the footage stays clear and white copy reads */}
      <div className="absolute inset-0 bg-[#020817]/20" />
    </div>
  );
}
