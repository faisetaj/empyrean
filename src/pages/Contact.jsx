import { useState } from 'react';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import site from '../content/site.json';

const FIELD =
  'w-full border border-silver bg-white px-4 py-3.5 text-base text-ink ' +
  'placeholder:text-smoke transition-colors focus:border-ink focus:outline-none ' +
  'focus:ring-1 focus:ring-ink sm:text-sm';

export default function Contact() {
  const { address } = site;
  const [sent, setSent] = useState(false);

  const mapQuery = encodeURIComponent(
    `${address.street} ${address.suite}, ${address.city}, ${address.state} ${address.zip}`
  );

  // No backend is wired yet, so the form hands off to the visitor's mail
  // client. Swap this for a Formspree/Netlify Forms endpoint when ready.
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(data.get('subject') || 'Website enquiry');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        motif="strands"
        eyebrow="Get in Touch"
        title="Contact Us"
        body="Question or comment? Fill out the form below and we'll do our best to respond within a business day."
        image="/images/empyrean-beauty-gallery-5.jpg"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Form ───────────────────────────────────────── */}
          <Reveal>
            <p className="eyebrow mb-4">Send a Message</p>
            <h2 className="font-display text-[2.15rem] font-light leading-[1.1] text-ink sm:text-4xl">
              Question or comment?
            </h2>
            <div className="mt-5 h-px w-16 bg-ink/30 sm:w-20" />

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="eyebrow mb-2 block">
                  Your name
                </label>
                <input id="name" name="name" type="text" autoComplete="name" required className={FIELD} />
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-2 block">
                  Your email
                </label>
                <input id="email" name="email" type="email" autoComplete="email" required className={FIELD} />
              </div>

              <div>
                <label htmlFor="subject" className="eyebrow mb-2 block">
                  Subject
                </label>
                <input id="subject" name="subject" type="text" className={FIELD} />
              </div>

              <div>
                <label htmlFor="message" className="eyebrow mb-2 block">
                  Your message
                </label>
                <textarea id="message" name="message" rows={6} className={`${FIELD} resize-y`} />
              </div>

              <button type="submit" className="btn-dark w-full sm:w-auto">
                Send Message
                <ArrowRight size={15} />
              </button>

              {sent && (
                <p role="status" className="text-sm text-slate">
                  Your mail client should have opened. If it didn't, email us
                  directly at {site.email}.
                </p>
              )}
            </form>
          </Reveal>

          {/* ── Details ────────────────────────────────────── */}
          <Reveal delay={120}>
            <p className="eyebrow mb-4">The Parlor</p>
            <h2 className="font-display text-[2.15rem] font-light leading-[1.1] text-ink sm:text-4xl">
              Visit us
            </h2>
            <div className="mt-5 h-px w-16 bg-ink/30 sm:w-20" />

            <address className="mt-8 space-y-5 not-italic">
              <a
                href={`https://maps.google.com/?q=${mapQuery}`}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4"
              >
                <span className="shrink-0 border border-silver p-2.5">
                  <MapPin size={16} className="text-ink" />
                </span>
                <span className="text-[0.95rem] leading-relaxed text-slate transition-colors group-hover:text-ink sm:text-base">
                  {address.street}, {address.suite}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </a>

              <a
                href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}
                className="group flex items-center gap-4"
              >
                <span className="shrink-0 border border-silver p-2.5">
                  <Phone size={16} className="text-ink" />
                </span>
                <span className="text-[0.95rem] text-slate transition-colors group-hover:text-ink sm:text-base">
                  {site.phone}
                </span>
              </a>

              <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                <span className="shrink-0 border border-silver p-2.5">
                  <Mail size={16} className="text-ink" />
                </span>
                <span className="break-all text-[0.95rem] text-slate transition-colors group-hover:text-ink sm:text-base">
                  {site.email}
                </span>
              </a>
            </address>

            <div className="mt-9">
              <h3 className="eyebrow mb-3.5">Hours</h3>
              <ul className="space-y-2 text-sm text-slate">
                {site.hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-4 border-b border-pearl pb-2"
                  >
                    <span>{row.days}</span>
                    <span className="text-ink">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Empyrean Beauty on Instagram"
                className="border border-silver p-2.5 text-slate transition-colors hover:border-ink hover:text-ink"
              >
                <Instagram size={17} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Empyrean Beauty on Facebook"
                className="border border-silver p-2.5 text-slate transition-colors hover:border-ink hover:text-ink"
              >
                <Facebook size={17} />
              </a>
            </div>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-dark mt-9 w-full sm:w-auto"
            >
              Book Now
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </Section>

      {/* ── Map ──────────────────────────────────────────────── */}
      <section className="border-t border-pearl">
        <iframe
          title="Map to Empyrean Beauty"
          src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[20rem] w-full grayscale-[0.4] sm:h-[26rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
