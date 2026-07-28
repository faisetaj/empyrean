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
      <section className="relative overflow-hidden border-b border-pearl bg-mist pt-[4.5rem] sm:pt-20">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={post.image} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            to="/blog"
            className="group mb-6 inline-flex items-center gap-2.5 font-sans text-[0.68rem] font-semibold uppercase tracking-wide2 text-slate transition-colors hover:text-ink"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Posts
          </Link>

          <time
            dateTime={post.date}
            className="block font-sans text-[0.64rem] uppercase tracking-luxe text-slate"
          >
            {formatDate(post.date)}
          </time>

          <h1 className="mt-4 font-display text-[2.4rem] font-light leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      <Section>
        <article className="mx-auto max-w-2xl">
          <Reveal>
            <p className="font-display text-xl font-light italic leading-relaxed text-ink sm:text-2xl">
              {post.excerpt}
            </p>
            <div className="my-8 h-px w-16 bg-ink/30 sm:w-20" />
          </Reveal>

          <div className="space-y-6">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 70, 300)}>
                <p className="text-[1rem] leading-[1.85] text-slate sm:text-[1.02rem]">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 border-t border-pearl pt-9 text-center">
              <p className="font-display text-2xl font-light italic text-ink">
                Ready for your appointment?
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-dark mt-6"
              >
                Book Now
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </article>
      </Section>

      {others.length > 0 && (
        <Section className="border-t border-pearl bg-mist">
          <p className="eyebrow mb-8 text-center">Keep Reading</p>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
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
                  <h3 className="mt-5 font-display text-2xl font-light text-ink">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
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
