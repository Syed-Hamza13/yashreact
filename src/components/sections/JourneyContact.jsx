import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPalette,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaPaperPlane,
  FaCheck,
} from 'react-icons/fa';
import {
  experienceData,
  educationData,
  skillsData,
  contactData,
} from '../../data/portfolioData';

// ── Section 9: Experience Timeline ──
const ExperienceTimeline = () => {
  return (
    <section className="section-surface section-surface--gradient relative py-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--lime-primary)]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            06
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            Experience
          </span>
        </div>

        <div className="max-w-xl mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaBriefcase className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              Career Path
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Where I've Worked
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            My professional journey — from junior designer to current role.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-gray-200" />

          <div className="space-y-6">
            {experienceData.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-16 md:pl-24"
              >
                {/* Dot */}
                <div
                  className={`absolute left-3 md:left-5 top-5 w-6 h-6 rounded-full border-4 border-[#f8fafc] ${
                    job.isCurrent
                      ? 'bg-[var(--lime-primary)] shadow-[0_0_0_4px_rgba(163,230,53,0.2)]'
                      : 'bg-gray-300'
                  }`}
                />

                {/* Card */}
                <div className="group p-5 md:p-6 bg-white rounded-2xl border border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Logo */}
                      <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-cover p-1"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span className="hidden w-full h-full items-center justify-center text-black font-bold text-base">
                          {job.company.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 leading-tight">
                          {job.role}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {job.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lime-light)]/70 text-[var(--lime-dark)] text-[10px] font-bold uppercase tracking-widest">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime-primary)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--lime-primary)]"></span>
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      {job.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Section 10: Education ──
const EducationSection = () => {
  return (
    <section className="section-surface relative py-12 px-6 sm:px-10 lg:px-16">
      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            07
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            Education
          </span>
        </div>

        <div className="max-w-xl mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaGraduationCap className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              Learning Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Education & Training
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Formal training that shaped my design and technical foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--lime-primary)]/10 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-full h-full object-cover p-1.5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <span className="hidden w-full h-full items-center justify-center text-black font-bold text-xl">
                    {edu.institution.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--lime-dark)] mb-1">
                    Diploma
                  </div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500 mt-1 inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {edu.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Section 11: Skills ──
const SkillsSection = () => {
  return (
    <section className="section-surface section-surface--gradient relative py-12 px-6 sm:px-10 lg:px-16">
      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            08
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            Skills
          </span>
        </div>

        <div className="max-w-xl mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaPalette className="w-5 h-5 text-black hover:text-[var(--lime-primary)] transition-colors duration-300 cursor-pointer" />
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              What I Bring
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Skills & Strengths
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Design capabilities paired with the soft skills to deliver great work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Design Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[var(--lime-light)]/70 flex items-center justify-center">
                <FaPalette className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Design Skills</h3>
                <p className="text-xs text-gray-500">Core creative abilities</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsData.design.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-[var(--lime-light)]/50 hover:border-[var(--lime-primary)]/40 hover:text-[var(--lime-dark)] transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[var(--lime-light)]/70 flex items-center justify-center">
                <FaHeart className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Soft Skills</h3>
                <p className="text-xs text-gray-500">How I work with others</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsData.soft.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-[var(--lime-light)]/50 hover:border-[var(--lime-primary)]/40 hover:text-[var(--lime-dark)] transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Section 13: Contact ──
const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  const whatsappNumber = '919575371109';
  const message =
    `*New Contact Form Message*%0A%0A` +
    `*Name:* ${form.name}%0A` +
    `*Email:* ${form.email}%0A%0A` +
    `*Message:*%0A${form.message}`;

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    '_blank',
    'noopener,noreferrer'
  );

  setSent(true);
  setTimeout(() => setSent(false), 3000);
  setForm({ name: '', email: '', message: '' });
};

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: FaPhone, label: 'Phone', value: contactData.phone, href: `tel:${contactData.phone.replace(/\s/g, '')}` },
    { icon: FaMapMarkedAlt, label: 'Location', value: contactData.location, href: null },
  ];

  return (
    <section id="contact" className="section-surface relative py-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--lime-primary)]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--lime-primary)] text-white font-bold text-lg shadow-md">
            09
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 border bg-white border-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-primary)]"></span>
            Contact
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Let's build <br />
              <span className="text-[var(--lime-dark)]">something together.</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              {contactData.message}
            </p>

            {/* Info cards */}
            <div className="space-y-3">
              {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const Wrapper = info.href ? 'a' : 'div';
                    return (
                        <Wrapper
                        key={info.label}
                        {...(info.href ? { href: info.href } : {})}
                        className="group flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-[var(--lime-primary)] hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                        <div className="w-11 h-11 rounded-xl bg-[var(--lime-light)]/70 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--lime-primary)] transition-colors duration-300">
                            <Icon
                            className={`w-5 h-5 text-black group-hover:text-white transition-all duration-300 ${
                                info.label === 'Phone' ? 'group-hover: rotate-90' : ''
                            }`}
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                            {info.label}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 truncate">
                            {info.value}
                            </div>
                        </div>
                        </Wrapper>
                    );
                    })}
            </div>
          </div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 bg-white rounded-2xl border-2 border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Send a Message
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--lime-primary)] outline-none text-sm text-gray-900 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--lime-primary)] outline-none text-sm text-gray-900 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--lime-primary)] outline-none text-sm text-gray-900 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black hover:bg-[var(--lime-primary)] text-white font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                {sent ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// ── Combine ──
const JourneyContact = () => {
  return (
    <div id="journey">
      <ExperienceTimeline />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
};

export default JourneyContact;