import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import site from '../content/site.json';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { address } = site;

  return (
    <footer className="border-t border-pearl bg-mist">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate">
              Meaning “heaven-like.” Naturally produced, sustainable product and
              a passion that is our purpose — virtue over vanity.
            </p>
            <div className="mt-5 flex items-center gap-3">
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
          </div>

          {/* Visit */}
          <div>
            <h3 className="eyebrow mb-4">Visit</h3>
            <address className="space-y-3.5 text-sm not-italic text-slate">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${address.street} ${address.suite}, ${address.city}, ${address.state} ${address.zip}`
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-3 transition-colors hover:text-ink"
              >
                <MapPin size={16} className="mt-0.5 shrink-0" />
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
                className="flex items-center gap-3 transition-colors hover:text-ink"
              >
                <Phone size={16} className="shrink-0" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-ink"
              >
                <Mail size={16} className="shrink-0" />
                {site.email}
              </a>
            </address>
          </div>

          {/* Hours + links */}
          <div>
            <h3 className="eyebrow mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-slate">
              {site.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-ink">{row.time}</span>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mb-3.5 mt-8">Explore</h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate">
              {[
                ['/about', 'About'],
                ['/pricing', 'Pricing'],
                ['/gallery', 'Gallery'],
                ['/blog', 'Blog'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-pearl pt-7 text-center text-xs text-slate sm:flex-row sm:text-left">
          <p>© {YEAR} Empyrean Beauty Parlor.</p>
          <p>Designed &amp; administered by Faisel Tajiran.</p>
        </div>
      </div>
    </footer>
  );
}
