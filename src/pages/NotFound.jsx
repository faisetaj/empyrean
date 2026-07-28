import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[78vh] items-center justify-center px-5 pt-20 sm:px-8">
      <div className="text-center">
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="font-display text-[2.75rem] font-light leading-none text-ink sm:text-6xl md:text-7xl">
          Page not found
        </h1>
        <div className="mx-auto mt-7 h-px w-20 bg-ink/30 sm:w-24" />
        <p className="mx-auto mt-7 max-w-md text-[0.95rem] leading-relaxed text-slate sm:text-base">
          The page you're looking for has moved or never existed. Let's get you
          back to something useful.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link to="/" className="btn-dark">
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
