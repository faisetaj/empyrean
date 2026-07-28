import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import site from '../content/site.json';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { address } = site;

  return (
    <footer className="border-t border-white/[0.07] bg-charcoal">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <img
              src="/images/Empyrean-Beauty-Revised-Large.png"
              alt="Empyrean Beauty"
              className="h-11 w-auto"
              width="2560"
              height="692"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
              Meaning “heaven-like.” Naturally produced, sustainable product and
              a passion that is our purpose — virtue over vanity.
            </p>
            <div className="mt-6 flex items-center gap-3">
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
          </div>

          {/* Visit */}
          <div>
            <h3 className="eyebrow mb-5">Visit</h3>
            <address className="space-y-4 text-sm not-italic text-smoke">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${address.street} ${address.suite}, ${address.city}, ${address.state} ${address.zip}`
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-3 transition-colors hover:text-champagne"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-champagne" />
                <span>
                  {address.street}
                  <br />
                  {address.suite}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </a>
              <a
                href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 transition-colors hover:text-champagne"
              >
                <Phone size={16} className="shrink-0 text-champagne" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-champagne"
              >
                <Mail size={16} className="shrink-0 text-champagne" />
                {site.email}
              </a>
            </address>
          </div>

          {/* Hours + links */}
          <div>
            <h3 className="eyebrow mb-5">Hours</h3>
            <ul className="space-y-2.5 text-sm text-smoke">
              {site.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-bone/80">{row.time}</span>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mb-4 mt-9">Explore</h3>
            <ul className="grid grid-cols-2 gap-y-2.5 text-sm text-smoke">
              {[
                ['/about', 'About'],
                ['/pricing', 'Pricing'],
                ['/gallery', 'Gallery'],
                ['/careers', 'Careers'],
                ['/blog', 'Blog'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-champagne">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-smoke sm:flex-row">
          <p>
            © {YEAR} Empyrean Beauty. Salon and Barber Studio.
          </p>
          <p>Designed &amp; administered by Faisel Tajiran.</p>
        </div>
      </div>
    </footer>
  );
}
