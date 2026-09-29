import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  FaArrowUpRightFromSquare,
  FaLayerGroup,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';
import { portfolioData } from '../../data/portfolioData';

// ── Category tabs ──
const categories = [
  { key: 'all', label: 'All Work' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'ads', label: 'Ads' },
  { key: 'realestate', label: 'Real Estate' },
  { key: 'logo', label: 'Logos' },
  { key: 'institute', label: 'Institute' },
  { key: 'more', label: 'More' },
];

// ── Collect all items into one array ──
const allItems = [
  ...portfolioData.graphics,
  ...portfolioData.ads,
  ...portfolioData.realestate,
  ...portfolioData.logo,
  ...portfolioData.institute,
  ...portfolioData.more,
];

// ── Single Work Card ──
const WorkCard = ({ item }) => {
  const isLogo = item.isSquare;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
        isLogo ? 'aspect-square' : 'aspect-[4/5]'
      }`}
      id='portfolio'
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600';
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner arrow */}
      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black group-hover:bg-[var(--lime-primary)] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
        <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block px-2 py-1 mb-2 text-[9px] font-bold uppercase tracking-widest rounded-md bg-[var(--lime-primary)] text-white">
          {item.tag}
        </span>
        <h4 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
};

// ── Section 1-6: Combined Work Gallery with Tabs + Slider ──
const WorkShowcase = () => {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const filteredItems =
    activeTab === 'all'
      ? allItems
      : allItems.filter((item) => item.category === activeTab);

  // Responsive items per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, filteredItems.length - itemsPerView);

  // Reset index when tab changes
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  // Clamp index if window resizes
  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  // Progress dots
  const totalPages = maxIndex + 1;

  return (
    <section
      ref={ref}
      className="relative py-16 px-6 sm:px-10 lg:px-16 bg-[#f8fafc] overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--lime-primary)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#fef9c3]/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            03
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            Portfolio
          </span>
        </div>

        {/* Header + slider controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <FaLayerGroup className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              A Gallery of Ideas
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              From logos to full campaigns — a curated collection across graphics,
              ads, real estate, and branding.
            </p>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-black hover:bg-[var(--lime-primary)] hover:text-white hover:border-[var(--lime-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-300"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-black hover:bg-[var(--lime-primary)] hover:text-white hover:border-[var(--lime-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-300"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const count =
              cat.key === 'all'
                ? allItems.length
                : allItems.filter((i) => i.category === cat.key).length;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[var(--lime-primary)] hover:text-[var(--lime-dark)]'
                }`}
              >
                {cat.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slider viewport — 1 row only */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: `calc(${-index * (100 / itemsPerView)}% - ${index * 16 / itemsPerView}px)`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {filteredItems.map((item, i) => (
              <div
                key={`${item.category}-${item.id}`}
                className="shrink-0"
                style={{
                  width: `calc(${100 / itemsPerView}% - ${(16 * (itemsPerView - 1)) / itemsPerView}px)`,
                }}
              >
                <WorkCard item={item} index={i} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-[var(--lime-primary)]'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="text-center mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {index + 1} / {totalPages}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;