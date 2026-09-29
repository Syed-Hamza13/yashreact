import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  FaMobileAlt,
  FaVideo,
  FaPlay,
  FaTimes,
  FaChartLine,
  FaBriefcase,
  FaFolderOpen,
  FaUsers,
} from 'react-icons/fa';
import { portfolioData, videosData, statsData } from '../../data/portfolioData';

// ── Reusable CountUp ──
const CountUp = ({ end, duration = 1800, suffix = '+', decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? Number(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration, decimals]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// ── Section 7: UI/UX Showcase ──
const UiUxShowcase = () => {
  const ref = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      ref={ref}
      className="relative py-16 px-6 sm:px-10 lg:px-16 bg-[#f8fafc] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            04
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            UI/UX Design
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <FaMobileAlt className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Interface Design
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              UI/UX Projects
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Interactive Figma prototypes — click any card to explore the live design.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.uiux.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group relative aspect-[4/5] rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black group-hover:bg-[var(--lime-primary)] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
                <FaMobileAlt className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2 py-1 mb-2 text-[9px] font-bold uppercase tracking-widest rounded-md bg-[var(--lime-primary)] text-white">
                  {project.type}
                </span>
                <h4 className="text-white font-bold text-sm leading-tight">
                  {project.title}
                </h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Figma Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="font-bold text-gray-900">{activeProject.title}</h3>
                <p className="text-xs text-gray-500">{activeProject.type}</p>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--lime-primary)] hover:text-white transition-colors duration-300"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            {/* Figma iframe */}
            <iframe
              src={activeProject.figmaUrl}
              title={activeProject.title}
              className="w-full h-[calc(85vh-73px)] border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

// ── Section 8: Videos Gallery ──


// ── Section 12: Stats ──
const StatsSection = () => {
  const stats = [
    { icon: FaBriefcase, value: 2, suffix: '+', label: 'Years Experience' },
    { icon: FaFolderOpen, value: 50, suffix: '+', label: 'Projects Done' },
    { icon: FaUsers, value: 10, suffix: '+', label: 'Happy Clients' },
  ];

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-16 bg-[#f8fafc] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--lime-primary)]/10 blur-2xl group-hover:bg-[var(--lime-primary)]/20 transition-colors duration-500" />

                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--lime-light)]/70 flex items-center justify-center group-hover:bg-[var(--lime-primary)] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <FaChartLine className="w-4 h-4 text-gray-300 group-hover:text-[var(--lime-primary)] transition-colors duration-300" />
                </div>

                <div className="relative text-4xl md:text-5xl font-bold text-black mb-1 leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="relative text-gray-600 text-xs font-semibold uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Combine ──
const DesignShowcase = () => {
  return (
    <div id="design">
      <UiUxShowcase />
     
      <StatsSection />
    </div>
  );
};

export default DesignShowcase;