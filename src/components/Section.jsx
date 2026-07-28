import Reveal from './Reveal.jsx';

export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 sm:py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, body, align = 'center', className = '' }) {
  const centered = align === 'center';

  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3.5">{eyebrow}</p>}
      {title && (
        <h2 className="font-display text-[2.15rem] font-light leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      )}
      <div className={`mt-5 h-px w-16 bg-ink/30 sm:w-20 ${centered ? 'mx-auto' : ''}`} />
      {body && (
        <p className="mt-5 text-[0.95rem] leading-relaxed text-slate sm:text-base">{body}</p>
      )}
    </Reveal>
  );
}
