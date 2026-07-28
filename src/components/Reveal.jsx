import { useEffect, useRef, useState } from 'react';

/**
 * Reveals content the first time it scrolls into view. Once revealed it stays
 * revealed — re-animating on every scroll pass reads as noise, not polish.
 *
 * `variant` varies the entrance so consecutive sections don't all rise
 * identically: up | left | right | scale | blur.
 */
const HIDDEN = {
  up: 'translate-y-7 opacity-0',
  left: '-translate-x-8 opacity-0',
  right: 'translate-x-8 opacity-0',
  scale: 'scale-[0.965] opacity-0',
  blur: 'translate-y-4 opacity-0 blur-[6px]',
};

const SHOWN = {
  up: 'translate-y-0 opacity-100',
  left: 'translate-x-0 opacity-100',
  right: 'translate-x-0 opacity-100',
  scale: 'scale-100 opacity-100',
  blur: 'translate-y-0 opacity-100 blur-0',
};

export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className = '',
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or reduced motion) — show immediately rather
    // than leaving the content stuck at opacity 0.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const key = HIDDEN[variant] ? variant : 'up';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? SHOWN[key] : HIDDEN[key]
      } ${className}`}
    >
      {children}
    </div>
  );
}
