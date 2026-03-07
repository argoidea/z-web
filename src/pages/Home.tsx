import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAbout } from '../api/client';
import type { AboutData } from '../types';

export function Home() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAbout().then(setAbout);
  }, []);

  // Home banner: public/img/img5.png (served as /img/img5.png)
  const heroImage = '/img/img5.png';

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-zeneth-bg">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-start lg:grid-cols-2">
        {/* Left: home banner — background matches site (zeneth-bg) */}
        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-zeneth-bg lg:min-h-0">
          <img
            src={heroImage}
            alt="Zeneth"
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>

        {/* Right: about Zeneth brief intro — 20% lower vertically */}
        <div className="flex flex-col px-8 pt-[20vh] pb-12 lg:px-12 lg:pt-[20vh] lg:pb-16">
          <h1 className="font-display text-4xl tracking-[0.2em] text-zeneth-purple sm:text-5xl md:text-6xl">
            ZENETH
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-wider text-zeneth-purple sm:text-base">
            Dark gothic · Graffiti-inspired · Fashion
          </p>
          <div className="mt-8 max-w-lg">
            <p className="text-white leading-relaxed">
              {about?.introduction ??
                'Zeneth is a fashion designer at the intersection of gothic tradition and street rebellion. Based between shadow and neon, the work explores identity, freedom, and the raw energy of underground culture.'}
            </p>
            <Link
              to="/collections"
              className="mt-8 inline-block border border-zeneth-purple px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-zeneth-purple transition hover:bg-zeneth-purple hover:text-zeneth-bg"
            >
              See my collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
