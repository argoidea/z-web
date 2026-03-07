import { Link } from 'react-router-dom';
import type { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-zeneth-border bg-zeneth-card transition hover:border-zeneth-purple"
    >
      <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-zeneth-surface">
        <img
          src={collection.coverImage}
          alt={collection.title}
          className="max-h-[420px] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zeneth-bg/90 via-zeneth-bg/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="font-display text-2xl tracking-widest text-zeneth-purple sm:text-3xl">
          {collection.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-white">
          {collection.summary}
        </p>
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-zeneth-purple transition group-hover:text-zeneth-purple-sharp">
          View collection →
        </span>
      </div>
    </Link>
  );
}
