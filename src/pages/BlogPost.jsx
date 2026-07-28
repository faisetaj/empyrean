import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import blog from '../content/blog.json';
import site from '../content/site.json';
import { formatDate } from '../lib/format.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blog.posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const others = blog.posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/55" />
        </div>

        <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 sm:px-8">
          <Link
            to="/blog"
            className="group mb-7 inline-flex items-center gap-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 text-smoke transition-colors hover:text-champagne"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Posts
          </Link>

          <time
            dateTime={post.date}
            className="block font-sans text-[0.66rem] uppercase tracking-luxe text-champagne"
          >
            {formatDate(post.date)}
          </time>

          <h1 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-bone md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-2xl">
          <Reveal>
            <p className="font-display text-xl font-light italic leading-relaxed text-bone/90 md:text-2xl">
              {post.excerpt}
            </p>
            <div className="my-10 h-px w-20 bg-champagne/70" />
          </Reveal>

          <div className="space-y-7">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 70, 300)}>
                <p className="text-[1.02rem] leading-[1.85] text-smoke">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 border-t border-white/[0.08] pt-10 text-center">
              <p className="font-display text-2xl font-light italic text-bone">
                Ready for your appointment?
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-gold mt-7"
              >
                Book Now
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </article>
      </Section>

      {others.length > 0 && (
        <Section className="border-t border-white/[0.06] bg-charcoal">
          <p className="eyebrow mb-9 text-center">Keep Reading</p>

          <div className="grid gap-8 sm:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 110}>
                <Link to={`/blog/${other.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={other.image}
                      alt=""
                      aria-hidden="true"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-light text-bone transition-colors group-hover:text-champagne">
                    {other.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {other.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
