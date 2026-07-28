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
        motif="veil"
        eyebrow="Work With Us"
        title={careers.heading}
        body={careers.intro}
        image="/images/Empyrean-Beauty-Men-Left.jpg"
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">The Opportunity</p>
            <h2 className="font-display text-[2.15rem] font-light leading-[1.1] text-ink sm:text-4xl md:text-5xl">
              A chair worth building on
            </h2>
            <div className="mt-5 h-px w-16 bg-ink/30 sm:w-20" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-slate sm:text-base">
              {careers.body}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-4">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-4">
                  <span className="mt-0.5 shrink-0 border border-silver p-1.5">
                    <Check size={13} className="text-ink" strokeWidth={2.5} />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-slate sm:text-base">
                    {perk}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-pearl bg-mist">
        <SectionHeading eyebrow="Open Positions" title="Available Now" />

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
          {careers.openings.map((job, i) => (
            <Reveal key={job.title} delay={i * 110}>
              <article className="card h-full p-7 transition-shadow duration-500 hover:shadow-card sm:p-9">
                <p className="font-sans text-[0.64rem] uppercase tracking-luxe text-slate sm:text-[0.68rem]">
                  {job.type}
                </p>
                <h3 className="mt-3 font-display text-2xl font-light text-ink sm:text-3xl">
                  {job.title}
                </h3>
                <div className="mt-5 h-px w-14 bg-ink/25" />
                <p className="mt-5 text-[0.93rem] leading-relaxed text-slate">
                  {job.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Next Step</p>
          <h2 className="font-display text-[2.15rem] font-light leading-tight text-ink sm:text-4xl md:text-5xl">
            {careers.cta.heading}
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-ink/30 sm:w-20" />
          <p className="mt-6 text-[0.95rem] text-slate sm:text-base">{careers.cta.body}</p>
          <Link to="/contact" className="btn-dark mt-8">
            {careers.cta.label}
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
