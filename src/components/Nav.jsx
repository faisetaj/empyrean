import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
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
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-500 ${
        scrolled || open ? 'border-b border-pearl shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link to="/" aria-label="Empyrean Beauty — home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-sans text-[0.7rem] font-medium uppercase tracking-wide2 transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-slate hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-dark hidden !px-5 !py-3 sm:inline-flex"
          >
            Book Now
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="-mr-2 p-2 text-ink transition-colors hover:text-slate lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-pearl bg-white transition-[max-height] duration-500 ease-out lg:hidden ${
          open ? 'max-h-[34rem]' : 'max-h-0'
        }`}
      >
        <ul className="px-5 py-2 sm:px-8">
          {LINKS.map((link) => (
            <li key={link.to} className="border-b border-pearl last:border-0">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block py-3.5 font-display text-2xl font-light transition-colors ${
                    isActive ? 'text-ink' : 'text-slate hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-5 pb-5 sm:hidden">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-dark w-full"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
