import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import TracedFrame from '../components/TracedFrame.jsx';
import { Section, SectionHeading } from '../components/Section.jsx';
import team from '../content/team.json';

export default function About() {
  return (
    <>
      <PageHero
        motif="veil"
        eyebrow="Empyrean Beauty Parlor"
        title="About Us"
        body={team.intro}
        image="/images/Empyrean-Beauty-Slider-Men.jpg"
      />

      {/* ── Team ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeading eyebrow="Who We Are" title={team.heading} align="left" />

        <div className="mt-12 space-y-16 sm:mt-16 md:space-y-24">
          {team.members.map((member, i) => (
            <Reveal key={member.name} variant={i % 2 === 0 ? 'left' : 'right'}>
              <article
                className={`grid items-center gap-8 md:grid-cols-5 md:gap-14 ${
                  i % 2 === 1 ? 'md:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="md:col-span-2">
                  <TracedFrame>
                    {/* Monochrome so the portrait sits in the black / white /
                        silver palette — drop `grayscale` to show it in colour. */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="aspect-[4/5] w-full object-cover object-center grayscale"
                      loading="lazy"
                    />
                  </TracedFrame>
                </figure>

                <div className="md:col-span-3">
                  <h3 className="font-display text-[2.15rem] font-light leading-tight text-ink sm:text-4xl md:text-5xl">
                    {member.name}
                  </h3>
                  <p className="mt-3 font-sans text-[0.66rem] uppercase tracking-luxe text-slate sm:text-[0.7rem]">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-slate">{member.title}</p>
                  <div className="mt-6 h-px w-16 bg-ink/30 sm:w-20" />
                  <div className="mt-6 space-y-4">
                    {member.bio.map((para, k) => (
                      <p
                        key={k}
                        className="text-[0.95rem] leading-relaxed text-slate sm:text-base"
                      >
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
    </>
  );
}
