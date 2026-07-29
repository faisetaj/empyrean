import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Scissors, Sparkles } from 'lucide-react';
import AmbientCanvas from '../components/AmbientCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import TracedFrame from '../components/TracedFrame.jsx';
import { Section, SectionHeading } from '../components/Section.jsx';
import { flattenServices } from '../lib/format.js';
import site from '../content/site.json';
import services from '../content/services.json';
import gallery from '../content/gallery.json';

const ICONS = { ladies: Sparkles, gentlemen: Scissors };

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────
          Split 5/7: white type panel beside the photograph, so the page opens
          bright rather than behind a dark image scrim. */}
      <section className="border-b border-pearl pt-[4.5rem] sm:pt-20">
        <div className="mx-auto grid w-full max-w-7xl items-stretch lg:grid-cols-12">
          <div className="order-2 flex items-center px-5 py-14 sm:px-8 sm:py-20 lg:order-1 lg:col-span-5 lg:py-28 lg:pr-12">
            <div className="w-full">
              <p className="eyebrow mb-5 animate-fade-up opacity-0">{site.hero.eyebrow}</p>

              <h1
                className="animate-fade-up font-display text-[3.25rem] font-light leading-[0.95] tracking-tight text-ink opacity-0 sm:text-7xl lg:text-[5rem]"
                style={{ animationDelay: '110ms' }}
              >
                Empyrean
                <br />
                <span className="italic">Beauty</span>
              </h1>

              <p
                className="mt-5 animate-fade-up font-sans text-[0.66rem] font-medium uppercase tracking-luxe text-slate opacity-0 sm:text-[0.7rem]"
                style={{ animationDelay: '200ms' }}
              >
                {site.hero.subtitle}
              </p>

              <div
                className="mt-7 h-px w-24 animate-fade-up bg-ink/30 opacity-0"
                style={{ animationDelay: '260ms' }}
              />

              <p
                className="mt-7 max-w-md animate-fade-up text-base leading-relaxed text-slate opacity-0 sm:text-lg"
                style={{ animationDelay: '320ms' }}
              >
                {site.hero.intro}
              </p>

              <div
                className="mt-9 flex animate-fade-up flex-col gap-3 opacity-0 sm:flex-row sm:gap-4"
                style={{ animationDelay: '400ms' }}
              >
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-dark"
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

          <div className="relative order-1 h-[46vh] min-h-[20rem] overflow-hidden lg:order-2 lg:col-span-7 lg:h-auto lg:min-h-[38rem]">
            <img
              src="/images/Empyrean-Beauty-Womens-Hair-Slide.jpg"
              alt="Styling in progress at Empyrean Beauty"
              className="h-full w-full animate-ken-burns object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── Intro / experience ───────────────────────────────────
          Asymmetric 5/7 with the image pulled upward, breaking the band. */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24 md:py-32">
        <AmbientCanvas motif="strands" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal variant="left" className="md:col-span-5">
            <p className="eyebrow mb-4">Our Parlor</p>
            <h2 className="font-display text-[2.15rem] font-light leading-[1.1] text-ink sm:text-4xl md:text-5xl">
              {site.intro.heading}
            </h2>
            <div className="mt-5 h-px w-16 bg-ink/30 sm:w-20" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-slate sm:text-base">
              {site.intro.body}
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 text-ink transition-colors hover:text-slate"
            >
              Read More
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal variant="scale" delay={120} className="md:col-span-7 md:-mt-16 lg:-mt-24">
            <TracedFrame className="md:ml-8 lg:ml-16">
              <img
                src="/images/empyrean-beauty-gallery-6.jpg"
                alt="Finished colour and style work from Empyrean Beauty"
                className="h-[20rem] w-full object-cover sm:h-[26rem] md:h-[34rem]"
                loading="lazy"
              />
            </TracedFrame>
          </Reveal>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────
          Left-aligned heading and a staggered second card. */}
      <Section className="border-y border-pearl bg-mist !py-16 sm:!py-20 md:!py-24">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <SectionHeading
            eyebrow="What We Do"
            title="Cut, Color & Finish"
            align="left"
            className="md:col-span-7"
          />
          <Reveal variant="right" delay={140} className="md:col-span-5">
            <p className="text-[0.95rem] leading-relaxed text-slate sm:text-base md:text-right">
              A full parlor for colour and cut — for ladies and gentlemen alike.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
          {services.categories.map((cat, i) => {
            const Icon = ICONS[cat.id] ?? Sparkles;
            return (
              <Reveal
                key={cat.id}
                variant={i === 0 ? 'left' : 'right'}
                delay={i * 130}
                className={i === 1 ? 'md:mt-14' : ''}
              >
                <article className="group flex h-full flex-col overflow-hidden border border-pearl bg-white transition-shadow duration-500 hover:shadow-card">
                  <div className={`overflow-hidden ${i === 0 ? 'h-48 sm:h-64' : 'h-48 sm:h-52'}`}>
                    <img
                      src={cat.image}
                      alt={`${cat.label} services at Empyrean Beauty`}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    <Icon size={24} className="text-ink" strokeWidth={1.4} />
                    <h3 className="mt-4 font-display text-3xl font-light text-ink sm:text-4xl">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-sm text-slate">{cat.blurb}</p>

                    <ul className="mt-6 space-y-3 border-t border-pearl pt-6">
                      {flattenServices(cat).slice(0, 5).map((item) => (
                        <li
                          key={item.name}
                          className="flex items-baseline justify-between gap-4 text-sm"
                        >
                          <span className="text-ink">{item.name}</span>
                          <span className="shrink-0 font-medium text-slate">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/pricing"
                      className="group/link mt-auto inline-flex items-center gap-2.5 pt-8 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 text-ink transition-colors hover:text-slate"
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

      {/* ── Booking band ─────────────────────────────────────────
          Off-centre, sitting against a drifting veil. */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24 md:py-28">
        <AmbientCanvas motif="veil" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <Reveal variant="blur" className="md:col-span-7 md:col-start-2">
              <p className="eyebrow mb-4">Appointments</p>
              <h2 className="font-display text-[2.4rem] font-light leading-[1.05] text-ink sm:text-5xl md:text-6xl">
                {site.booking.heading}
              </h2>
              <div className="mt-6 h-px w-16 bg-ink/30 sm:w-20" />
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-slate sm:text-base">
                {site.booking.body}
              </p>
            </Reveal>

            <Reveal variant="right" delay={160} className="md:col-span-3">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-dark w-full"
              >
                {site.booking.cta}
                <ArrowRight size={15} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────
          Centred, as a deliberate rest between the off-axis sections. */}
      <Section className="border-y border-pearl bg-mist !py-14 sm:!py-20">
        <SectionHeading
          eyebrow={site.products.heading}
          title={site.products.body}
          body="Naturally produced, sustainably made, and chosen because they perform under a professional's hands."
        />

        <Reveal variant="blur" delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16">
            {site.products.brands.map((brand) => (
              <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                title={brand.name}
                className="h-10 w-auto max-w-[9rem] object-contain opacity-60 mix-blend-multiply transition-opacity duration-500 hover:opacity-100 sm:h-12 sm:max-w-[11rem]"
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Leaf size={16} className="shrink-0 text-slate" strokeWidth={1.5} />
            <p className="text-center font-sans text-[0.62rem] uppercase tracking-luxe text-slate sm:text-[0.68rem]">
              Sustainable · Cruelty-free · Professional grade
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── Gallery preview ──────────────────────────────────────
          Editorial grid: one tall plate anchoring three smaller ones. */}
      <Section className="!py-16 sm:!py-24">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <SectionHeading
            eyebrow="Gallery"
            title="Work from the chair"
            align="left"
            className="md:col-span-6"
          />
          <Reveal variant="right" delay={140} className="md:col-span-4 md:col-start-9">
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 text-ink transition-colors hover:text-slate md:float-right"
            >
              View Our Gallery
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-4 md:grid-rows-2">
          {gallery.images.slice(0, 4).map((img, i) => (
            <Reveal
              key={img.src}
              variant={i % 2 === 0 ? 'scale' : 'up'}
              delay={i * 100}
              className={
                i === 0
                  ? 'md:col-span-2 md:row-span-2'
                  : i === 3
                    ? 'md:col-span-2'
                    : ''
              }
            >
              <Link to="/gallery" className="group block h-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 ${
                    i === 0
                      ? 'aspect-square md:h-full md:aspect-auto'
                      : 'aspect-square md:h-44 lg:h-52'
                  }`}
                  loading="lazy"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Testimonial ──────────────────────────────────────────
          Offset left with an oversized quote mark. */}
      <section className="relative overflow-hidden border-t border-pearl bg-mist px-5 py-16 sm:px-8 sm:py-24">
        <AmbientCanvas motif="dust" />

        <div className="relative mx-auto w-full max-w-6xl">
          {site.testimonials.map((t) => (
            <Reveal key={t.author} variant="blur" className="md:max-w-3xl">
              <blockquote className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[7rem] leading-none text-ink/[0.07] sm:-left-6 sm:-top-14 sm:text-[11rem]"
                >
                  “
                </span>
                <p className="relative font-display text-xl font-light italic leading-relaxed text-ink sm:text-2xl md:text-3xl">
                  {t.quote}
                </p>
                <footer className="mt-6 font-sans text-[0.66rem] uppercase tracking-luxe text-slate">
                  — {t.author}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
