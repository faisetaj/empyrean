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
        eyebrow="From the Studio"
        title={blog.heading}
        body={blog.intro}
        image="/images/empyrean-beauty-gallery-6.jpg"
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

                  <div className="flex flex-1 flex-col border border-t-0 border-white/[0.07] p-7 transition-colors duration-500 group-hover:border-champagne/25">
                    <time
                      dateTime={post.date}
                      className="font-sans text-[0.66rem] uppercase tracking-luxe text-champagne"
                    >
                      {formatDate(post.date)}
                    </time>

                    <h2 className="mt-4 font-display text-2xl font-light leading-snug text-bone transition-colors group-hover:text-champagne">
                      {post.title}
                    </h2>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-smoke">
                      {post.excerpt}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide2 text-bone transition-colors group-hover:text-champagne">
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
