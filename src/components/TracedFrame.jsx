import { useEffect, useRef, useState } from 'react';

/**
 * An offset frame that draws itself when it scrolls into view.
 *
 * The self-drawing effect is the stroke-dasharray / stroke-dashoffset trace
 * from Forever Components "Border Flourish". Only the technique carries over —
 * that component's Art Nouveau ornament (blossoms, petals, leaves, stained
 * glass) is built for dark period display cards and read as clutter against
 * this site's restraint. Corner tendrils were tried and cut for the same
 * reason: at this scale they looked like artefacts rather than ornament.
 *
 * Wraps an image (or anything) and sits behind it.
 */
export default function TracedFrame({ children, className = '' }) {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [perimeter, setPerimeter] = useState(0);

  // `vectorEffect="non-scaling-stroke"` keeps the stroke an even weight under
  // preserveAspectRatio="none", but it also makes dash lengths resolve in
  // screen pixels rather than viewBox units. So the dash has to be the frame's
  // real rendered perimeter — a fixed viewBox-unit value tiles and leaves gaps.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const measure = () => {
      const { width, height } = svg.getBoundingClientRect();
      if (width && height) setPerimeter(2 * (width + height));
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion:reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Until measured, render the frame solid rather than invisible — a missing
  // border is a worse failure than a missing animation.
  const dash = perimeter
    ? {
        strokeDasharray: perimeter,
        strokeDashoffset: drawn ? 0 : perimeter,
        transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)',
      }
    : undefined;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] text-silver sm:-inset-3 sm:h-[calc(100%+1.5rem)] sm:w-[calc(100%+1.5rem)]"
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={dash}
        />
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}
