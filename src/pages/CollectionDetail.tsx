import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCollectionBySlug } from '../api/client';
import { StyleBlock } from '../components/StyleBlock';
import { StylePopout } from '../components/StylePopout';
import type { Collection, Style } from '../types';

export function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [popoutStyle, setPopoutStyle] = useState<Style | null>(null);

  useEffect(() => {
    if (slug) getCollectionBySlug(slug).then(setCollection);
  }, [slug]);

  if (!collection) return null;

  const sortedStyles = [...collection.styles].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Cover — larger banner, bottom 40% of image cut */}
      <section className="relative border-b border-zeneth-border">
        <div className="flex min-h-[224px] items-center justify-end overflow-hidden bg-zeneth-surface pr-[10%] md:min-h-[304px]">
          <img
            src={collection.coverImage}
            alt={collection.title}
            className="max-h-[55vh] max-w-full object-contain object-right md:max-h-[65vh] [clip-path:inset(0_0_40%_0)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zeneth-bg via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center p-8 md:p-12">
          <div className="mx-auto max-w-7xl w-full">
            <Link
              to="/collections"
              className="text-xs font-semibold uppercase tracking-wider text-zeneth-purple hover:text-zeneth-purple-sharp"
            >
              ← Collections
            </Link>
            <h1 className="mt-2 font-display text-4xl tracking-widest text-zeneth-purple md:text-6xl">
              {collection.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white md:text-base">
              {collection.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Styles editorial */}
      <div className="mx-auto max-w-7xl px-4 pt-1 pb-4 sm:px-6 lg:px-8">
        {sortedStyles.map((style, index) => (
          <div key={style.id}>
            <StyleBlock
              style={style}
              index={index}
              onPopout={setPopoutStyle}
            />
            {index < sortedStyles.length - 1 && (
              <div className="flex justify-center py-4 md:py-6">
                <div className="w-1/4 h-px bg-zeneth-purple" aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>

      {popoutStyle && (
        <StylePopout style={popoutStyle} onClose={() => setPopoutStyle(null)} />
      )}
    </>
  );
}
