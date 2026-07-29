import { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import TracedFrame from '../components/TracedFrame.jsx';
import { Section } from '../components/Section.jsx';
import services from '../content/services.json';
import site from '../content/site.json';

export default function Pricing() {
  const [active, setActive] = useState(services.categories[0].id);
  const category = services.categories.find((c) => c.id === active);

  return (
    <>
      <PageHero
        motif="strands"
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
            className="flex justify-center border-b border-pearl"
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
                  className={`relative -mb-px px-6 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:px-10 sm:py-5 sm:text-[0.72rem] ${
                    isActive
                      ? 'border-b-2 border-ink text-ink'
                      : 'border-b-2 border-transparent text-slate hover:text-ink'
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
          className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-5 lg:gap-16"
        >
          <Reveal variant="left" className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <TracedFrame>
                <img
                  src={category.image}
                  alt={`${category.label} services at Empyrean Beauty`}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </TracedFrame>
              <h2 className="mt-8 font-display text-[2.15rem] font-light text-ink sm:text-4xl">
                {category.label}
              </h2>
              <p className="mt-2 text-sm text-slate">{category.blurb}</p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-dark mt-6 w-full"
              >
                Book Now
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            {category.groups.map((group, gi) => (
              <section key={group.name} className={gi > 0 ? 'mt-12 sm:mt-14' : ''}>
                <Reveal variant="up">
                  <div className="flex items-baseline justify-between gap-4 border-b border-ink/25 pb-3">
                    <h3 className="font-display text-2xl font-normal text-ink sm:text-[1.7rem]">
                      {group.name}
                    </h3>
                    <span className="eyebrow hidden sm:inline">Price</span>
                  </div>
                  {group.note && (
                    <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate">
                      <Info size={13} className="mt-0.5 shrink-0" />
                      {group.note}
                    </p>
                  )}
                </Reveal>

                <ul>
                  {group.items.map((item, i) => (
                    <Reveal
                      key={`${group.name}-${item.name}`}
                      delay={Math.min(i * 40, 240)}
                    >
                      <li className="group flex flex-col gap-1 border-b border-pearl py-4 transition-colors hover:border-ink/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-5">
                        <div className="min-w-0">
                          <h4 className="font-display text-xl font-normal text-ink">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="mt-1 text-sm text-slate">{item.description}</p>
                          )}
                        </div>
                        <p className="shrink-0 font-sans text-sm font-medium text-ink sm:text-right">
                          {item.price}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </section>
            ))}

            <Reveal>
              <p className="mt-10 text-sm leading-relaxed text-slate">
                Not sure which service you need? Book a consultation and we'll
                walk through it together — no obligation, and no surprises on
                the final ticket.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Policies ─────────────────────────────────────────── */}
      {services.policies && (
        <Section className="border-t border-pearl bg-mist">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal variant="left" className="md:col-span-4">
              <p className="eyebrow mb-4">Before You Book</p>
              <h2 className="font-display text-[2.15rem] font-light leading-[1.1] text-ink sm:text-4xl">
                {services.policies.heading}
              </h2>
              <div className="mt-5 h-px w-16 bg-ink/30 sm:w-20" />
            </Reveal>

            <Reveal variant="right" delay={140} className="md:col-span-7 md:col-start-6">
              <ul className="space-y-4">
                {services.policies.items.map((policy) => (
                  <li
                    key={policy}
                    className="flex items-start gap-3.5 border-b border-pearl pb-4 text-[0.95rem] leading-relaxed text-slate last:border-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-px w-4 shrink-0 bg-ink/40"
                    />
                    {policy}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      )}
    </>
  );
}
