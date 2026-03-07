import { useEffect, useState } from 'react';
import { getCollections } from '../api/client';
import { CollectionCard } from '../components/CollectionCard';
import { PageSection } from '../components/PageSection';
import type { Collection } from '../types';

export function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const sorted = [...collections].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="border-b border-zeneth-border bg-zeneth-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl tracking-widest text-zeneth-purple md:text-6xl">
            Collections
          </h1>
          <p className="mt-4 text-white">
            Explore the full range of gothic rebellion and street-inspired design.
          </p>
        </div>
      </section>

      <PageSection className="py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </PageSection>
    </>
  );
}
