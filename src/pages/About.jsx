import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section, SectionHeading } from '../components/Section.jsx';
import team from '../content/team.json';
import site from '../content/site.json';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Empyrean Beauty · Salon & Barber Studio"
        title="About Us"
        body={team.intro}
        image="/images/Empyrean-Beauty-Slider-Men.jpg"
      />

      {/* ── Team ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Who We Are"
          title={team.heading}
          align="left"
        />

        <div className="mt-16 space-y-20 md:space-y-28">
          {team.members.map((member, i) => (
            <Reveal key={member.name}>
              <article
                className={`grid items-center gap-10 md:grid-cols-5 md:gap-16 ${
                  i % 2 === 1 ? 'md:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="md:col-span-2">
                  <div className="relative">
                    <div
                      className="absolute -inset-3 border border-champagne/25"
                      aria-hidden="true"
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </figure>

                <div className="md:col-span-3">
                  <h3 className="font-display text-4xl font-light text-bone md:text-5xl">
                    {member.name}
                  </h3>
                  <p className="mt-3 font-sans text-[0.7rem] uppercase tracking-luxe text-champagne">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-smoke">{member.title}</p>
                  <div className="mt-7 h-px w-20 bg-champagne/70" />
                  <div className="mt-7 space-y-5">
                    {member.bio.map((para, k) => (
                      <p key={k} className="text-[0.98rem] leading-relaxed text-smoke">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Additional services ──────────────────────────────── */}
      <Section className="border-y border-white/[0.06] bg-charcoal">
        <SectionHeading
          eyebrow="Beyond the Chair"
          title={team.additionalServices.heading}
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {team.additionalServices.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 110}>
              <div className="card h-full p-9 text-center">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="mx-auto h-16 w-auto"
                  loading="lazy"
                />
                <h3 className="mt-7 font-display text-2xl font-light text-bone">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-smoke">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Booth rental ─────────────────────────────────────── */}
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Join Us</p>
          <h2 className="font-display text-4xl font-light leading-tight text-bone md:text-5xl">
            {site.boothRental.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-champagne/70" />
          <p className="mt-7 text-[0.98rem] text-smoke">{site.boothRental.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/contact" className="btn-gold">
              Contact Us
              <ArrowRight size={15} />
            </Link>
            <Link to="/careers" className="btn-outline">
              View Careers
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
