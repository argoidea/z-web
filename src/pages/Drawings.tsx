import { useEffect, useState } from 'react';
import { getDrawings } from '../api/client';
import { PageSection } from '../components/PageSection';
import type { Drawing } from '../types';

export function Drawings() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    getDrawings().then(setDrawings);
  }, []);

  const sorted = [...drawings].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="border-b border-zeneth-border bg-zeneth-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl tracking-widest text-zeneth-purple md:text-6xl">
            Other Drawings
          </h1>
          <p className="mt-4 text-white">
            Sketches, concepts, and standalone artwork.
          </p>
        </div>
      </section>

      <PageSection className="py-16">
        {sorted.length === 0 ? (
          <p className="text-center text-white">
            No drawings yet. Check back later or explore the collections.
          </p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((d) => (
              <article
                key={d.id}
                className="group overflow-hidden rounded-sm border border-zeneth-border bg-zeneth-card transition hover:border-zeneth-purple"
              >
                <div className="flex min-h-[240px] items-center justify-center overflow-hidden bg-zeneth-surface">
                  <img
                    src={d.image}
                    alt={d.title}
                    className="max-h-[320px] max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl tracking-widest text-zeneth-purple">
                    {d.title}
                  </h2>
                  {d.description && (
                    <p className="mt-2 text-sm text-white leading-relaxed">
                      {d.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}
