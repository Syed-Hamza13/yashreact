import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  FaPalette,
  FaVideo,
  FaBriefcase,
  FaArrowRight,
  FaStar,
  FaUser,
  FaLayerGroup,
  FaTools,
  FaBuilding,
} from 'react-icons/fa';
import {
  FaLocationDot,
  FaArrowUpRightFromSquare,
  FaPaintbrush,
  FaCamera,
} from 'react-icons/fa6';
import {
  aboutData,
  skillsData,
  experienceData,
} from '../../data/portfolioData';

// ── PROJECT CLIENTS DATA ──
const projectClients = [
  { name: 'All Saint Institute of College', location: 'Bhopal', work: 'Poster Design', tags: ['Poster', 'Print'], icon: 'poster' },
  { name: 'Annapurna Group of Hotels', location: 'Bhopal', work: 'Posters & AI Video', tags: ['Poster', 'AI Video'], icon: 'video' },
  { name: 'Shri Shyam Home Décor', location: 'India', work: 'Ads, AI Videos & Poster Campaigns', tags: ['Ads', 'AI Video', 'Poster'], icon: 'ads' },
  { name: 'Amrit Yoji', location: 'India', work: 'Poster & Video Production', tags: ['Poster', 'Video'], icon: 'video' },
  { name: 'Rivani Jewels', location: 'India', work: 'AI Video & Poster Design', tags: ['AI Video', 'Poster'], icon: 'ads' },
  { name: 'Landmark Builders', location: 'India', work: 'Real Estate Campaign (Posters + Videos)', tags: ['Campaign', 'Poster', 'Video'], icon: 'poster' },
  { name: 'Sun Solutions', location: 'India', work: 'Ads Poster Series', tags: ['Ads', 'Poster'], icon: 'ads' },
  { name: 'AARTH Real Estate', location: 'India', work: 'Full Ads Poster Campaign', tags: ['Ads', 'Campaign'], icon: 'poster' },
];





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







// ── COMPACT CLIENT CARD ──
const CompactClientCard = ({ client, index }) => {
  const initials = client.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const palette = [
    { base: '#a3e635', soft: '#ecfccb', text: '#3f6212' },
    { base: '#60a5fa', soft: '#dbeafe', text: '#1e3a8a' },
    { base: '#f472b6', soft: '#fce7f3', text: '#9d174d' },
    { base: '#fb923c', soft: '#ffedd5', text: '#9a3412' },
    { base: '#a78bfa', soft: '#ede9fe', text: '#5b21b6' },
    { base: '#34d399', soft: '#d1fae5', text: '#065f46' },
    { base: '#fbbf24', soft: '#fef3c7', text: '#92400e' },
    { base: '#22d3ee', soft: '#cffafe', text: '#155e75' },
  ];

  const c = palette[(index - 1) % palette.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group relative flex flex-col p-4 bg-white rounded-2xl border-2 border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-t-2xl"
        style={{ backgroundColor: c.base }}
      />

      {/* Corner arrow */}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-12"
        style={{ backgroundColor: '#f3f4f6', color: '#000' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = c.base;
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.color = '#000';
        }}
      >
        <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
      </div>

      {/* Avatar */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base mb-3 transition-all duration-300 group-hover:scale-105"
        style={{ backgroundColor: c.soft, color: c.text }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = c.base;
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = c.soft;
          e.currentTarget.style.color = c.text;
        }}
      >
        {initials}
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center text-black transition-all duration-300"
          style={{ borderColor: '#f3f4f6' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = c.base;
            e.currentTarget.style.color = c.base;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#f3f4f6';
            e.currentTarget.style.color = '#000';
          }}
        >
          <WorkIcon type={client.icon} className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Project label */}
      <span
        className="text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 mb-1"
        style={{ color: '#000' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = c.base)}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#000')}
      >
        Project {String(index).padStart(2, '0')}
      </span>

      {/* Name */}
      <h4
        className="text-sm font-bold leading-snug mb-1.5 transition-colors duration-300 line-clamp-2 min-h-[2.5rem]"
        style={{ color: '#111827' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = c.base)}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
      >
        {client.name}
      </h4>

      {/* Location */}
      <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-2">
        <FaLocationDot
          className="w-2.5 h-2.5 transition-colors duration-300"
          style={{ color: '#000' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = c.base)}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#000')}
        />
        <span className="truncate">{client.location}</span>
      </div>

      {/* Work description */}
      <p className="text-xs text-gray-600 leading-snug mb-3 line-clamp-2 flex-grow">
        {client.work}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 pt-2.5 border-t border-gray-100">
        {client.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded border transition-all duration-300"
            style={{
              backgroundColor: '#f9fafb',
              color: '#4b5563',
              borderColor: '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.soft;
              e.currentTarget.style.color = c.base;
              e.currentTarget.style.borderColor = c.base;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.color = '#4b5563';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            {tag}
          </span>
        ))}
        {client.tags.length > 2 && (
          <span className="px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
            +{client.tags.length - 2}
          </span>
        )}
      </div>
    </motion.div>
  );
};





// ── TOOL → IMAGE ──
const toolImages = {
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Adobe Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
  'Adobe Illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  'Canva Pro': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
  'Adobe Premiere Pro': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg',
  'Adobe After Effects': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg',
  CapCut: 'https://cdn.simpleicons.org/capcut/000000',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  HTML5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
};

const getToolImage = (tool) => toolImages[tool];

// ── WORK ICON ──
const WorkIcon = ({ type, className }) => {
  switch (type) {
    case 'video': return <FaVideo className={className} />;
    case 'ads': return <FaPaintbrush className={className} />;
    case 'poster': return <FaCamera className={className} />;
    default: return <FaPalette className={className} />;
  }
};

// ── SectionBadge ──
const SectionBadge = ({ number, label, light = false }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
      {number}
    </span>
    <span className={`inline-flex items-center gap-2 px-4 py-2 border text-sm font-semibold uppercase tracking-wider ${light ? 'bg-white border-gray-200 text-gray-600' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
      <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
      {label}
    </span>
  </div>
);

// ── ToolCard (unchanged) ──
const ToolCard = ({ tool }) => {
  const img = getToolImage(tool);
  return (
    <div className="group flex flex-col items-center justify-center gap-3 min-w-[140px] w-[140px] h-[150px] p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-[var(--lime-light)]/60 transition-colors duration-300">
        {img ? (
          <img src={img} alt={tool} loading="lazy"
            className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <span className="hidden w-9 h-9 items-center justify-center text-black font-bold text-xl">{tool.charAt(0)}</span>
      </div>
      <span className="text-xs font-semibold text-gray-700 group-hover:text-[var(--lime-dark)] text-center leading-tight transition-colors duration-300">{tool}</span>
    </div>
  );
};

// ── MarqueeRow (unchanged) ──
const MarqueeRow = ({ tools, reverse = false, speed = 30 }) => {
  const items = [...tools, ...tools];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex gap-5 w-max" style={{ animation: `marquee-${reverse ? 'reverse' : 'forward'} ${speed}s linear infinite` }}>
        {items.map((tool, i) => <ToolCard key={`${tool}-${i}`} tool={tool} />)}
      </div>
    </div>
  );
};

// ── CLIENT CARD (card-level group — unchanged) ──
const ClientCard = ({ client, index }) => {
  const initials = client.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-[var(--lime-primary)] group-hover:w-full transition-all duration-500 rounded-t-2xl" />

      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-black group-hover:bg-[var(--lime-primary)] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
        <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-14 h-14 rounded-xl bg-[var(--lime-light)] flex items-center justify-center font-bold text-black text-lg group-hover:scale-110 group-hover:bg-[var(--lime-primary)] group-hover:text-white transition-all duration-300">
          {initials}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-black group-hover:text-[var(--lime-primary)] group-hover:border-[var(--lime-primary)] transition-all duration-300">
            <WorkIcon type={client.icon} className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-[var(--lime-primary)] transition-colors duration-300">
            Project {String(index + 1).padStart(2, '0')}
          </span>
          <span className="block text-xs text-gray-400 truncate">Case Study</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-base font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-[var(--lime-primary)] transition-colors duration-300">
          {client.name}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <FaLocationDot className="w-3 h-3 text-black group-hover:text-[var(--lime-primary)] transition-colors duration-300" />
          <span>{client.location}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{client.work}</p>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
        {client.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-gray-50 text-gray-600 border border-gray-200 group-hover:bg-[var(--lime-light)]/50 group-hover:border-[var(--lime-primary)]/40 group-hover:text-[var(--lime-primary)] transition-all duration-300">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ── FEATURED CLIENT CARD (card-level group) ──
const FeaturedClientCard = ({ client }) => {
  const initials = client.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col justify-between p-8 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-[var(--lime-light)]/30 hover:border-[var(--lime-primary)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--lime-primary)]/10 group-hover:bg-[var(--lime-primary)]/20 transition-colors duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[var(--lime-light)]/40 group-hover:bg-[var(--lime-light)]/60 transition-colors duration-500" />

      <div className="relative flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--lime-primary)] text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
          <FaStar className="w-3 h-3" />
          Featured
        </span>
        <div className="w-11 h-11 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-black group-hover:bg-[var(--lime-primary)] group-hover:text-white group-hover:border-[var(--lime-primary)] group-hover:rotate-45 transition-all duration-300">
          <FaArrowUpRightFromSquare className="w-4 h-4" />
        </div>
      </div>

      <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-[var(--lime-primary)]/30 flex items-center justify-center font-bold text-black text-2xl mb-5 group-hover:scale-105 group-hover:border-[var(--lime-primary)] transition-all duration-300 shadow-sm">
        {initials}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--lime-primary)] flex items-center justify-center text-white shadow-md">
          <WorkIcon type={client.icon} className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[var(--lime-primary)] transition-colors duration-300">
          {client.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <FaLocationDot className="w-3.5 h-3.5 text-black group-hover:text-[var(--lime-primary)] transition-colors duration-300" />
          <span>{client.location}</span>
        </div>
        <p className="text-base text-gray-600 leading-relaxed mb-6">{client.work}</p>

        <div className="flex flex-wrap gap-2">
          {client.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-lg bg-white border border-gray-200 text-gray-700 group-hover:border-[var(--lime-primary)]/50 group-hover:bg-[var(--lime-primary)]/10 group-hover:text-[var(--lime-primary)] transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── SECTION 1: WHO I AM ──
const WhoIAm = () => {
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      className="relative py-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#f8fafc]"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--lime-primary)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#fef9c3]/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <SectionBadge number="01" label="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              <span className="text-xs font-bold uppercase tracking-widest text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer">
                Who I Am
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
  {aboutData.intro}
</h2>
            <p className="font-body text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
  {aboutData.description}
</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 border-t border-gray-300/60 pt-5">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-0.5">
                  <CountUp end={50} />
                </div>
                <div className="text-gray-600 text-xs font-medium">Projects</div>
              </div>
              <div className="border-l border-gray-300/60 pl-5">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-0.5">
                  <CountUp end={10} />
                </div>
                <div className="text-gray-600 text-xs font-medium">Clients</div>
              </div>
              <div className="border-l border-gray-300/60 pl-5">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-0.5">
                  <CountUp end={2} />
                </div>
                <div className="text-gray-600 text-xs font-medium">Years Exp.</div>
              </div>
            </div>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-black hover:bg-[var(--lime-hover)] text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              View My Work
              <FaArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="aspect-[4/5] rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-lg">
              <img
                src="https://techoverworld.liveblog365.com/yash-portfolio/images/profile-pic/yash-profile-picture.png"
                alt="Profile"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop';
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--lime-primary)] rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
// ── SECTION 2: PROJECTS & CLIENTS ──
// ── SECTION 2: PROJECTS & CLIENTS ──
const ProjectsClients = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] overflow-hidden"
    >
      {/* Soft orange glow — top left */}
     <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#fef9c3]/40 blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto">
        <SectionBadge number="02" label="Portfolio" light />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <FaLayerGroup className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              <span className="text-xs font-bold uppercase tracking-widest text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer">
                Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Projects & Clients
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              A glimpse into my creativity — designs, collaborations, and digital
              experiences for diverse brands.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)] animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-900">
                    <CountUp end={8} /> Clients
                    </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)] animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-900">
                    <CountUp end={100} /> Designs
                    </span>
                </div>
                </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectClients.map((client, i) => (
            <CompactClientCard key={client.name} client={client} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── SECTION 3: TOOLS & EXPERTISE ──
const ToolsExpertise = () => {
  const ref = useRef(null);
  const designTools = skillsData.tools.filter((t) => ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro'].includes(t));
  const videoTools = skillsData.tools.filter((t) => ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'].includes(t));
  const otherTools = skillsData.tools.filter((t) => !designTools.includes(t) && !videoTools.includes(t));

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] inset-4 z-3">
      <div className="max-w-7xl mx-auto">
        <SectionBadge number="03" label="Expertise" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[var(--lime-primary)] transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              {/* FaPalette — direct hover */}
              <FaPalette className="w-7 h-7 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              Tools I Use — Design
            </h3>
            <div className="flex flex-wrap gap-3">
              {designTools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-900 font-semibold text-sm hover:border-[var(--lime-primary)] hover:bg-[var(--lime-light)]/40 transition-all duration-300">
                  {getToolImage(tool) && <img src={getToolImage(tool)} alt={tool} className="w-4 h-4 object-contain" />}
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[var(--lime-primary)] transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              {/* FaVideo — direct hover */}
              <FaVideo className="w-7 h-7 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
              Tools I Use — Video
            </h3>
            <div className="flex flex-wrap gap-3">
              {videoTools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-900 font-semibold text-sm hover:border-[var(--lime-primary)] hover:bg-[var(--lime-light)]/40 transition-all duration-300">
                  {getToolImage(tool) && <img src={getToolImage(tool)} alt={tool} className="w-4 h-4 object-contain" />}
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            {/* FaTools — direct hover */}
            <FaTools className="w-6 h-6 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
            <h3 className="text-2xl font-bold text-gray-900">All Tools & Skills</h3>
          </div>
          <MarqueeRow tools={skillsData.tools} speed={35} />
        </div>
        <MarqueeRow tools={[...skillsData.tools].reverse()} reverse speed={45} />
        {otherTools.length > 0 && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherTools.map((tool) => <ToolCard key={tool} tool={tool} />)}
          </div>
        )}
      </div>
    </section>
  );
};

// ── SECTION 4: CURRENTLY WORKING AT ──




const CurrentlyWorking = () => {
  const ref = useRef(null);
  const currentJob =
    experienceData.find((job) => job.isCurrent && job.company === 'Digi Rank 360') ||
    experienceData[0];

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionBadge number="04" label="Experience" light />

        {/* ── TOP STRIP: logo + company + active badge ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={currentJob.logo}
                alt={currentJob.company}
                className="w-full h-full object-cover p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="hidden w-full h-full items-center justify-center text-black font-bold text-base">
                {currentJob.company.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <FaBriefcase className="w-3 h-3 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-black">
                  Currently Working At
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {currentJob.company}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lime-light)]/70 text-[var(--lime-dark)] text-[13px] font-bold uppercase tracking-widest">
  {/* Blinking dot — 2 layers */}
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime-primary)] opacity-75"></span>
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--lime-primary)]"></span>
  </span>
  Active
</span>
          </div>
        </div>

        {/* ── HERO CARD: role + description + tags (compact) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="relative p-5 md:p-6 bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4"
        >
          {/* Left lime bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--lime-primary)] via-[var(--lime-light)] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {/* Role */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <FaBuilding className="w-3 h-3 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-black">
                  Role
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer leading-tight">
                {currentJob.role}
              </h3>
            </div>

            {/* Description */}
            <div className="md:col-span-2 md:border-l md:border-gray-100 md:pl-5">
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                What I Do
              </div>
              <p className="text-gray-600 leading-snug text-xs md:text-sm line-clamp-3">
                {currentJob.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
            {['Full-time', 'On-site', 'Bhopal', 'UI/UX', 'Branding'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wide rounded-md bg-gray-50 text-gray-600 border border-gray-200 hover:bg-[var(--lime-light)]/50 hover:border-[var(--lime-primary)]/40 hover:text-[var(--lime-dark)] transition-all duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM ROW: 3 mini cards (compact) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Workspace image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-gray-200 overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
              alt="Workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest">
              At Workspace
            </div>
          </motion.div>

          {/* Rating */}
          {/* Rating */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{ delay: 0.2 }}
  className="relative p-5 bg-[var(--lime-light)]/60 rounded-2xl border border-[var(--lime-primary)]/40 flex flex-col justify-between"
>
  <div>
    <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--lime-dark)] mb-3">
      Client Rating
    </div>

    {/* Staggered stars — one by one pop in */}
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3 + i * 0.12,
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          <FaStar className="w-4 h-4 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
        </motion.div>
      ))}
    </div>
  </div>

  <div>
    {/* 5.0 count-up */}
    <div className="text-2xl font-bold text-black leading-none mb-0.5">
      <CountUp end={5.0} decimals={1} duration={1400} suffix="" />
    </div>
    <p className="text-gray-700 text-[10px] font-medium">40+ reviews</p>
  </div>
</motion.div>

{/* Satisfaction */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{ delay: 0.3 }}
  className="relative p-5 bg-white rounded-2xl border border-gray-200 flex flex-col justify-between overflow-hidden"
>
  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[var(--lime-primary)]/10 blur-2xl" />

  <div className="relative">
    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">
      Client Satisfaction
    </div>

    {/* 98.6% count-up */}
    <div className="text-4xl md:text-5xl font-bold text-black leading-none">
      <CountUp end={98.6} decimals={1} duration={2000} suffix="" />
      <span className="text-[var(--lime-primary)]">%</span>
    </div>
  </div>

  {/* Progress bar — 0% se 98.6% animate */}
  <div className="relative flex items-center gap-2 mt-3">
    <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '98.6%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
        className="h-full rounded-full bg-[var(--lime-primary)]"
      />
    </div>
    <span className="text-[9px] font-bold text-gray-500">98.6%</span>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

// ── MAIN ABOUT ──
const About = () => {
  return (
      <div id="about" className="relative z-10 bg-[#f8fafc]">
      <WhoIAm />
      <ProjectsClients />
      <ToolsExpertise />
      <CurrentlyWorking />
    </div>
  );
};

export default About;