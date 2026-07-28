import { useState } from 'react';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import site from '../content/site.json';

const FIELD =
  'w-full border border-white/[0.12] bg-charcoal/60 px-4 py-3.5 text-sm text-bone ' +
  'placeholder:text-smoke/60 transition-colors focus:border-champagne focus:outline-none ' +
  'focus:ring-1 focus:ring-champagne';

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
        eyebrow="Get in Touch"
        title="Contact Us"
        body="Question or comment? Fill out the form below and we'll do our best to respond within a business day."
        image="/images/EB-BCKG-4-scaled.jpg"
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Form ───────────────────────────────────────── */}
          <Reveal>
            <p className="eyebrow mb-5">Send a Message</p>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone">
              Question or comment?
            </h2>
            <div className="mt-6 h-px w-20 bg-champagne/70" />

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label htmlFor="name" className="eyebrow mb-2.5 block">
                  Your name
                </label>
                <input id="name" name="name" type="text" required className={FIELD} />
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-2.5 block">
                  Your email
                </label>
                <input id="email" name="email" type="email" required className={FIELD} />
              </div>

              <div>
                <label htmlFor="subject" className="eyebrow mb-2.5 block">
                  Subject
                </label>
                <input id="subject" name="subject" type="text" className={FIELD} />
              </div>

              <div>
                <label htmlFor="message" className="eyebrow mb-2.5 block">
                  Your message
                </label>
                <textarea id="message" name="message" rows={6} className={`${FIELD} resize-y`} />
              </div>

              <button type="submit" className="btn-gold w-full sm:w-auto">
                Send Message
                <ArrowRight size={15} />
              </button>

              {sent && (
                <p role="status" className="text-sm text-champagne">
                  Your mail client should have opened. If it didn't, email us
                  directly at {site.email}.
                </p>
              )}
            </form>
          </Reveal>

          {/* ── Details ────────────────────────────────────── */}
          <Reveal delay={120}>
            <p className="eyebrow mb-5">The Studio</p>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone">
              Visit us
            </h2>
            <div className="mt-6 h-px w-20 bg-champagne/70" />

            <address className="mt-9 space-y-6 not-italic">
              <a
                href={`https://maps.google.com/?q=${mapQuery}`}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4"
              >
                <span className="shrink-0 border border-champagne/40 p-2.5">
                  <MapPin size={16} className="text-champagne" />
                </span>
                <span className="text-[0.98rem] leading-relaxed text-bone/85 transition-colors group-hover:text-champagne">
                  {address.street}, {address.suite}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </a>

              <a
                href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}
                className="group flex items-center gap-4"
              >
                <span className="shrink-0 border border-champagne/40 p-2.5">
                  <Phone size={16} className="text-champagne" />
                </span>
                <span className="text-[0.98rem] text-bone/85 transition-colors group-hover:text-champagne">
                  {site.phone}
                </span>
              </a>

              <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                <span className="shrink-0 border border-champagne/40 p-2.5">
                  <Mail size={16} className="text-champagne" />
                </span>
                <span className="text-[0.98rem] text-bone/85 transition-colors group-hover:text-champagne">
                  {site.email}
                </span>
              </a>
            </address>

            <div className="mt-10">
              <h3 className="eyebrow mb-4">Hours</h3>
              <ul className="space-y-2.5 text-sm text-smoke">
                {site.hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-4 border-b border-white/[0.06] pb-2.5"
                  >
                    <span>{row.days}</span>
                    <span className="text-bone/80">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Empyrean Beauty on Instagram"
                className="border border-white/15 p-2.5 text-smoke transition-colors hover:border-champagne hover:text-champagne"
              >
                <Instagram size={17} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Empyrean Beauty on Facebook"
                className="border border-white/15 p-2.5 text-smoke transition-colors hover:border-champagne hover:text-champagne"
              >
                <Facebook size={17} />
              </a>
            </div>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold mt-10 w-full sm:w-auto"
            >
              Book Now
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </Section>

      {/* ── Map ──────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <iframe
          title="Map to Empyrean Beauty"
          src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[26rem] w-full grayscale-[0.65] contrast-[1.1]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
