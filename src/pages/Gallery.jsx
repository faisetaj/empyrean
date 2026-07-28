import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import gallery from '../content/gallery.json';
import site from '../content/site.json';

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const isOpen = index !== null;
  const total = gallery.images.length;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      <PageHero
        motif="dust"
        eyebrow="Our Work"
        title={gallery.heading}
        body={gallery.intro}
        image="/images/empyrean-beauty-gallery-4.jpg"
      />

      <Section>
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
          {gallery.images.map((img, i) => (
            <Reveal key={img.src} delay={Math.min(i * 70, 400)}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View larger: ${img.alt}`}
                className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <p className="font-display text-2xl font-light italic text-ink">
              Like what you see?
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-dark mt-6"
            >
              Book Your Visit
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/98 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 p-2.5 text-ink transition-colors hover:text-slate sm:right-5 sm:top-5"
          >
            <X size={26} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-0 z-10 p-2 text-ink transition-colors hover:text-slate sm:left-6 sm:p-3"
          >
            <ChevronLeft size={30} className="sm:h-9 sm:w-9" />
          </button>

          <figure
            className="max-h-[86vh] max-w-[90vw] px-10 sm:px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery.images[index].src}
              alt={gallery.images[index].alt}
              className="mx-auto max-h-[74vh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-slate">
              {gallery.images[index].alt}
              <span className="ml-3 text-ink">
                {index + 1} / {total}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-0 z-10 p-2 text-ink transition-colors hover:text-slate sm:right-6 sm:p-3"
          >
            <ChevronRight size={30} className="sm:h-9 sm:w-9" />
          </button>
        </div>
      )}
    </>
  );
}
