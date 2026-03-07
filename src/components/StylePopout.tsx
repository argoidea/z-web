import { useEffect } from 'react';
import type { Style } from '../types';

interface StylePopoutProps {
  style: Style;
  onClose: () => void;
}

export function StylePopout({ style, onClose }: StylePopoutProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${style.title} — full view`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm border border-zeneth-border bg-zeneth-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-zeneth-bg/80 p-2 text-white transition hover:bg-zeneth-purple"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-5 md:gap-8 md:p-8 [font-size:1.1em]">
          {/* Large: feature detail pic (or style pic if no feature) */}
          <div className="md:col-span-3">
            <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-sm bg-zeneth-bg">
              <img
                src={style.featurePhoto || style.mainPhoto}
                alt={style.featurePhoto ? `${style.title} detail` : style.title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="font-display text-2xl tracking-widest text-zeneth-purple md:text-3xl">
              {style.title}
            </h2>
            <p className="text-white text-[0.9625rem] leading-relaxed">
              {style.description}
            </p>
            {/* Style pic shown smaller */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zeneth-purple">
                Style
              </span>
              <div className="mt-2 flex aspect-square max-w-[180px] items-center justify-center overflow-hidden rounded-sm border border-zeneth-border bg-zeneth-bg">
                <img
                  src={style.mainPhoto}
                  alt={style.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
