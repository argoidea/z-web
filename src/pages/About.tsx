import { useEffect, useState } from 'react';
import { getAbout } from '../api/client';
import { PageSection } from '../components/PageSection';
import type { AboutData } from '../types';

export function About() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAbout().then(setAbout);
  }, []);

  if (!about) return null;

  return (
    <>
      <section className="relative border-b border-zeneth-border bg-zeneth-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl tracking-widest text-zeneth-purple md:text-6xl">
            About Zeneth
          </h1>
        </div>
      </section>

      <PageSection className="py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
<h2 className="font-display text-2xl tracking-widest text-zeneth-purple">
            Introduction
            </h2>
<p className="mt-4 text-white leading-relaxed whitespace-pre-line">
            {about.introduction}
            </p>
          </div>
          <div>
<h2 className="font-display text-2xl tracking-widest text-zeneth-purple">
            Philosophy
            </h2>
<p className="mt-4 text-white leading-relaxed whitespace-pre-line">
            {about.philosophy}
            </p>
          </div>
        </div>
      </PageSection>

      {about.images && about.images.length > 0 && (
        <PageSection title="Portrait & mood" className="border-t border-zeneth-border">
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.images.map((src, i) => (
              <div key={i} className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-sm bg-zeneth-card">
                <img
                  src={src}
                  alt={`Zeneth mood ${i + 1}`}
                  className="max-h-[400px] max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}
