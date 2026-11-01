// Maps the page scroll to the city's shots. Every element with data-shot="<id>" is an anchor; the
// viewport centre decides which shot is on screen and how far through it we are. Around each anchor
// boundary the outgoing and incoming shots cross-fade. No three.js here: the page chunk stays light.

export type Anchor = { id: string; top: number; height: number };

export type ShotState = {
  /** index into anchors of the shot underneath */
  a: number;
  /** index of the incoming shot during a transition, or -1 */
  b: number;
  /** cross-fade 0..1 toward b */
  mix: number;
  /** progress through shot a and shot b (0..1) */
  la: number;
  lb: number;
};

export function readAnchors(): Anchor[] {
  const y = window.scrollY;
  return Array.from(document.querySelectorAll<HTMLElement>('[data-shot]')).map((el) => {
    const r = el.getBoundingClientRect();
    return { id: el.dataset.shot!, top: r.top + y, height: Math.max(1, r.height) };
  });
}

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export function shotState(anchors: Anchor[], scrollY: number, vh: number): ShotState {
  const n = anchors.length;
  if (!n) return { a: 0, b: -1, mix: 0, la: 0, lb: 0 };
  const c = scrollY + vh * 0.5;
  let i = 0;
  while (i + 1 < n && anchors[i + 1].top <= c) i++;
  const local = (k: number) => Math.min(1, Math.max(0, (c - anchors[k].top) / anchors[k].height));
  const T = vh * 0.3;

  // Approaching the next anchor
  if (i + 1 < n && c > anchors[i + 1].top - T) {
    return { a: i, b: i + 1, mix: smooth(anchors[i + 1].top - T, anchors[i + 1].top + T, c), la: local(i), lb: 0 };
  }
  // Just past the current anchor: finish the fade from the previous shot
  if (i > 0 && c < anchors[i].top + T) {
    return { a: i - 1, b: i, mix: smooth(anchors[i].top - T, anchors[i].top + T, c), la: 1, lb: local(i) };
  }
  return { a: i, b: -1, mix: 0, la: local(i), lb: 0 };
}
