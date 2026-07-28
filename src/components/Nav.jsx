import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import site from '../content/site.json';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/[0.07] bg-ink/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Empyrean Beauty — home">
          <img
            src="/images/Empyrean-Beauty-Revised-Large.png"
            alt="Empyrean Beauty, Salon and Barber Studio"
            className="h-9 w-auto md:h-11"
            width="2560"
            height="692"
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative font-sans text-[0.7rem] font-medium uppercase tracking-wide2 transition-colors duration-300 ${
                    isActive ? 'text-champagne' : 'text-bone/70 hover:text-bone'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-gold hidden !px-6 !py-3 sm:inline-flex"
          >
            Book Now
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-2 text-bone transition-colors hover:text-champagne lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/[0.07] bg-ink/95 backdrop-blur-xl transition-[max-height] duration-500 ease-out lg:hidden ${
          open ? 'max-h-[32rem]' : 'max-h-0'
        }`}
      >
        <ul className="px-6 py-4">
          {LINKS.map((link) => (
            <li key={link.to} className="border-b border-white/[0.06] last:border-0">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block py-4 font-display text-2xl font-light transition-colors ${
                    isActive ? 'text-champagne' : 'text-bone hover:text-champagne'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6 sm:hidden">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-gold w-full"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
