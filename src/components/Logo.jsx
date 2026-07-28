/**
 * Brand lockup: the EB monogram beside a typeset wordmark.
 *
 * The original logo artwork has "SALON AND BARBER STUDIO" baked into the
 * image, so it can't be used now the studio is a beauty parlour. The monogram
 * is clean, so the name is set in type next to it — which also scales and
 * recolours far better than a raster logo.
 */
export default function Logo({ className = '', variant = 'dark' }) {
  const isLight = variant === 'light';

  return (
    <span className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <img
        src="/images/Empyrean-Beauty.png"
        alt=""
        aria-hidden="true"
        width="2149"
        height="2149"
        className={`h-9 w-9 shrink-0 sm:h-11 sm:w-11 ${
          isLight ? 'brightness-0 invert' : ''
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-normal leading-none tracking-tight sm:text-2xl ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          Empyrean <span className="italic">Beauty</span>
        </span>
        <span
          className={`mt-1 font-sans text-[0.5rem] font-medium uppercase tracking-luxe sm:text-[0.55rem] ${
            isLight ? 'text-white/70' : 'text-slate'
          }`}
        >
          Beauty Parlor
        </span>
      </span>
    </span>
  );
}
