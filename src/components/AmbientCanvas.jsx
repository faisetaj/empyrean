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

    const drawStrands = (t) => {
      const count = width < 640 ? 7 : 11;
      ctx.lineWidth = 1;
      for (let i = 0; i < count; i++) {
        const p = (i + 0.5) / count;
        const baseY = p * height;
        const amp = height * 0.055 * (0.6 + 0.4 * Math.sin(i * 1.7));
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y =
            baseY +
            amp * Math.sin(x * 0.0055 + t * 0.00022 + i * 0.9) +
            amp * 0.45 * Math.sin(x * 0.0121 - t * 0.00034 + i * 1.6);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(20,23,30,${0.05 + 0.03 * Math.sin(i * 2.1)})`;
        ctx.stroke();
      }
    };

    const drawVeil = (t) => {
      const blooms = [
        { fx: 0.24, fy: 0.3, r: 0.42, sx: 0.00013, sy: 0.00019 },
        { fx: 0.72, fy: 0.62, r: 0.5, sx: -0.00017, sy: 0.00011 },
        { fx: 0.5, fy: 0.18, r: 0.34, sx: 0.00021, sy: -0.00015 },
      ];
      const base = Math.max(width, height);
      blooms.forEach((b, i) => {
        const cx = width * (b.fx + 0.07 * Math.sin(t * b.sx + i));
        const cy = height * (b.fy + 0.09 * Math.cos(t * b.sy + i * 1.4));
        const r = base * b.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(20,23,30,0.045)');
        g.addColorStop(0.6, 'rgba(20,23,30,0.014)');
        g.addColorStop(1, 'rgba(20,23,30,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const drawDust = (t) => {
      const count = width < 640 ? 26 : 52;
      for (let i = 0; i < count; i++) {
        // Deterministic pseudo-random placement so motes don't jump on resize.
        const seed = i * 127.1;
        const fx = (Math.sin(seed) * 0.5 + 0.5);
        const fy = (Math.cos(seed * 1.7) * 0.5 + 0.5);
        const drift = 0.045 * Math.sin(t * 0.00018 + i * 0.8);
        const bob = 0.06 * Math.cos(t * 0.00013 + i * 1.3);
        const x = width * (fx + drift);
        const y = height * (fy + bob);
        const r = 0.8 + 1.5 * ((Math.sin(seed * 3.3) * 0.5 + 0.5));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,23,30,${0.05 + 0.05 * (Math.sin(seed * 2.2) * 0.5 + 0.5)})`;
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
