import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Section } from '../components/Section.jsx';
import blog from '../content/blog.json';
import { formatDate } from '../lib/format.js';

export default function Blog() {
  return (
    <>
      <PageHero
        motif="dust"
        eyebrow="From the Parlor"
        title={blog.heading}
        body={blog.intro}
        image="/images/empyrean-beauty-gallery-6.jpg"
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 110}>
              <article className="group h-full">
                <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      aria-hidden="true"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col border border-t-0 border-pearl p-6 transition-shadow duration-500 group-hover:shadow-card sm:p-7">
                    <time
                      dateTime={post.date}
                      className="font-sans text-[0.64rem] uppercase tracking-luxe text-slate"
                    >
                      {formatDate(post.date)}
                    </time>

                    <h2 className="mt-3 font-display text-2xl font-light leading-snug text-ink">
                      {post.title}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                      {post.excerpt}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2.5 font-sans text-[0.68rem] font-semibold uppercase tracking-wide2 text-ink">
                      Read More
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
