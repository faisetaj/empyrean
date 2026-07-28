import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import services from '../content/services.json';
import site from '../content/site.json';

export default function Pricing() {
  const [active, setActive] = useState(services.categories[0].id);
  const category = services.categories.find((c) => c.id === active);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Pricing"
        body="Prices are starting points — final pricing depends on hair length, density and the service your consultation calls for."
        image="/images/Empyrean-Beauty-Women-Right-1.jpg"
      />

      <Section>
        {/* Tabs */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Service categories"
            className="flex justify-center gap-2 border-b border-white/[0.08]"
          >
            {services.categories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActive(cat.id)}
                  className={`relative -mb-px px-8 py-5 font-sans text-[0.72rem] font-semibold uppercase tracking-wide2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                    isActive
                      ? 'border-b-2 border-champagne text-champagne'
                      : 'border-b-2 border-transparent text-smoke hover:text-bone'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${category.id}`}
          aria-labelledby={`tab-${category.id}`}
          className="mt-14 grid gap-14 lg:grid-cols-5 lg:gap-16"
        >
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute -inset-3 border border-champagne/25" aria-hidden="true" />
                <img
                  src={category.image}
                  alt={`${category.label} services at Empyrean Beauty`}
                  className="relative aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h2 className="mt-10 font-display text-4xl font-light text-bone">
                {category.label}
              </h2>
              <p className="mt-3 text-sm text-smoke">{category.blurb}</p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-gold mt-8 w-full"
              >
                Book Now
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <div className="hidden items-baseline justify-between border-b border-white/[0.08] pb-4 sm:flex">
              <span className="eyebrow">Service</span>
              <span className="eyebrow">Price</span>
            </div>

            <ul>
              {category.items.map((item, i) => (
                <Reveal key={`${category.id}-${item.name}`} delay={Math.min(i * 45, 400)}>
                  <li className="group flex flex-col gap-1.5 border-b border-white/[0.06] py-6 transition-colors hover:border-champagne/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-normal text-bone transition-colors group-hover:text-champagne">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="mt-1.5 text-sm text-smoke">{item.description}</p>
                      )}
                    </div>
                    <p className="shrink-0 font-sans text-sm font-medium text-champagne sm:text-right">
                      {item.price}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <p className="mt-10 text-sm leading-relaxed text-smoke">
                Not sure which service you need? Book a consultation and we'll
                walk through it together — no obligation, and no surprises on
                the final ticket.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
