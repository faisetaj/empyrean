import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Scissors, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { Section, SectionHeading } from '../components/Section.jsx';
import site from '../content/site.json';
import services from '../content/services.json';
import gallery from '../content/gallery.json';

const ICONS = { ladies: Sparkles, gentlemen: Scissors };

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/Empyrean-Beauty-Womens-Hair-Slide.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full animate-ken-burns object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6 animate-fade-up opacity-0">{site.hero.eyebrow}</p>

            <h1
              className="animate-fade-up font-display text-6xl font-light leading-[0.95] tracking-tight opacity-0 sm:text-7xl md:text-8xl"
              style={{ animationDelay: '110ms' }}
            >
              <span className="text-platinum">Empyrean</span>
              <br />
              <span className="italic text-champagne">Beauty</span>
            </h1>

            <p
              className="mt-6 animate-fade-up font-sans text-[0.7rem] font-medium uppercase tracking-luxe text-smoke opacity-0"
              style={{ animationDelay: '200ms' }}
            >
              {site.hero.subtitle}
            </p>

            <div
              className="mt-8 h-px w-28 animate-fade-up bg-champagne opacity-0"
              style={{ animationDelay: '260ms' }}
            />

            <p
              className="mt-8 max-w-lg animate-fade-up text-lg leading-relaxed text-bone/85 opacity-0"
              style={{ animationDelay: '320ms' }}
            >
              {site.hero.intro}
            </p>

            <div
              className="mt-11 flex animate-fade-up flex-col gap-4 opacity-0 sm:flex-row"
              style={{ animationDelay: '400ms' }}
            >
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-gold"
              >
                {site.hero.ctaPrimary}
                <ArrowRight size={15} />
              </a>
              <Link to="/pricing" className="btn-outline">
                {site.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro / experience ───────────────────────────────── */}
      <Section className="border-y border-white/[0.06] bg-charcoal">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">Our Studio</p>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone md:text-5xl">
              {site.intro.heading}
            </h2>
            <div className="mt-6 h-px w-20 bg-champagne/70" />
            <p className="mt-7 text-[0.98rem] leading-relaxed text-smoke">
              {site.intro.body}
            </p>
            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-2.5 font-sans text-[0.72rem] font-semibold uppercase tracking-wide2 text-champagne transition-colors hover:text-champagne-light"
            >
              Read More
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute -inset-3 border border-champagne/25" aria-hidden="true" />
              <img
                src="/images/empyrean-beauty-gallery-6.jpg"
                alt="Finished colour and style work from the Empyrean Beauty studio"
                className="relative h-[26rem] w-full object-cover md:h-[32rem]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Services split ───────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="What We Do"
          title="Salon & Barber Studio"
          body="Two sides of one studio — a full salon for colour and cut, and a dedicated barber chair."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-2">
          {services.categories.map((cat, i) => {
            const Icon = ICONS[cat.id] ?? Sparkles;
            return (
              <Reveal key={cat.id} delay={i * 110}>
                <article className="group relative h-full overflow-hidden border border-white/[0.07]">
                  <div className="absolute inset-0">
                    <img
                      src={cat.image}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/50" />
                  </div>

                  <div className="relative flex h-full flex-col p-9 md:p-11">
                    <Icon size={26} className="text-champagne" strokeWidth={1.4} />
                    <h3 className="mt-6 font-display text-3xl font-light text-bone md:text-4xl">
                      {cat.label}
                    </h3>
                    <p className="mt-3 text-sm text-smoke">{cat.blurb}</p>

                    <ul className="mt-8 space-y-3 border-t border-white/[0.08] pt-7">
                      {cat.items.slice(0, 5).map((item) => (
                        <li
                          key={item.name}
                          className="flex items-baseline justify-between gap-4 text-sm"
                        >
                          <span className="text-bone/85">{item.name}</span>
                          <span className="shrink-0 font-medium text-champagne">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/pricing"
                      className="group/link mt-9 inline-flex items-center gap-2.5 font-sans text-[0.72rem] font-semibold uppercase tracking-wide2 text-bone transition-colors hover:text-champagne"
                    >
                      Full {cat.label} Pricing
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── Booking band ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            src="/images/home_barber2_sectionbg1.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/90" />
        </div>

        <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow mb-5">Appointments</p>
            <h2 className="font-display text-4xl font-light leading-tight text-bone md:text-5xl">
              {site.booking.heading}
            </h2>
            <div className="mx-auto mt-6 h-px w-20 bg-champagne/70" />
            <p className="mt-7 text-[0.98rem] leading-relaxed text-smoke">
              {site.booking.body}
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold mt-10"
            >
              {site.booking.cta}
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <Section className="border-y border-white/[0.06] bg-charcoal">
        <SectionHeading
          eyebrow={site.products.heading}
          title={site.products.body}
          body="Naturally produced, sustainably made, and chosen because they perform under a professional's hands."
        />

        <Reveal delay={120}>
          {/* Supplier logos are dark artwork on white backgrounds, so they get
              a light plate rather than being dropped straight onto the dark
              section where they'd read as floating white boxes. */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            {site.products.brands.map((brand) => (
              <div
                key={brand.name}
                className="flex h-24 w-56 items-center justify-center bg-bone/90 px-8 opacity-70 transition-opacity duration-500 hover:opacity-100"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  title={brand.name}
                  className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 flex items-center justify-center gap-3">
            <Leaf size={16} className="text-champagne" strokeWidth={1.5} />
            <p className="font-sans text-[0.68rem] uppercase tracking-luxe text-smoke">
              Sustainable · Cruelty-free · Professional grade
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── Gallery preview ──────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Gallery"
          title="Work from the chair"
          body="A look at what's leaving our studio."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.images.slice(0, 4).map((img, i) => (
            <Reveal key={img.src} delay={i * 90}>
              <Link to="/gallery" className="group block overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Link to="/gallery" className="btn-outline">
              View Our Gallery
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ── Testimonial ──────────────────────────────────────── */}
      <Section className="border-t border-white/[0.06] bg-charcoal">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-8">Testimonials</p>
          {site.testimonials.map((t) => (
            <blockquote key={t.author}>
              <p className="font-display text-2xl font-light italic leading-relaxed text-bone md:text-3xl">
                “{t.quote}”
              </p>
              <footer className="mt-8 font-sans text-[0.68rem] uppercase tracking-luxe text-champagne">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
