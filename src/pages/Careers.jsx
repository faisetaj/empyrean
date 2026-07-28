import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section, SectionHeading } from '../components/Section.jsx';
import careers from '../content/careers.json';

const PERKS = [
  'Set your own hours and pricing',
  'Keep your own clientele and book',
  'Professional-grade, sustainable product',
  'A small, senior room that respects the craft',
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Work With Us"
        title={careers.heading}
        body={careers.intro}
        image="/images/Empyrean-Beauty-Men-Left.jpg"
      />

      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">The Opportunity</p>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone md:text-5xl">
              A chair worth building on
            </h2>
            <div className="mt-6 h-px w-20 bg-champagne/70" />
            <p className="mt-7 text-[0.98rem] leading-relaxed text-smoke">
              {careers.body}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-5">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-4">
                  <span className="mt-0.5 shrink-0 border border-champagne/40 p-1.5">
                    <Check size={13} className="text-champagne" strokeWidth={2.5} />
                  </span>
                  <span className="text-[0.98rem] leading-relaxed text-bone/85">
                    {perk}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-white/[0.06] bg-charcoal">
        <SectionHeading eyebrow="Open Positions" title="Available Now" />

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {careers.openings.map((job, i) => (
            <Reveal key={job.title} delay={i * 110}>
              <article className="card h-full p-9 transition-colors duration-500 hover:border-champagne/30 md:p-11">
                <p className="font-sans text-[0.68rem] uppercase tracking-luxe text-champagne">
                  {job.type}
                </p>
                <h3 className="mt-4 font-display text-3xl font-light text-bone">
                  {job.title}
                </h3>
                <div className="mt-6 h-px w-16 bg-champagne/50" />
                <p className="mt-6 text-[0.95rem] leading-relaxed text-smoke">
                  {job.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Next Step</p>
          <h2 className="font-display text-4xl font-light leading-tight text-bone md:text-5xl">
            {careers.cta.heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-champagne/70" />
          <p className="mt-7 text-[0.98rem] text-smoke">{careers.cta.body}</p>
          <Link to="/contact" className="btn-gold mt-10">
            {careers.cta.label}
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
