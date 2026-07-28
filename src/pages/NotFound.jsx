import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 pt-20">
      <div className="text-center">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="font-display text-6xl font-light leading-none text-platinum md:text-8xl">
          Page not found
        </h1>
        <div className="mx-auto mt-8 h-px w-24 bg-champagne" />
        <p className="mx-auto mt-8 max-w-md text-[0.98rem] leading-relaxed text-smoke">
          The page you're looking for has moved or never existed. Let's get you
          back to something useful.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" className="btn-gold">
            Back Home
            <ArrowRight size={15} />
          </Link>
          <Link to="/pricing" className="btn-outline">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
