import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
} from 'react-icons/fa6';

import workShowcaseData from '../../data/workShowcase.json';

// ─────────────────────────────────────────────
// ASSET CONFIG
// ─────────────────────────────────────────────

const imageModules = import.meta.glob(
  '../../assets/work-showcase/**/*.{jpg,jpeg,png,webp,avif,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const getImage = (folder, filename) => {
  const path = `../../assets/work-showcase/${folder}/${filename}`;
  return imageModules[path];
};

// ─────────────────────────────────────────────
// WORK CARD
// ─────────────────────────────────────────────

const WorkCard = ({ item, folder, onClick }) => {
  const image = getImage(folder, item.image);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] aspect-[4/5] rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
    >
      {/* Image */}
      <div className="absolute inset-0">
        {image ? (
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Image not found
          </div>
        )}
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Arrow */}
      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black group-hover:bg-[var(--lime-primary)] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
        <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block px-2 py-1 mb-2 text-[9px] font-bold uppercase tracking-widest rounded-md bg-[var(--lime-primary)] text-white">
          {item.tag}
        </span>

        <h4 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2">
          {item.title}
        </h4>
      </div>
    </motion.button>
  );
};

// ─────────────────────────────────────────────
// FULLSCREEN PREVIEW
// ─────────────────────────────────────────────

const WorkLightbox = ({
  section,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const item = section.items[activeIndex];
  const image = getImage(section.folder, item.image);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--lime-primary)] text-white flex items-center justify-center transition-all duration-300"
        >
          <FaXmark className="w-5 h-5" />
        </button>

        {/* Previous */}
        {section.items.length > 1 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous design"
            className="absolute left-3 sm:left-6 md:left-10 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[var(--lime-primary)] text-white flex items-center justify-center transition-all duration-300"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Content */}
        <motion.div
          key={`${section.id}-${item.id}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
          className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center"
        >
          <div className="relative max-h-[78vh] max-w-full rounded-2xl overflow-hidden bg-white shadow-2xl">
            {image && (
              <img
                src={image}
                alt={item.title}
                className="block max-h-[78vh] max-w-full w-auto h-auto object-contain"
              />
            )}
          </div>

          <div className="mt-4 text-center">
            <span className="inline-block px-3 py-1 mb-2 text-[9px] font-bold uppercase tracking-widest rounded-md bg-[var(--lime-primary)] text-white">
              {item.tag}
            </span>

            <h3 className="text-white text-lg sm:text-xl font-bold">
              {item.title}
            </h3>

            <p className="text-gray-400 text-xs mt-1">
              {activeIndex + 1} / {section.items.length}
            </p>
          </div>
        </motion.div>

        {/* Next */}
        {section.items.length > 1 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next design"
            className="absolute right-3 sm:right-6 md:right-10 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[var(--lime-primary)] text-white flex items-center justify-center transition-all duration-300"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────
// SINGLE GALLERY ROW
// ─────────────────────────────────────────────

const GalleryRow = ({ section, onOpen }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = (element) => {
    if (!element) return;

    setCanPrev(element.scrollLeft > 5);

    setCanNext(
      element.scrollLeft + element.clientWidth <
        element.scrollWidth - 5
    );
  };

  const scroll = (direction) => {
    const element = document.getElementById(
      `gallery-${section.id}`
    );

    if (!element) return;

    const amount = element.clientWidth * 0.8;

    element.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const element = document.getElementById(
      `gallery-${section.id}`
    );

    if (!element) return;

    updateButtons(element);

    const handleScroll = () => {
      setScrollPosition(element.scrollLeft);
      updateButtons(element);
    };

    element.addEventListener('scroll', handleScroll);

    window.addEventListener('resize', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [section.id]);

  return (
    <div className="mb-14 last:mb-0">
      {/* Row heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div className="max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            {section.title}
          </h3>

          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Row arrows */}
        {section.items.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll('prev')}
              disabled={!canPrev}
              aria-label={`Previous ${section.title}`}
              className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-black hover:bg-[var(--lime-primary)] hover:text-white hover:border-[var(--lime-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-300"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('next')}
              disabled={!canNext}
              aria-label={`Next ${section.title}`}
              className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-black hover:bg-[var(--lime-primary)] hover:text-white hover:border-[var(--lime-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-300"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Single horizontal row */}
      <div
        id={`gallery-${section.id}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {section.items.map((item, index) => (
          <WorkCard
            key={`${section.id}-${item.id}`}
            item={item}
            folder={section.folder}
            onClick={() => onOpen(section, index)}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN WORK SHOWCASE
// ─────────────────────────────────────────────

const WorkShowcase = () => {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (section, index) => {
    setLightbox({
      section,
      index,
    });

    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const previous = () => {
    setLightbox((current) => {
      if (!current) return current;

      const total = current.section.items.length;

      return {
        ...current,
        index:
          current.index === 0
            ? total - 1
            : current.index - 1,
      };
    });
  };

  const next = () => {
    setLightbox((current) => {
      if (!current) return current;

      const total = current.section.items.length;

      return {
        ...current,
        index:
          current.index === total - 1
            ? 0
            : current.index + 1,
      };
    });
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <section
        id="portfolio"
        className="section-surface relative py-12 px-6 sm:px-10 lg:px-16 overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--lime-primary)]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#fef9c3]/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">

          {/* Section badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
              04
            </span>

            <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]" />
              Portfolio
            </span>
          </div>

          {/* Main heading */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              A Gallery of Ideas
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              From logos to full campaigns — a curated collection
              across graphics, ads, real estate, and branding.
            </p>
          </div>

          {/* Dynamic sections */}
          {workShowcaseData.sections.map((section) => (
            <GalleryRow
              key={section.id}
              section={section}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </section>

      {/* Fullscreen preview */}
      {lightbox && (
        <WorkLightbox
          section={lightbox.section}
          activeIndex={lightbox.index}
          onClose={closeLightbox}
          onPrevious={previous}
          onNext={next}
        />
      )}
    </>
  );
};

export default WorkShowcase;