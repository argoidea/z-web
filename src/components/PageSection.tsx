import { type ReactNode } from 'react';

interface PageSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({ title, children, className = '' }: PageSectionProps) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      {title && (
        <h2 className="font-display text-3xl tracking-widest text-zeneth-purple md:text-4xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
