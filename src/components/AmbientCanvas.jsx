import { useEffect, useRef } from 'react';

/**
 * Very low-contrast procedural background motion, drawn on a canvas.
 *
 * Three motifs, so consecutive sections don't share the same backdrop:
 *   strands — slow flowing lines, echoing hair
 *   veil    — drifting soft blooms, like light through fabric
 *   dust    — sparse floating motes
 *
 * Deliberately near-invisible: this is texture, not decoration you look at.
 * Pauses when scrolled out of view and renders a single static frame when the
 * visitor has asked for reduced motion.
 */
export default function AmbientCanvas({ motif = 'strands', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let raf = null;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR at 2 — beyond that the extra pixels cost far more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /**
     * Whiplash tresses — vertical strands that sway and curl at the tip, so
     * the background of a hair salon reads as hair rather than generic waves.
     *
     * Adapted from Forever Components "Wave Tress" (Art Nouveau). The original
     * is gold/sage/rose on dark green and its own metadata warns it is unsuited
     * to light backgrounds; only the strand geometry is kept. The palette is
     * charcoal on the page's white, and the floral blossoms are dropped — they
     * fight the restraint of the rest of the site.
     */
    const drawStrands = (t) => {
      const time = t / 1000;
      const count = width < 640 ? 6 : 9;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < count; i++) {
        const s = {
          x: 0.1 + 0.82 * (i / Math.max(1, count - 1)),
          amp: 0.05 + 0.085 * (((i * 7) % 5) / 4),
          curl: 1.1 + 1.6 * (((i * 3) % 5) / 4),
          ph: i * 0.83,
          sp: 0.45 + 0.5 * (((i * 5) % 4) / 3),
        };

        const bx = s.x * width;
        const top = -0.06 * height;
        const span = 1.12 * height;
        const sway = s.amp * width;
        const drift = Math.sin(time * s.sp + s.ph) * 0.5 + 0.5;

        // Three offset passes give the strand a faint sheen, the way the
        // original suggests hair. Kept far lighter here — this sits behind
        // body copy and must never compete with it.
        const passes = [
          { off: -3, w: 1.0, a: 0.035 },
          { off: 0, w: 2.2, a: 0.075 },
          { off: 3, w: 1.3, a: 0.03 },
        ];

        for (const pass of passes) {
          ctx.beginPath();
          ctx.lineWidth = pass.w;
          ctx.strokeStyle = `rgba(20,23,30,${pass.a})`;

          const steps = 30;
          for (let j = 0; j <= steps; j++) {
            const u = j / steps;
            const y = top + u * span;
            const swell = Math.sin(u * Math.PI); // fullest through the middle
            const wave = Math.sin(u * s.curl * Math.PI * 2 + time * 0.9 + s.ph);
            const tip = Math.pow(u, 2.2) * Math.sin(time * 0.7 + s.ph) * 0.5;
            const x =
              bx + sway * (wave * swell + tip) + (drift - 0.5) * sway * 0.6 + pass.off * swell;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };

    /**
     * Drifting folds, like light across draped silk.
     *
     * This was a stack of soft radial gradients, which measured at 99%
     * coverage and was still invisible — a near-uniform wash has no edges for
     * the eye to catch. Drawn as contour lines instead: broad, slow and
     * horizontal, so it reads as fabric and stays distinct from the vertical
     * tresses.
     */
    const drawVeil = (t) => {
      const time = t / 1000;
      const count = width < 640 ? 5 : 7;

      ctx.lineCap = 'round';

      for (let i = 0; i < count; i++) {
        const p = (i + 0.5) / count;
        const baseY = p * height;
        const amp = height * 0.13 * (0.55 + 0.45 * Math.sin(i * 1.3));

        // Paired strokes a few pixels apart give each fold a soft edge
        // instead of a single hard hairline.
        for (const [off, w, a] of [
          [-2.5, 1.6, 0.05],
          [0, 2.6, 0.1],
          [2.5, 1.6, 0.045],
        ]) {
          ctx.beginPath();
          ctx.lineWidth = w;
          ctx.strokeStyle = `rgba(20,23,30,${a})`;
          for (let x = 0; x <= width; x += 12) {
            const u = x / Math.max(1, width);
            const y =
              baseY +
              off +
              amp * Math.sin(u * Math.PI * 1.4 + time * 0.16 + i * 0.9) +
              amp * 0.35 * Math.sin(u * Math.PI * 2.7 - time * 0.11 + i * 1.7);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };

    /**
     * Motes suspended in light.
     *
     * The first pass drew ~30 sub-pixel specks and measured 0.1% coverage —
     * technically painting, effectively invisible. Roughly three times as
     * many, several times larger, each with a soft halo so it reads at a
     * glance rather than only under inspection.
     */
    const drawDust = (t) => {
      const count = width < 640 ? 70 : 130;

      for (let i = 0; i < count; i++) {
        // Deterministic pseudo-random placement so motes don't jump on resize.
        const seed = i * 127.1;
        const fx = Math.sin(seed) * 0.5 + 0.5;
        const fy = Math.cos(seed * 1.7) * 0.5 + 0.5;
        const drift = 0.05 * Math.sin(t * 0.00018 + i * 0.8);
        const bob = 0.07 * Math.cos(t * 0.00013 + i * 1.3);
        const x = width * (fx + drift);
        const y = height * (fy + bob);
        const size = Math.sin(seed * 3.3) * 0.5 + 0.5;
        const r = 1.6 + 3.4 * size;
        const a = 0.07 + 0.09 * (Math.sin(seed * 2.2) * 0.5 + 0.5);

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(20,23,30,${a})`);
        g.addColorStop(0.55, `rgba(20,23,30,${a * 0.5})`);
        g.addColorStop(1, 'rgba(20,23,30,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = (t) => {
      ctx.clearRect(0, 0, width, height);
      if (motif === 'veil') drawVeil(t);
      else if (motif === 'dust') drawDust(t);
      else drawStrands(t);
    };

    const loop = (t) => {
      if (visible) render(t);
      raf = requestAnimationFrame(loop);
    };

    setSize();

    if (reduced) {
      render(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      setSize();
      if (reduced) render(0);
    };
    window.addEventListener('resize', onResize);

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: '120px' }
      );
      observer.observe(canvas);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
    };
  }, [motif]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
