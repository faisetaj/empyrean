/**
 * Compact hero used at the top of every interior page — keeps the nav from
 * sitting on bare content and gives each page a consistent entrance.
 */
export default function PageHero({ eyebrow, title, body, image }) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden pt-20 md:min-h-[56vh]">
      <div className="absolute inset-0">
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 md:pb-20">
        {eyebrow && <p className="eyebrow mb-4 animate-fade-up opacity-0">{eyebrow}</p>}
        <h1
          className="animate-fade-up font-display text-5xl font-light leading-[1.05] tracking-tight text-bone opacity-0 md:text-7xl"
          style={{ animationDelay: '90ms' }}
        >
          {title}
        </h1>
        <div
          className="mt-7 h-px w-24 animate-fade-up bg-champagne opacity-0"
          style={{ animationDelay: '180ms' }}
        />
        {body && (
          <p
            className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-smoke opacity-0"
            style={{ animationDelay: '250ms' }}
          >
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
