import AmbientCanvas from './AmbientCanvas.jsx';

/**
 * Interior-page header. Light by default so pages read white; pass an image to
 * get a photographic band with a white scrim over it. `motif` varies the
 * ambient texture so pages don't all open identically.
 */
export default function PageHero({ eyebrow, title, body, image, motif = 'strands' }) {
  return (
    <section className="relative overflow-hidden border-b border-pearl bg-mist pt-[4.5rem] sm:pt-20">
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <img src={image} alt="" className="h-full w-full object-cover object-center" />
          {/* Keeps the page predominantly white while the photo still reads. */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
      )}

      <AmbientCanvas motif={motif} />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20 md:py-24">
        {eyebrow && <p className="eyebrow mb-3.5 animate-fade-up opacity-0">{eyebrow}</p>}

        <h1
          className="animate-fade-up font-display text-[2.6rem] font-light leading-[1.05] tracking-tight text-ink opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '90ms' }}
        >
          {title}
        </h1>

        <div
          className="mt-6 h-px w-20 animate-fade-up bg-ink/30 opacity-0 sm:w-24"
          style={{ animationDelay: '180ms' }}
        />

        {body && (
          <p
            className="mt-6 max-w-xl animate-fade-up text-[0.95rem] leading-relaxed text-slate opacity-0 sm:text-base"
            style={{ animationDelay: '250ms' }}
          >
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
