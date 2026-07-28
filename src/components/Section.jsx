import Reveal from './Reveal.jsx';

export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`px-6 py-20 sm:px-8 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, body, align = 'center', className = '' }) {
  const centered = align === 'center';

  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      {title && (
        <h2 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-bone md:text-5xl">
          {title}
        </h2>
      )}
      <div className={`mt-6 h-px w-20 bg-champagne/70 ${centered ? 'mx-auto' : ''}`} />
      {body && <p className="mt-6 text-[0.95rem] leading-relaxed text-smoke">{body}</p>}
    </Reveal>
  );
}
