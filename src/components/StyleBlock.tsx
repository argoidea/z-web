import type { Style } from '../types';

interface StyleBlockProps {
  style: Style;
  index: number;
  onPopout: (style: Style) => void;
}

export function StyleBlock({ style, index, onPopout }: StyleBlockProps) {
  const isEven = index % 2 === 0;

  return (
    <section className="grid gap-4 py-8 md:grid-cols-2 md:gap-6 md:py-12">
      {/* Style pic */}
      <div className={isEven ? 'md:order-2' : ''}>
        <div className="flex min-h-[400px] items-center justify-center overflow-hidden rounded-sm bg-zeneth-bg md:min-h-[500px]">
          <img
            src={style.mainPhoto}
            alt={style.title}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>
      </div>

      {/* Title + description */}
      <div className={`flex flex-col justify-center ${isEven ? 'md:order-1' : ''}`}>
        <span className="font-display text-sm tracking-[0.3em] text-zeneth-purple">
          Style {index + 1}
        </span>
        <h2 className="mt-2 font-display text-3xl tracking-widest text-zeneth-purple md:text-4xl">
          {style.title}
        </h2>
        <p className="mt-6 text-white leading-relaxed">
          {style.description}
        </p>
        <button
          type="button"
          onClick={() => onPopout(style)}
          className="mt-6 self-start border border-zeneth-purple px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zeneth-purple transition hover:bg-zeneth-purple hover:text-zeneth-bg"
        >
          More details
        </button>
      </div>
    </section>
  );
}
