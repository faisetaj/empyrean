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
        eyebrow="Our Work"
        title={gallery.heading}
        body={gallery.intro}
        image="/images/empyrean-beauty-gallery-4.jpg"
      />

      <Section>
        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.images.map((img, i) => (
            <Reveal key={img.src} delay={Math.min(i * 70, 400)}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View larger: ${img.alt}`}
                className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="font-display text-2xl font-light italic text-smoke">
              Like what you see?
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold mt-7"
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/97 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 p-2.5 text-bone transition-colors hover:text-champagne"
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
            className="absolute left-2 p-3 text-bone transition-colors hover:text-champagne sm:left-6"
          >
            <ChevronLeft size={34} />
          </button>

          <figure
            className="max-h-[86vh] max-w-[90vw] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery.images[index].src}
              alt={gallery.images[index].alt}
              className="max-h-[78vh] w-auto object-contain"
            />
            <figcaption className="mt-5 text-center text-sm text-smoke">
              {gallery.images[index].alt}
              <span className="ml-3 text-champagne">
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
            className="absolute right-2 p-3 text-bone transition-colors hover:text-champagne sm:right-6"
          >
            <ChevronRight size={34} />
          </button>
        </div>
      )}
    </>
  );
}
